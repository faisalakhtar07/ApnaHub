import React, { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact Us" subtitle="Questions, feedback, or partnership ideas — we'd love to hear from you." />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-2 gap-10">
        <div className="space-y-5">
          {[
            [MapPin, "Address", "Court Road, Aurangabad, Bihar 824101"],
            [Phone, "Phone", "+91 90000 00000"],
            [Mail, "Email", "hello@apnahub.in"],
          ].map(([Icon, k, v]) => (
            <div key={k} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0"><Icon size={18} className="text-indigo-600 dark:text-indigo-400" /></div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{k}</p>
                <p className="text-sm text-slate-400">{v}</p>
              </div>
            </div>
          ))}
        </div>
        <Card className="p-6" hover={false}>
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-3" />
              <p className="font-display font-semibold text-slate-900 dark:text-white">Message sent</p>
              <p className="text-sm text-slate-400 mt-1">We'll get back to you within a day.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <input required type="email" placeholder="Your email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
              <textarea required rows={4} placeholder="Your message" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 resize-none" />
              <Btn variant="primary" className="w-full">Send message</Btn>
            </form>
          )}
        </Card>
      </div>
    </>
  );
}
