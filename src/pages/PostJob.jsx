import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { jobsApi, uploadApi, userAuthApi } from "../lib/api";
import { compressImageFile } from "../lib/imageCompress";

const CATEGORIES = ["Sales", "Retail", "Delivery", "Office / Admin", "IT / Computer", "Hospitality", "Manufacturing", "Other"];
const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship", "Work From Home"];

export default function PostJob() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "", companyName: "", category: "Sales", jobType: "Full Time",
    salary: "", experience: "", qualification: "", skills: "",
    vacancies: 1, description: "", responsibilities: "",
    location: "", city: "Aurangabad", state: "Bihar", applicationDeadline: "",
    contactPerson: "", contactNumber: "", email: "", whatsapp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!userAuthApi.isLoggedIn()) navigate("/login");
  }, [navigate]);

  if (!userAuthApi.isLoggedIn()) return null;

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const addLogo = async (fileList) => {
    const file = fileList[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const blob = await compressImageFile(file);
      const { url } = await uploadApi.file(blob, file.name);
      setLogo(url);
    } catch (err) {
      setError(err.message || "Logo upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.companyName) return setError("Job title and company name are required.");
    setLoading(true);
    try {
      await jobsApi.create({
        ...form,
        vacancies: Number(form.vacancies) || 1,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        companyLogo: logo,
        images: logo ? [logo] : [],
      });
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
        <h2 className="font-display font-semibold text-xl text-slate-900 dark:text-white">Job submitted</h2>
        <p className="text-sm text-slate-400 mt-2">It'll appear in Latest Jobs once approved. Track its status from your dashboard.</p>
        <div className="flex gap-3 justify-center mt-6">
          <Btn variant="outline" onClick={() => navigate("/")}>Back to home</Btn>
          <Btn variant="primary" onClick={() => navigate("/my-account?tab=jobs")}>Go to my dashboard</Btn>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="For Employers" title="Post a Job" subtitle="Free job posting — reviewed by our team before it goes live." />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-6 sm:p-8" hover={false}>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input required value={form.title} onChange={update("title")} placeholder="Job title" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input required value={form.companyName} onChange={update("companyName")} placeholder="Company / business name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select value={form.category} onChange={update("category")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select value={form.jobType} onChange={update("jobType")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200">
                {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <input value={form.salary} onChange={update("salary")} placeholder="Salary (e.g. ₹12,000–18,000/mo)" className="col-span-2 w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input type="number" min={1} value={form.vacancies} onChange={update("vacancies")} placeholder="Vacancies" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input value={form.experience} onChange={update("experience")} placeholder="Experience (e.g. 0–2 yrs)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.qualification} onChange={update("qualification")} placeholder="Qualification" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <input value={form.skills} onChange={update("skills")} placeholder="Skills required (comma separated)" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            <textarea rows={3} value={form.description} onChange={update("description")} placeholder="Job description" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />
            <textarea rows={2} value={form.responsibilities} onChange={update("responsibilities")} placeholder="Key responsibilities" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />

            <div className="grid grid-cols-3 gap-3">
              <input value={form.location} onChange={update("location")} placeholder="Locality / area" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.city} onChange={update("city")} placeholder="City" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.state} onChange={update("state")} placeholder="State" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Application deadline (optional)</label>
              <input type="date" value={form.applicationDeadline} onChange={update("applicationDeadline")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <input value={form.contactPerson} onChange={update("contactPerson")} placeholder="Contact person" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.contactNumber} onChange={update("contactNumber")} placeholder="Contact number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input value={form.whatsapp} onChange={update("whatsapp")} placeholder="WhatsApp" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
            </div>
            <input value={form.email} onChange={update("email")} placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Company logo (optional)</p>
              <div className="flex items-center gap-3">
                {logo ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                    <img src={logo} className="w-full h-full object-cover" alt="Logo" />
                    <button type="button" onClick={() => setLogo("")} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center"><X size={10} /></button>
                  </div>
                ) : (
                  <button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-200 dark:border-white/15 flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-50">
                    <Camera size={16} />
                    <span className="text-[10px] font-medium">{uploading ? "…" : "Add"}</span>
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files && addLogo(e.target.files)} />
              </div>
            </div>

            {error && <p className="text-xs text-rose-500">{error}</p>}
            <Btn variant="primary" className="w-full" type="submit" disabled={loading || uploading}>{loading ? "Submitting…" : "Submit for review"}</Btn>
          </form>
        </Card>
      </div>
    </>
  );
}
