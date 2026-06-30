import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Calendar, MessageSquare, Inbox } from "lucide-react";
import { adminApi } from "../lib/api";

export default function AdminDashboard() {
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [appts, setAppts] = useState([]);
  const [stats, setStats] = useState({ total_leads: 0, total_appointments: 0, total_chats: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const a = adminApi();
      const [l, ap, st] = await Promise.all([
        a.get("/admin/leads"),
        a.get("/admin/appointments"),
        a.get("/admin/stats"),
      ]);
      setLeads(l.data);
      setAppts(ap.data);
      setStats(st.data);
    } catch (e) {
      if (e?.response?.status === 401) {
        localStorage.removeItem("cdai_admin_token");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("cdai_admin_token")) {
      navigate("/admin/login");
      return;
    }
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("cdai_admin_token");
    navigate("/admin/login");
  };

  return (
    <div data-testid="admin-dashboard" className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="section-label">Admin</span>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tighter mt-3">Dashboard</h1>
          </div>
          <button
            data-testid="admin-logout"
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#00FF66]/40 text-sm"
          >
            <LogOut size={14}/> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { Icon: Users, l: "Total Leads", v: stats.total_leads },
            { Icon: Calendar, l: "Appointments", v: stats.total_appointments },
            { Icon: MessageSquare, l: "Chat Sessions", v: stats.total_chats },
          ].map(({ Icon, l, v }) => (
            <div key={l} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                <Icon size={20}/>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{l}</p>
                <p className="font-display text-3xl text-white font-semibold">{v}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <button
            data-testid="tab-leads"
            onClick={() => setTab("leads")}
            className={`px-5 py-2 rounded-full text-sm font-medium border ${tab === "leads" ? "bg-[#00FF66] text-black border-[#00FF66]" : "border-white/10 text-white/70 hover:border-white/30"}`}
          >Leads</button>
          <button
            data-testid="tab-appointments"
            onClick={() => setTab("appointments")}
            className={`px-5 py-2 rounded-full text-sm font-medium border ${tab === "appointments" ? "bg-[#00FF66] text-black border-[#00FF66]" : "border-white/10 text-white/70 hover:border-white/30"}`}
          >Appointments</button>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-10 text-white/50 text-center">Loading...</div>
          ) : tab === "leads" ? (
            leads.length === 0 ? (
              <div className="p-10 text-center text-white/50 flex flex-col items-center gap-2">
                <Inbox size={28}/> No leads yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" data-testid="leads-table">
                  <thead className="bg-[#0F0F0F] text-white/50 text-left">
                    <tr>
                      <th className="px-5 py-3 font-medium">Name</th>
                      <th className="px-5 py-3 font-medium">Email</th>
                      <th className="px-5 py-3 font-medium">Phone</th>
                      <th className="px-5 py-3 font-medium">Service</th>
                      <th className="px-5 py-3 font-medium">Source</th>
                      <th className="px-5 py-3 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-5 py-3 text-white">{l.name}</td>
                        <td className="px-5 py-3 text-white/80">{l.email}</td>
                        <td className="px-5 py-3 text-white/80">{l.phone}</td>
                        <td className="px-5 py-3 text-white/70">{l.service || "-"}</td>
                        <td className="px-5 py-3"><span className="text-[10px] uppercase tracking-widest text-[#00FF66] bg-[#00FF66]/10 px-2 py-1 rounded-full">{l.source}</span></td>
                        <td className="px-5 py-3 text-white/50 text-xs">{new Date(l.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : appts.length === 0 ? (
            <div className="p-10 text-center text-white/50 flex flex-col items-center gap-2">
              <Inbox size={28}/> No appointments yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="appointments-table">
                <thead className="bg-[#0F0F0F] text-white/50 text-left">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Service</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appts.map((a) => (
                    <tr key={a.id} className="border-t border-white/5">
                      <td className="px-5 py-3 text-white">{a.name}</td>
                      <td className="px-5 py-3 text-white/80">{a.email}</td>
                      <td className="px-5 py-3 text-white/70">{a.service}</td>
                      <td className="px-5 py-3 text-white/70">{a.preferred_date}</td>
                      <td className="px-5 py-3 text-white/70">{a.preferred_time}</td>
                      <td className="px-5 py-3"><span className="text-[10px] uppercase tracking-widest text-[#00FF66] bg-[#00FF66]/10 px-2 py-1 rounded-full">{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
