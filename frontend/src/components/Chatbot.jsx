import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { api } from "../lib/api";

function getSessionId() {
  let id = localStorage.getItem("cdai_chat_session");
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("cdai_chat_session", id);
  }
  return id;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm ClientDesk AI. Tell me about your business and I'll show you exactly how we can help you grow. What do you do?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(getSessionId());
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat", { session_id: sessionId.current, message: text });
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I hit a snag. Please try again or call us at +91 90000 00000." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          data-testid="chatbot-open-btn"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#00FF66] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.55)] hover:scale-105 transition pulse-ring"
          aria-label="Open chat"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {open && (
        <div
          data-testid="chatbot-window"
          className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-[400px] h-[70vh] max-h-[600px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#00FF66] flex items-center justify-center text-black">
                <Sparkles size={16} />
              </div>
              <div className="leading-tight">
                <p className="font-display font-semibold text-white text-sm">ClientDesk AI</p>
                <p className="text-[10px] text-[#00FF66] uppercase tracking-widest">Online · replies instantly</p>
              </div>
            </div>
            <button
              data-testid="chatbot-close-btn"
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#00FF66] text-black rounded-br-sm"
                      : "bg-[#161616] text-white/90 border border-white/5 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#161616] border border-white/5 px-4 py-3 rounded-2xl text-sm text-white/60">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-bounce" style={{animationDelay: '0ms'}}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-bounce" style={{animationDelay: '120ms'}}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-bounce" style={{animationDelay: '240ms'}}></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 bg-[#0F0F0F]">
            <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2 border border-white/5 focus-within:border-[#00FF66]/40 transition">
              <input
                data-testid="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything or share your details..."
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"
              />
              <button
                data-testid="chatbot-send-btn"
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-[#00FF66] text-black flex items-center justify-center disabled:opacity-40 hover:scale-105 transition"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
