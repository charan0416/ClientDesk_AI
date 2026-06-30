import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { api } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("cdai_admin_token", res.data.token);
      navigate("/admin");
    } catch {
      setErr("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen flex items-center justify-center p-4 pt-24">
      <form onSubmit={submit} className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl p-8">
        <div className="w-12 h-12 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] mb-5">
          <Lock size={20}/>
        </div>
        <h1 className="font-display text-3xl font-semibold mb-2">Admin Login</h1>
        <p className="text-white/55 text-sm mb-6">Sign in to manage leads, appointments and chats.</p>
        <label className="text-xs uppercase tracking-[0.2em] text-white/50">Email</label>
        <input
          data-testid="admin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50"
          placeholder="admin@clientdeskai.com"
        />
        <label className="block mt-4 text-xs uppercase tracking-[0.2em] text-white/50">Password</label>
        <input
          data-testid="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF66]/50"
          placeholder="••••••••"
        />
        {err && <p data-testid="admin-error" className="mt-3 text-red-400 text-sm">{err}</p>}
        <button
          data-testid="admin-login-submit"
          disabled={loading}
          className="mt-6 w-full px-6 py-3 rounded-full bg-[#00FF66] text-black font-semibold glow-green hover:glow-green-lg transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
