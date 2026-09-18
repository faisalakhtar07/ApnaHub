import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MessageSquareText, Package, LogOut, Phone } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { sellerAuthApi, sellerListingsApi, inquiriesApi } from "../lib/api";

const STATUS_TONE = { approved: "open", pending: "soon", rejected: "closed" };

export default function MyAccount() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("listings");
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = sellerAuthApi.currentUser();

  const load = () => {
    setLoading(true);
    Promise.all([sellerListingsApi.mine(), inquiriesApi.mine()])
      .then(([l, i]) => { setListings(l); setInquiries(i); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!sellerAuthApi.isLoggedIn()) { navigate("/post-ad"); return; }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await sellerListingsApi.remove(id);
    load();
  };

  const markRead = async (id) => {
    await inquiriesApi.markRead(id);
    load();
  };

  const logout = () => { sellerAuthApi.logout(); navigate("/"); };

  if (!sellerAuthApi.isLoggedIn()) return null;

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">My Account</h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5"><Phone size={13} /> {user?.phone}</p>
        </div>
        <Btn variant="outline" icon={LogOut} onClick={logout}>Log out</Btn>
      </div>

      <div className="flex gap-1 border-b border-slate-200 dark:border-white/10 mb-6">
        {[["listings", "My Listings", Package], ["inquiries", "Inquiries", MessageSquareText]].map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === key ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400"}`}
          >
            <Icon size={15} /> {label}
            {key === "inquiries" && inquiries.some((i) => i.status === "new") && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : tab === "listings" ? (
        <div className="space-y-3">
          {listings.length === 0 && <p className="text-sm text-slate-400">You haven't posted anything yet.</p>}
          {listings.map((l) => (
            <Card key={l.id} className="p-4 flex items-center gap-4" hover={false}>
              <img src={l.img} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={l.title} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 dark:text-white truncate">{l.title}</p>
                <p className="text-xs text-slate-400">{l.price} · {l.loc}</p>
              </div>
              <Badge tone={STATUS_TONE[l.status] || "neutral"}>{l.status || "approved"}</Badge>
              <button onClick={() => removeListing(l.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 shrink-0"><Trash2 size={15} /></button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.length === 0 && <p className="text-sm text-slate-400">No questions from buyers yet.</p>}
          {inquiries.map((i) => (
            <Card key={i.id} className="p-4" hover={false}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{i.buyerName} <span className="text-xs text-slate-400 font-normal">· {i.buyerPhone}</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">About: {i.listingTitle}</p>
                </div>
                {i.status === "new" && <Badge tone="verified">New</Badge>}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">{i.message}</p>
              <div className="flex gap-2 mt-3">
                <Btn variant="marigold" size="sm" onClick={() => window.open(`https://wa.me/${i.buyerPhone.replace(/\D/g, "")}`, "_blank")}>Reply on WhatsApp</Btn>
                {i.status === "new" && <Btn variant="ghost" size="sm" onClick={() => markRead(i.id)}>Mark as read</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
