import React from "react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Our Story" title="About APNAHUB" subtitle="Built in Aurangabad, for Aurangabad — and beyond." />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 space-y-6 text-slate-500 dark:text-slate-400 leading-relaxed">
        <p>APNAHUB started with a simple observation: finding a job, a trustworthy shop, or a fair deal in a smaller city usually means asking around, not searching online. We built APNAHUB to change that — starting right here in Aurangabad, Bihar.</p>
        <p>Our goal is to give every local business a free, simple way to be found, every job seeker a direct line to real openings, and every buyer or seller a safe place to trade without middlemen.</p>
        <div className="grid sm:grid-cols-3 gap-4 not-prose py-4">
          {[["2025", "Founded in Aurangabad"], ["Bihar", "Next phase of expansion"], ["India", "Long-term vision"]].map(([k, v]) => (
            <Card key={k} className="p-6 text-center" hover={false}>
              <p className="font-display font-bold text-2xl text-indigo-600 dark:text-indigo-400">{k}</p>
              <p className="text-xs text-slate-400 mt-1">{v}</p>
            </Card>
          ))}
        </div>
        <p>We're a small, local-first team building for the long run — one district at a time.</p>
      </div>
    </>
  );
}
