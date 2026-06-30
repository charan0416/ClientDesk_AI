import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { api } from "../lib/api";

function getSessionId() {
  let id = localStorage.getItem("cdai_chat_session");
  if (!id) { id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`; localStorage.setItem("cdai_chat_session", id); }
  return id;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "welcome", role: "assistant", content: "Hi! I'm the ClientDesk AI assistant. Tell me what you do and I'll show you exactly how we can help you grow. What's your business?" },
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
    const userId = `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setMessages((m) => [...m, { id: userId, role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat", { session_id: sessionId.current, message: text });
      const botId = `b_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      setMessages((m) => [...m, { id: botId, role: "assistant", content: res.data.reply }]);
    } catch {
      const errId = `e_${Date.now()}`;
      setMessages((m) => [...m, { id: errId, role: "assistant", content: "Sorry, I hit a snag. Please try again or email hello@clientdeskai.com." }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      {!open && (
        <button data-testid="chatbot-open-btn" onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-[#00E27A] text-[#051910] flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,226,122,0.6)] hover:scale-105 transition"
          aria-label="Open chat">
          <MessageCircle size={22}/>
        </button>
      )}
      {open && (
        <div data-testid="chatbot-window" className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[400px] h-[70vh] max-h-[600px] bg-[#0B0C10] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between bg-[#0F1015]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00E27A] flex items-center justify-center text-[#051910]"><Sparkles size={14}/></div>
              <div className="leading-tight">
                <p className="text-white text-sm font-medium">ClientDesk AI</p>
                <p className="text-[10px] text-[#00E27A] uppercase tracking-widest font-mono">Online · replies instantly</p>
              </div>
            </div>
            <button data-testid="chatbot-close-btn" onClick={() => setOpen(false)} className="text-white/55 hover:text-white" aria-label="Close chat"><X size={17}/></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} data-testid={`chatbot-message-${m.role}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-[#00E27A] text-[#051910] rounded-br-sm" : "bg-[#15171C] text-white/90 border border-white/[0.06] rounded-bl-sm"}`}>
                  {m.role === "assistant" ? (
                    <div className="chat-md">
                      <ReactMarkdown
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="leading-snug" {...props} />,
                          strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                          em: ({node, ...props}) => <em className="text-white/90" {...props} />,
                          h1: ({node, ...props}) => <p className="text-white font-semibold mb-1" {...props} />,
                          h2: ({node, ...props}) => <p className="text-white font-semibold mb-1" {...props} />,
                          h3: ({node, ...props}) => <p className="text-white font-semibold mb-1" {...props} />,
                          hr: () => <div className="my-2 border-t border-white/10" />,
                          a: ({node, ...props}) => <a className="text-[#00E27A] underline-offset-2 hover:underline" target="_blank" rel="noreferrer" {...props} />,
                          code: ({node, ...props}) => <code className="px-1 py-0.5 rounded bg-white/[0.06] text-[#00E27A] font-mono text-[12px]" {...props} />,
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#15171C] border border-white/[0.06] px-3.5 py-2.5 rounded-2xl text-sm text-white/60">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E27A] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E27A] animate-bounce" style={{animationDelay: '120ms'}}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E27A] animate-bounce" style={{animationDelay: '240ms'}}></span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/[0.06] bg-[#0F1015]">
            <div className="flex items-center gap-2 bg-[#15171C] rounded-full px-4 py-2 border border-white/[0.06] focus-within:border-[#00E27A]/40 transition">
              <input data-testid="chatbot-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask anything or share your details..." className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/30"/>
              <button data-testid="chatbot-send-btn" onClick={send} disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-[#00E27A] text-[#051910] flex items-center justify-center disabled:opacity-40 hover:scale-105 transition">
                <Send size={13}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
