import React, { useState } from "react";
import { X, CheckCircle2, Send } from "lucide-react";
import Modal from "./ui/Modal";
import Card from "./ui/Card";
import Btn from "./ui/Btn";
import { inquiriesApi } from "../lib/api";

export default function AskSellerModal({ open, onClose, listingId, listingTitle }) {
  const [form, setForm] = useState({ buyerName: "", buyerPhone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await inquiriesApi.ask(listingId, form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Couldn't send your question. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSent(false); setForm({ buyerName: "", buyerPhone: "", message: "" }); setError(""); }, 200);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card className="p-6" hover={false}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-semibold text-lg text-slate-900 dark:text-white">Ask the seller</h2>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[260px]">About: {listingTitle}</p>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X size={18} /></button>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-display font-semibold text-slate-900 dark:text-white">Question sent</p>
            <p className="text-sm text-slate-400 mt-1">The seller will see this in their inbox and can reach out to you directly.</p>
            <Btn variant="primary" className="mt-5" onClick={handleClose}>Done</Btn>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              required
              placeholder="Your name"
              value={form.buyerName}
              onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200"
            />
            <input
              required
              placeholder="Your phone number"
              value={form.buyerPhone}
              onChange={(e) => setForm({ ...form, buyerPhone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200"
            />
            <textarea
              required
              rows={3}
              placeholder="Is this still available? Any other details you'd like to ask…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none"
            />
            {error && <p className="text-xs text-rose-500">{error}</p>}
            <Btn variant="primary" icon={Send} className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send question"}
            </Btn>
          </form>
        )}
      </Card>
    </Modal>
  );
}
