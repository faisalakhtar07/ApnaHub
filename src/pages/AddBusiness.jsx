import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { businessesApi, uploadApi, userAuthApi } from "../lib/api";
import { compressImageFile } from "../lib/imageCompress";

const CATEGORIES = ["Electronics Store", "Sweet Shop", "Clothing Store", "Bike Repair & Service", "Restaurant", "Salon", "Grocery", "Other"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MAX_IMAGES = 6;

export default function AddBusiness() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "Electronics Store", subcategory: "", description: "",
    ownerName: "", phone: "", whatsapp: "", email: "",
    address: "", city: "Aurangabad", state: "Bihar", pincode: "", mapLink: "",
    openTime: "", closeTime: "", workingDays: [],
    website: "", additionalInfo: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!userAuthApi.isLoggedIn()) navigate("/login");
  }, [navigate]);

  if (!userAuthApi.isLoggedIn()) return null;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggleDay = (d) => setForm((f) => ({ ...f, workingDays: f.workingDays.includes(d) ? f.workingDays.filter((x) => x !== d) : [...f.workingDays, d] }));

  const addFiles = async (fileList) => {
    const files = Array.from(fileList).slice(0, MAX_IMAGES - images.length);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (const file of files) {
        const blob = await compressImageFile(file);
        const { url } = await uploadApi.file(blob, file.name);
        urls.push(url);
      }
      setImages((prev) => [...prev, ...urls].slice(0, MAX_IMAGES));
    } catch (err) {
      setError(err.message || "Photo upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  };
  const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.category) return setError("Business name and category are required.");
    setLoading(true);
    try {
      await businessesApi.create({ ...form, logo: images[0] || "", coverImage: images[0] || "", images });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
        <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Business submitted</h2>
        <p className="text-sm text-slate-400 mt-2">It'll appear in Business Near You once approved. Track its status from your dashboard.</p>
        <div className="flex gap-3 justify-center mt-6">
          <Btn variant="outline" onClick={() => navigate("/")}>Back to home</Btn>
          <Btn variant="primary" onClick={() => navigate("/my-account?tab=businesses")}>Go to my dashboard</Btn>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="For Businesses" title="List Your Business" subtitle="Free listing — reviewed by our team before it goes live." />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-6 sm:p-8" hover={false}>
          <form onSubmit={submit} className="space-y-4">
            <input required value={form.name} onChange={update("name")} placeholder="Business name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input value={form.subcategory} onChange={update("subcategory")} placeholder="Subcategory (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <textarea rows={3} value={form.description} onChange={update("description")} placeholder="Business description" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />

            <div className="grid grid-cols-2 gap-3">
              <input value={form.ownerName} onChange={update("ownerName")} placeholder="Owner name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.phone} onChange={update("phone")} placeholder="Mobile number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input value={form.whatsapp} onChange={update("whatsapp")} placeholder="WhatsApp number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.email} onChange={update("email")} placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>

            <input value={form.address} onChange={update("address")} placeholder="Full address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <div className="grid grid-cols-3 gap-3">
              <input value={form.city} onChange={update("city")} placeholder="City" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.state} onChange={update("state")} placeholder="State" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.pincode} onChange={update("pincode")} placeholder="Pincode" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <input value={form.mapLink} onChange={update("mapLink")} placeholder="Google Maps link (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />

            <div className="grid grid-cols-2 gap-3">
              <input value={form.openTime} onChange={update("openTime")} placeholder="Opening time (e.g. 9:00 AM)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.closeTime} onChange={update("closeTime")} placeholder="Closing time (e.g. 9:00 PM)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Working days</p>
              <div className="flex gap-1.5 flex-wrap">
                {DAYS.map((d) => (
                  <button type="button" key={d} onClick={() => toggleDay(d)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${form.workingDays.includes(d) ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <input value={form.website} onChange={update("website")} placeholder="Website (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <textarea rows={2} value={form.additionalInfo} onChange={update("additionalInfo")} placeholder="Anything else customers should know?" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Photos ({images.length}/{MAX_IMAGES}) — first photo is used as logo/cover</p>
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                    <img src={src} className="w-full h-full object-cover" alt={`Upload ${i + 1}`} />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={12} /></button>
                  </div>
                ))}
                {images.length < MAX_IMAGES && (
                  <button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-white/15 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-50">
                    <Camera size={18} />
                    <span className="text-[11px] font-medium">{uploading ? "Uploading…" : "Add"}</span>
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && addFiles(e.target.files)} />
            </div>

            {error && <p className="text-xs text-rose-500">{error}</p>}
            <Btn variant="primary" className="w-full" type="submit" disabled={loading || uploading}>{loading ? "Submitting…" : "Submit for review"}</Btn>
          </form>
        </Card>
      </div>
    </>
  );
}
