import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Camera, X, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import ImageLightbox from "../components/ImageLightbox";
import { sellerAuthApi, sellerListingsApi, uploadApi } from "../lib/api";
import { compressImageFile } from "../lib/imageCompress";

const CATEGORIES = ["Vehicles", "Electronics", "Furniture", "Fashion", "Books & Hobbies", "Other"];
const CONDITIONS = ["New", "Used – Excellent", "Used – Good", "Used – Fair"];
const MAX_IMAGES = 6;

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!sellerAuthApi.isLoggedIn()) { navigate("/login"); return; }
    sellerListingsApi.mine().then((all) => {
      const listing = all.find((l) => String(l.id) === String(id));
      if (!listing) { setError("Listing not found, or it isn't yours."); setLoading(false); return; }
      setForm({
        title: listing.title, category: listing.category || "Vehicles", cond: listing.cond || "Used – Good",
        price: listing.price, loc: listing.loc, subcategory: listing.subcategory || "", negotiable: Boolean(listing.negotiable),
      });
      setImages(listing.images || (listing.img ? [listing.img] : []));
      setLoading(false);
    });
  }, [id, navigate]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

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
    if (!form.title || !form.price) return setError("Title and price are required.");
    if (images.length < 1) return setError("Add at least one photo.");
    setSaving(true);
    try {
      await sellerListingsApi.update(id, { ...form, images });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading listing…</div>;

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
        <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Listing updated</h2>
        <p className="text-sm text-slate-400 mt-2">Your changes are back in review and will be live again once approved.</p>
        <Btn variant="primary" className="mt-6" onClick={() => navigate("/my-account?tab=listings")}>Back to my listings</Btn>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-16 text-center">
        <p className="text-sm text-rose-500">{error}</p>
        <Btn variant="outline" className="mt-4" onClick={() => navigate("/my-account?tab=listings")}>Back to my listings</Btn>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Sell on APNAHUB" title="Edit Listing" subtitle="Changes go back into review before they show up again." />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-6 sm:p-8" hover={false}>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">What are you selling?</label>
              <input required value={form.title} onChange={update("title")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Category</label>
                <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Condition</label>
                <select value={form.cond} onChange={update("cond")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                  {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <input value={form.subcategory} onChange={update("subcategory")} placeholder="Subcategory (optional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Price (₹)</label>
                <input required value={form.price} onChange={update("price")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Location</label>
                <input value={form.loc} onChange={update("loc")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input type="checkbox" checked={form.negotiable} onChange={(e) => setForm({ ...form, negotiable: e.target.checked })} className="w-4 h-4" />
              Price is negotiable
            </label>

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Photos ({images.length}/{MAX_IMAGES}) — tap a photo to zoom</p>
              <div className="grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 cursor-zoom-in" onClick={() => setLightboxIndex(i)}>
                    <img src={src} className="w-full h-full object-cover" alt={`Photo ${i + 1}`} />
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Cover</span>}
                    <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={12} /></button>
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
            <div className="flex gap-3">
              <Btn variant="outline" onClick={() => navigate("/my-account?tab=listings")} type="button">Cancel</Btn>
              <Btn variant="primary" className="flex-1" type="submit" disabled={saving || uploading}>{saving ? "Saving…" : "Save changes"}</Btn>
            </div>
          </form>
        </Card>
      </div>
      <ImageLightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />
    </>
  );
}
