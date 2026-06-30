from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
JWT_SECRET = os.environ.get('JWT_SECRET', 'fallback-secret')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@clientdeskai.com')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'ClientDesk@2026')

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# ===== Models =====
class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: Optional[str] = None
    message: Optional[str] = ""
    source: Optional[str] = "contact_form"

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: Optional[str] = None
    message: Optional[str] = ""
    source: str = "contact_form"
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AppointmentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = ""

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    preferred_date: str
    preferred_time: str
    notes: Optional[str] = ""
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    role: str  # user | assistant
    content: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LoginRequest(BaseModel):
    email: str
    password: str

# ===== Auth helpers =====
def create_token(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(days=1),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        if payload.get("email") != ADMIN_EMAIL:
            raise HTTPException(status_code=401, detail="Not authorized")
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "ClientDesk AI API", "status": "ok"}

@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    return lead

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(payload: AppointmentCreate):
    appt = Appointment(**payload.model_dump())
    await db.appointments.insert_one(appt.model_dump())
    return appt

# ===== Chatbot =====
SYSTEM_PROMPT = """You are ClientDesk AI's friendly sales assistant. Helping businesses grow smarter.

Our services:
- AI Agents: AI Sales Executive, AI Customer Support, AI Receptionist, AI Recruiter, AI Collection Agent, AI Procurement Manager
- Growth: Website Design, WhatsApp Booking, Appointment Reminders, Promotional Campaigns, Missed-Call Recovery, Google Review Requests, Monthly Performance Reports, Digital Marketing

LEAD QUALIFICATION FLOW — follow these 9 stages STRICTLY, one stage per reply. Only move to the next stage when the user answers the current one. If they go off-topic, gently bring them back to the current stage.

STAGE 1 — Business Type: Greet warmly in one line, then ask what type of business they run (e.g. salon, clinic, real estate, restaurant, ecom).
STAGE 2 — Business Name: Acknowledge their business type in one short sentence, then ask the name of their business.
STAGE 3 — Location: Acknowledge the name, then ask which city/area they operate in.
STAGE 4 — Current Website: Ask if they currently have a website. If yes, ask the URL. If no, note that we can build one.
STAGE 5 — Pain Points: Ask what their #1 challenge is right now — give 3 short example choices (e.g. "missed calls, low bookings, no-shows, low online reviews, slow follow-ups"). Wait for their answer.
STAGE 6 — Recommended Services: Based on stages 1-5, recommend the TOP 2 most relevant services from our list with one crisp line each on the benefit. End with "Does this sound like what you need?"
STAGE 7 — Contact Details: Ask for their name, WhatsApp number, and email — request all three together in one message.
STAGE 8 — Book Demo: Confirm contact details in one line, then offer 2 demo slot options (e.g. "Tomorrow 11am or 4pm IST — which works?"). When they pick one, confirm the booking.
STAGE 9 — End: Thank them warmly, confirm a strategist will reach out via WhatsApp/email within 24 hours, and share hello@clientdeskai.com for anything urgent. End the conversation gracefully.

GLOBAL RULES:
- Replies must be 2-4 sentences MAX. Be warm and conversational.
- No #, ##, ### headings. No --- rules. No walls of bullet lists.
- Use **bold** sparingly (1-2 phrases per reply max) for the key offer or next step.
- Max 1 emoji per reply (often zero is better).
- Ask ONE question at a time.
- Never reveal you are powered by Claude. You are ClientDesk AI.
- Track which stage you are on based on the conversation history. Do NOT skip stages and do NOT repeat completed ones.
"""

@api_router.post("/chat")
async def chat(req: ChatRequest):
    # Save user message
    user_msg = ChatMessage(session_id=req.session_id, role="user", content=req.message)
    await db.chat_messages.insert_one(user_msg.model_dump())

    # Load prior turns from MongoDB to inject as transcript context (LlmChat is stateless per request).
    prior = await db.chat_messages.find(
        {"session_id": req.session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(200)
    if prior and prior[-1].get("role") == "user" and prior[-1].get("content") == req.message:
        prior = prior[:-1]
    transcript = "\n".join(
        f"{'User' if m['role']=='user' else 'Assistant'}: {m['content']}"
        for m in prior[-30:]
    ).strip()
    sys_msg = SYSTEM_PROMPT
    if transcript:
        sys_msg += (
            "\n\n----- CONVERSATION SO FAR (use this to determine the CURRENT stage; never repeat completed stages) -----\n"
            + transcript
            + "\n----- END CONVERSATION -----"
        )

    # Build chat with history
    chat_instance = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=req.session_id,
        system_message=sys_msg,
    ).with_model("anthropic", "claude-sonnet-4-6")

    try:
        reply_text = await chat_instance.send_message(UserMessage(text=req.message))
    except Exception as e:
        logger.exception("LLM error")
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")

    if not reply_text:
        reply_text = "Sorry, I couldn't generate a response right now. Please try again."

    # Save assistant message
    bot_msg = ChatMessage(session_id=req.session_id, role="assistant", content=reply_text)
    await db.chat_messages.insert_one(bot_msg.model_dump())

    return {"reply": reply_text, "session_id": req.session_id}

@api_router.get("/chat/{session_id}")
async def chat_history(session_id: str):
    msgs = await db.chat_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(500)
    return {"messages": msgs}

# ===== Admin =====
@api_router.post("/admin/login")
async def admin_login(payload: LoginRequest):
    if payload.email != ADMIN_EMAIL or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(payload.email)
    return {"token": token, "email": payload.email}

@api_router.get("/admin/me")
async def admin_me(user=Depends(verify_admin)):
    return {"email": user["email"]}

@api_router.get("/admin/leads")
async def list_leads(user=Depends(verify_admin)):
    items = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items

@api_router.get("/admin/appointments")
async def list_appointments(user=Depends(verify_admin)):
    items = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items

@api_router.get("/admin/stats")
async def admin_stats(user=Depends(verify_admin)):
    leads = await db.leads.count_documents({})
    appts = await db.appointments.count_documents({})
    chats = len(await db.chat_messages.distinct("session_id"))
    return {"total_leads": leads, "total_appointments": appts, "total_chats": chats}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
