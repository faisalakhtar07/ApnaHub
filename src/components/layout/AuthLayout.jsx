import React from "react";
import Card from "../ui/Card";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-indigo-50/60 to-white dark:from-[#131B2E] dark:to-[#0B1120] px-5 py-16">
      <Card className="w-full max-w-md p-8" hover={false}>
        <div className="text-center mb-6">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center mx-auto mb-4">
            <span className="font-display font-bold text-white">A</span>
          </span>
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{title}</h1>
          <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
        </div>
        {children}
      </Card>
    </div>
  );
}
