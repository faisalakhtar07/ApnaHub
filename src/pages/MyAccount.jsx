import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Trash2, MessageSquareText, Package, LogOut, Phone, LayoutDashboard, Megaphone, Bell, Check, ImagePlus, Building2, Briefcase, CheckCircle2, ShoppingBag, X as XIcon } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { userAuthApi, sellerListingsApi, inquiriesApi, adsApi, notificationsApi, businessesApi, jobsApi, ordersApi } from "../lib/api";

const LISTING_STATUS_TONE = { approved: "open", pending: "soon", rejected: "closed", sold: "neutral" };
const AD_STATUS_TONE = { pending: "soon", approved: "open", active: "open", rejected: "closed", suspended: "closed", expired: "neutral", draft: "neutral" };
const STATUS_TONE = { pending: "soon", approved: "open", rejected: "closed", suspended: "closed", closed: "neutral" };

export default function MyAccount() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") || "overview");
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [ads, setAds] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = userAuthApi.currentUser();

  const load = () => {
    setLoading(true);
    Promise.all([sellerListingsApi.mine(), inquiriesApi.mine(), adsApi.mine(), notificationsApi.mine(), businessesApi.mine(), jobsApi.mine(), ordersApi.mine()])
      .then(([l, i, a, n, biz, jb, ord]) => { setListings(l); setInquiries(i); setAds(a); setNotifications(n); setBusinesses(biz); setJobs(jb); setOrders(ord); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!userAuthApi.isLoggedIn()) { navigate("/login"); return; }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await sellerListingsApi.remove(id);
    load();
  };

  const markSold = async (id) => {
    await sellerListingsApi.markSold(id);
    load();
  };

  const removeBusiness = async (id) => {
    if (!window.confirm("Delete this business?")) return;
    await businessesApi.remove(id);
    load();
  };

  const removeJob = async (id) => {
    if (!window.confirm("Delete this job post?")) return;
    await jobsApi.remove(id);
    load();
  };

  const closeJob = async (id) => {
    await jobsApi.close(id);
    load();
  };

  const confirmOrder = async (id) => {
    if (!window.confirm("Confirm this sale? The listing will be marked sold and won't be available to other buyers.")) return;
    await ordersApi.confirm(id);
    load();
  };

  const rejectOrder = async (id) => {
    await ordersApi.reject(id);
    load();
  };

  const markInquiryRead = async (id) => {
    await inquiriesApi.markRead(id);
    load();
  };

  const markNotificationRead = async (id) => {
    await notificationsApi.markRead(id);
    load();
  };

  const markAllNotificationsRead = async () => {
    await notificationsApi.markAllRead();
    load();
  };

  const logout = () => { userAuthApi.logout(); navigate("/"); };

  if (!userAuthApi.isLoggedIn()) return null;

  const unreadInquiries = inquiries.filter((i) => i.status === "new").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const needsMediaCount = ads.filter((a) => a.needsMediaDesign).length;

  const TABS = [
    ["overview", "Overview", LayoutDashboard, 0],
    ["listings", "My Listings", Package, 0],
    ["orders", "Buy Requests", ShoppingBag, pendingOrders],
    ["businesses", "My Businesses", Building2, 0],
    ["jobs", "My Jobs", Briefcase, 0],
    ["ads", "My Ads", Megaphone, needsMediaCount],
    ["inquiries", "Inquiries", MessageSquareText, unreadInquiries],
    ["notifications", "Notifications", Bell, unreadNotifications],
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5"><Phone size={13} /> {user?.phone}</p>
        </div>
        <Btn variant="outline" icon={LogOut} onClick={logout}>Log out</Btn>
      </div>

      <div className="flex gap-1 border-b border-slate-200 dark:border-white/10 mb-6 overflow-x-auto">
        {TABS.map(([key, label, Icon, badge]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${tab === key ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400"}`}
          >
            <Icon size={15} /> {label}
            {badge > 0 && <span className="w-2 h-2 rounded-full bg-rose-500" />}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading…</p>
      ) : tab === "overview" ? (
        <div className="space-y-5">
          <Card className="p-6" hover={false}>
            <p className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Your account</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-slate-400 text-xs">Name</p><p className="text-slate-700 dark:text-slate-200">{user?.name || "—"}</p></div>
              <div><p className="text-slate-400 text-xs">Phone</p><p className="text-slate-700 dark:text-slate-200">{user?.phone}</p></div>
              <div className="sm:col-span-2">
                <p className="text-slate-400 text-xs mb-1.5">Roles</p>
                <div className="flex gap-1.5 flex-wrap">
                  {(user?.roles || []).map((r) => <Badge key={r} tone="verified">{r}</Badge>)}
                </div>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <Card className="p-4 text-center" hover={false}><p className="font-display font-bold text-xl text-slate-900 dark:text-white">{listings.length}</p><p className="text-xs text-slate-400 mt-1">Listings</p></Card>
            <Card className="p-4 text-center" hover={false}><p className="font-display font-bold text-xl text-slate-900 dark:text-white">{businesses.length}</p><p className="text-xs text-slate-400 mt-1">Businesses</p></Card>
            <Card className="p-4 text-center" hover={false}><p className="font-display font-bold text-xl text-slate-900 dark:text-white">{jobs.length}</p><p className="text-xs text-slate-400 mt-1">Job posts</p></Card>
            <Card className="p-4 text-center" hover={false}><p className="font-display font-bold text-xl text-slate-900 dark:text-white">{ads.length}</p><p className="text-xs text-slate-400 mt-1">Ads</p></Card>
            <Card className="p-4 text-center" hover={false}><p className="font-display font-bold text-xl text-slate-900 dark:text-white">{inquiries.length}</p><p className="text-xs text-slate-400 mt-1">Inquiries</p></Card>
          </div>
          <p className="text-xs text-slate-400">My Orders/Sales and Applications will appear here once those features launch.</p>
        </div>
      ) : tab === "listings" ? (
        <div className="space-y-3">
          {listings.length === 0 && <p className="text-sm text-slate-400">You haven't posted anything yet.</p>}
          {listings.map((l) => (
            <Card key={l.id} className="p-4" hover={false}>
              <div className="flex items-center gap-4">
                <img src={l.img} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={l.title} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-white truncate">{l.title}</p>
                  <p className="text-xs text-slate-400">{l.price} · {l.loc}</p>
                </div>
                <Badge tone={LISTING_STATUS_TONE[l.status] || "neutral"}>{l.status || "approved"}</Badge>
                {l.status === "approved" && (
                  <Btn variant="outline" size="sm" icon={CheckCircle2} onClick={() => markSold(l.id)}>Mark sold</Btn>
                )}
                <button onClick={() => removeListing(l.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 shrink-0"><Trash2 size={15} /></button>
              </div>
              {l.status === "rejected" && l.rejectionReason && (
                <p className="text-xs text-rose-500 mt-3 pl-20">Rejected: {l.rejectionReason}</p>
              )}
            </Card>
          ))}
        </div>
      ) : tab === "orders" ? (
        <div className="space-y-3">
          {orders.length === 0 && <p className="text-sm text-slate-400">No buy requests yet.</p>}
          {orders.map((o) => (
            <Card key={o.id} className="p-4" hover={false}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">{o.buyerName} <span className="text-xs text-slate-400 font-normal">· {o.buyerPhone}</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">Wants to buy: {o.listingTitle}</p>
                  <p className="text-[11px] text-slate-300 dark:text-slate-500 mt-1">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <Badge tone={o.status === "confirmed" ? "open" : o.status === "rejected" ? "closed" : "soon"}>{o.status}</Badge>
              </div>
              {o.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Btn variant="primary" size="sm" icon={CheckCircle2} onClick={() => confirmOrder(o.id)}>Confirm sale</Btn>
                  <Btn variant="danger" size="sm" icon={XIcon} onClick={() => rejectOrder(o.id)}>Reject</Btn>
                  <Btn variant="ghost" size="sm" icon={Phone} onClick={() => window.open(`tel:${o.buyerPhone}`)}>Call buyer</Btn>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : tab === "businesses" ? (
        <div className="space-y-3">
          {businesses.length === 0 && <p className="text-sm text-slate-400">You haven't listed a business yet. Use "List Your Business" from the Businesses page.</p>}
          {businesses.map((b) => (
            <Card key={b.id} className="p-4" hover={false}>
              <div className="flex items-center gap-4">
                {b.coverImage || b.images?.[0] ? (
                  <img src={b.coverImage || b.images[0]} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={b.name} />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 shrink-0"><Building2 size={18} /></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-white truncate">{b.name}</p>
                  <p className="text-xs text-slate-400">{b.category}{b.city ? ` · ${b.city}` : ""}</p>
                </div>
                <Badge tone={STATUS_TONE[b.status] || "neutral"}>{b.status}</Badge>
                <button onClick={() => removeBusiness(b.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 shrink-0"><Trash2 size={15} /></button>
              </div>
              {b.status === "rejected" && b.rejectionReason && (
                <p className="text-xs text-rose-500 mt-3 pl-20">Rejected: {b.rejectionReason}</p>
              )}
            </Card>
          ))}
        </div>
      ) : tab === "jobs" ? (
        <div className="space-y-3">
          {jobs.length === 0 && <p className="text-sm text-slate-400">You haven't posted a job yet. Use "Post a Job" from the Jobs page.</p>}
          {jobs.map((j) => (
            <Card key={j.id} className="p-4" hover={false}>
              <div className="flex items-center gap-4">
                {j.companyLogo ? (
                  <img src={j.companyLogo} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={j.title} />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 shrink-0"><Briefcase size={18} /></div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-white truncate">{j.title}</p>
                  <p className="text-xs text-slate-400">{j.companyName}{j.city ? ` · ${j.city}` : ""}</p>
                </div>
                <Badge tone={STATUS_TONE[j.status] || "neutral"}>{j.status}</Badge>
                {j.status === "approved" && (
                  <Btn variant="outline" size="sm" onClick={() => closeJob(j.id)}>Close</Btn>
                )}
                <button onClick={() => removeJob(j.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 shrink-0"><Trash2 size={15} /></button>
              </div>
              {j.status === "rejected" && j.rejectionReason && (
                <p className="text-xs text-rose-500 mt-3 pl-20">Rejected: {j.rejectionReason}</p>
              )}
            </Card>
          ))}
        </div>
      ) : tab === "ads" ? (
        <div className="space-y-3">
          {ads.length === 0 && <p className="text-sm text-slate-400">No advertisements yet. Post one from the "Post an Ad" button in the menu.</p>}
          {ads.map((a) => (
            <Card key={a._id} className="p-4 flex items-center gap-4" hover={false}>
              {a.images?.[0] ? (
                <img src={a.images[0]} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={a.title} />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 shrink-0"><ImagePlus size={18} /></div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 dark:text-white truncate">{a.title}</p>
                <p className="text-xs text-slate-400">{a.category}{a.price ? ` · ₹${Number(a.price).toLocaleString("en-IN")}` : ""}</p>
              </div>
              {a.needsMediaDesign && <Badge tone="soon">Awaiting media</Badge>}
              <Badge tone={AD_STATUS_TONE[a.status] || "neutral"}>{a.status}</Badge>
            </Card>
          ))}
        </div>
      ) : tab === "inquiries" ? (
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
                {i.status === "new" && <Btn variant="ghost" size="sm" onClick={() => markInquiryRead(i.id)}>Mark as read</Btn>}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {unreadNotifications > 0 && (
            <button onClick={markAllNotificationsRead} className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-2">
              <Check size={12} /> Mark all read
            </button>
          )}
          {notifications.length === 0 && <p className="text-sm text-slate-400">No notifications yet.</p>}
          {notifications.map((n) => (
            <Card key={n._id} className="p-4" hover={false}>
              <div className="flex items-start gap-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read ? "bg-transparent" : "bg-indigo-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? "text-slate-500 dark:text-slate-400" : "text-slate-800 dark:text-white font-medium"}`}>{n.title}</p>
                  {n.message && <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>}
                  <p className="text-[11px] text-slate-300 dark:text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                {!n.read && <Btn variant="ghost" size="sm" onClick={() => markNotificationRead(n._id)}>Mark read</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
