import React from "react";

export default function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/[0.06] ${className}`} />;
}
