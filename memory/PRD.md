# ClientDesk AI - PRD

## Brand
- Name: ClientDesk AI
- Tagline: Helping Businesses Grow Smarter.
- Visual: Bold dark theme (#08090B base) with electric green accent (#00E27A), Clash Display + Satoshi typography, Stripe/Linear/Vercel inspired enterprise SaaS look.

## Problem Statement (raw)
An AI agency website offering: AI Sales Executive, AI Customer Support, AI Receptionist, AI Recruiter, AI Collection Agent, AI Procurement Manager, Website Design, WhatsApp Booking, Appointment Reminders, Promotional Campaigns, Missed-Call Recovery, Google Review Requests, Monthly Performance Reports, Digital Marketing. With AI chatbot, trust signals, FOMO, lead-capture forms, mobile + desktop responsive.

## User Personas
- **Owner / Founder of a service business** (clinic, agency, real estate, retail) looking to scale without scaling headcount.
- **Operations / Growth lead** evaluating AI agency partners for receptionist, sales and support automation.
- **Admin / Internal user** logging in to monitor leads, appointments and chats.

## Architecture
- Backend: FastAPI + Motor (MongoDB), JWT auth, Claude Sonnet 4.6 via `emergentintegrations` (EMERGENT_LLM_KEY).
- Frontend: React 19 + React Router 7 + Tailwind, Clash Display & Satoshi via Fontshare, lucide-react icons, custom design system (no shadcn cards used for marketing surfaces).
- Routes: `/`, `/services`, `/service/:slug`, `/about`, `/contact`, `/admin/login`, `/admin`.

## Implemented (2026-02)
- Marketing site with Hero + product dashboard preview, Pillars, AI Agents bento grid, Growth services grid, How It Works (4-step), Case Studies (2), Testimonials (4), Pricing (3 tiers), FAQ accordion, Final CTA, Contact form.
- Floating Claude-powered AI chatbot widget on all marketing pages (lead capture).
- Service detail pages for all 14 services (6 AI agents + 8 growth services) with hero, benefits, "Why it matters", final CTA.
- Admin auth (JWT), Admin dashboard with stats cards + Leads + Appointments tables.
- Backend endpoints: `/api/leads`, `/api/appointments`, `/api/chat`, `/api/chat/{session_id}`, `/api/admin/login`, `/api/admin/me`, `/api/admin/leads`, `/api/admin/appointments`, `/api/admin/stats`.
- Test credentials: admin@clientdeskai.com / ClientDesk@2026
- Tested end-to-end (iteration_3.json): 100% backend, 100% frontend.

## Backlog (P1)
- Email notification on new lead (Resend/SendGrid integration).
- Calendar UI for appointment booking (use shadcn/ui calendar).
- Stripe checkout for online plan purchase.
- Blog / case study CMS.
- Multi-admin support (role-based).
- Replace placeholder phone/email with real contact details.
- Real client logos in trust strip.

## P2
- Localization (Hindi, Arabic).
- A/B testing on hero copy and CTA color.
- WhatsApp Business API integration for live chatbot hand-off.
