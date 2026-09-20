import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { subscriptionsApi, adsApi, userAuthApi } from "../lib/api";

const CATEGORIES = ["Vehicles", "Electronics", "Furniture", "Fashion", "Property", "Services", "Other"];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateAd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [checking, setChecking] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ title: "", category: "Vehicles", subcategory: "", description: "", price: "", location: "", city: "", state: "", pincode: "", phone: "", whatsapp: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!userAuthApi.isLoggedIn()) { navigate("/subscribe"); return; }
    subscriptionsApi.mine().then((res) => {
      if (!res.active) { navigate("/subscribe"); return; }
      setSubscription(res.subscription);
      setChecking(false);
    });
  }, [navigate]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const photoLimit = subscription?.plan?.photoLimit ?? 5;

  const addFiles = async (fileList) => {
    const files = Array.from(fileList).slice(0, photoLimit - images.length);
    const dataUrls = await Promise.all(files.map(fileToDataUrl));
    setImages((prev) => [...prev, ...dataUrls].slice(0, photoLimit));
  };
  const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.category) return setError("Title and category are required.");
    setLoading(true);
    try {
      await adsApi.create({ ...form, price: Number(form.price) || undefined, images });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Checking your subscription…</div>;

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
        <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Advertisement submitted</h2>
        <p className="text-sm text-slate-400 mt-2">It'll appear in the Advertisement Hub once approved.</p>
        <Btn variant="primary" className="mt-6" onClick={() => navigate("/")}>Back to home</Btn>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Post an Ad" title="Create your advertisement" subtitle={`Your plan allows ${subscription?.plan?.adLimit} ad(s), up to ${subscription?.plan?.photoLimit} photos and ${subscription?.plan?.videoLimit} video(s). Used so far: ${subscription?.adsUsed ?? 0}.`} />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-6 sm:p-8" hover={false}>
          <form onSubmit={submit} className="space-y-4">
            <input required value={form.title} onChange={update("title")} placeholder="Advertisement title" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input value={form.subcategory} onChange={update("subcategory")} placeholder="Subcategory (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <textarea rows={3} value={form.description} onChange={update("description")} placeholder="Description" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.price} onChange={update("price")} placeholder="Price (₹)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.location} onChange={update("location")} placeholder="Locality / area" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input value={form.city} onChange={update("city")} placeholder="City" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.state} onChange={update("state")} placeholder="State" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.pincode} onChange={update("pincode")} placeholder="Pincode" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input value={form.phone} onChange={update("phone")} placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.whatsapp} onChange={update("whatsapp")} placeholder="WhatsApp" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.email} onChange={update("email")} placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Photos ({images.length}/{photoLimit})</p>
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                    <img src={src} className="w-full h-full object-cover" alt={`Upload ${i + 1}`} />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={12} /></button>
                  </div>
                ))}
                {images.length < photoLimit && (
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-white/15 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-indigo-400 hover:text-indigo-500">
                    <Camera size={18} />
                    <span className="text-[11px] font-medium">Add</span>
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && addFiles(e.target.files)} />
            </div>

            {error && <p className="text-xs text-rose-500">{error}</p>}
            <Btn variant="primary" className="w-full" type="submit" disabled={loading}>{loading ? "Publishing…" : "Publish advertisement"}</Btn>
          </form>
        </Card>
      </div>
    </>
  );
}
