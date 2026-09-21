import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { sellerAuthApi, sellerListingsApi } from "../lib/api";

const CATEGORIES = ["Vehicles", "Electronics", "Furniture", "Fashion", "Books & Hobbies", "Other"];
const CONDITIONS = ["New", "Used – Excellent", "Used – Good", "Used – Fair"];
const MAX_IMAGES = 6;

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function PostAd() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1); // 1: details, 2: photos, 3: verify phone, 4: done
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({ title: "", category: "Vehicles", price: "", cond: "Used – Good", loc: "Aurangabad" });
  const [images, setImages] = useState([]);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");

  const updateDetails = (k) => (e) => setDetails({ ...details, [k]: e.target.value });

  const addFiles = async (fileList) => {
    const files = Array.from(fileList).slice(0, MAX_IMAGES - images.length);
    const dataUrls = await Promise.all(files.map(fileToDataUrl));
    setImages((prev) => [...prev, ...dataUrls].slice(0, MAX_IMAGES));
  };

  const removeImage = (i) => setImages((prev) => prev.filter((_, idx) => idx !== i));

  const goNextFromDetails = (e) => {
    e.preventDefault();
    if (!details.title || !details.price) return setError("Title and price are required.");
    setError("");
    setStep(2);
  };

  const goNextFromPhotos = () => {
    if (images.length < 1) return setError("Add at least one photo (up to 6).");
    setError("");
    setStep(3);
  };

  const requestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await sellerAuthApi.requestOtp(phone);
      setOtpSent(true);
      if (res.devOtp) setDevOtp(res.devOtp); // dev-mode only, until a real SMS provider is wired up
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyAndSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sellerAuthApi.verifyOtp(phone, otp, name);
      await sellerListingsApi.create({ ...details, images });
      setStep(4);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Sell on APNAHUB" title="List an Item for Sale" subtitle="List your item in a few steps — free, and no account needed to get started." />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex items-center gap-2 mb-8">
          {["Details", "Photos", "Verify"].map((label, i) => (
            <React.Fragment key={label}>
              <div className={`flex items-center gap-2 text-sm font-medium ${step >= i + 1 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-300 dark:text-slate-600"}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= i + 1 ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-white/10"}`}>{i + 1}</span>
                {label}
              </div>
              {i < 2 && <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />}
            </React.Fragment>
          ))}
        </div>

        <Card className="p-6 sm:p-8" hover={false}>
          {step === 1 && (
            <form onSubmit={goNextFromDetails} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">What are you selling?</label>
                <input required value={details.title} onChange={updateDetails("title")} placeholder="e.g. Honda Activa 5G, 2021" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Category</label>
                  <select value={details.category} onChange={updateDetails("category")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Condition</label>
                  <select value={details.cond} onChange={updateDetails("cond")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                    {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Price (₹)</label>
                  <input required value={details.price} onChange={updateDetails("price")} placeholder="e.g. ₹58,000" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Location</label>
                  <input value={details.loc} onChange={updateDetails("loc")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
                </div>
              </div>
              {error && <p className="text-xs text-rose-500">{error}</p>}
              <Btn variant="primary" className="w-full" type="submit" iconRight>Continue to photos</Btn>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">Add {MAX_IMAGES - images.length > 0 ? `up to ${MAX_IMAGES - images.length} more` : "up to 6"} photos. The first photo becomes the cover image.</p>
              <div className="grid grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                    <img src={src} className="w-full h-full object-cover" alt={`Upload ${i + 1}`} />
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Cover</span>}
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={12} /></button>
                  </div>
                ))}
                {images.length < MAX_IMAGES && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-xl border-2 border-dashed border-slate-200 dark:border-white/15 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors"
                  >
                    <Camera size={20} />
                    <span className="text-xs font-medium">Add photo</span>
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && addFiles(e.target.files)} />
              {error && <p className="text-xs text-rose-500">{error}</p>}
              <div className="flex gap-3">
                <Btn variant="outline" icon={ArrowLeft} onClick={() => setStep(1)}>Back</Btn>
                <Btn variant="primary" className="flex-1" iconRight onClick={goNextFromPhotos}>Continue to verify</Btn>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={otpSent ? verifyAndSubmit : requestOtp} className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                <ShieldCheck size={18} />
                <p className="text-sm font-semibold">Verify your phone to publish</p>
              </div>
              {!otpSent ? (
                <>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Enter the code sent to <span className="font-semibold text-slate-700 dark:text-slate-200">{phone}</span></p>
                  {devOtp && <p className="text-xs text-amber-600 dark:text-amber-400">Dev mode — your code is <strong>{devOtp}</strong> (no SMS provider hooked up yet)</p>}
                  <input required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" maxLength={6} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 tracking-[0.3em] text-center font-mono" />
                </>
              )}
              {error && <p className="text-xs text-rose-500">{error}</p>}
              <div className="flex gap-3">
                <Btn variant="outline" icon={ArrowLeft} onClick={() => (otpSent ? setOtpSent(false) : setStep(2))} type="button">Back</Btn>
                <Btn variant="primary" className="flex-1" type="submit" disabled={loading} iconRight={!loading}>
                  {loading ? "Please wait…" : otpSent ? "Verify & publish" : "Send OTP"}
                </Btn>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-4" />
              <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Ad submitted</h2>
              <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">Your ad is in for a quick review and will appear in Buy & Sell once approved. You can track it from your account.</p>
              <div className="flex gap-3 justify-center mt-6">
                <Btn variant="outline" onClick={() => navigate("/")}>Back to home</Btn>
                <Btn variant="primary" onClick={() => navigate("/my-account")}>Go to my account</Btn>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
