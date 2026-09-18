import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Btn from "../components/ui/Btn";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title="Reset your password" subtitle="We'll send a reset link to your email">
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Check your inbox for a reset link.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <input required type="email" placeholder="Your email address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
          <Btn variant="primary" className="w-full">Send reset link</Btn>
        </form>
      )}
      <p className="text-center text-sm text-slate-400 mt-6">
        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold inline-flex items-center gap-1"><ArrowLeft size={13} /> Back to login</Link>
      </p>
    </AuthLayout>
  );
}
