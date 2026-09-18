import React, { useEffect, useState } from "react";
import { MapPin, BadgeCheck } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import ListingCard from "../components/ListingCard";
import { listingsApi } from "../lib/api";

export default function Profile() {
  const [tab, setTab] = useState("Listings");
  const [listings, setListings] = useState([]);
  useEffect(() => { listingsApi.list().then((d) => setListings(d.slice(0, 3))); }, []);

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-amber-400 flex items-center justify-center font-display font-bold text-3xl text-white shrink-0">F</div>
        <div className="text-center sm:text-left">
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Faisal A.</h1>
          <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1"><MapPin size={13} /> Aurangabad, Bihar</p>
          <Badge tone="verified" className="mt-2"><BadgeCheck size={12} /> Verified member</Badge>
        </div>
        <Btn variant="outline" className="sm:ml-auto">Edit profile</Btn>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {[["3", "Listings"], ["12", "Saved items"], ["4.9", "Rating"]].map(([v, l]) => (
          <Card key={l} className="p-5 text-center" hover={false}>
            <p className="font-display font-bold text-2xl text-slate-900 dark:text-white">{v}</p>
            <p className="text-xs text-slate-400 mt-1">{l}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-1 mt-10 border-b border-slate-200 dark:border-white/10">
        {["Listings", "Saved", "Reviews"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400"}`}>{t}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
        {listings.map((l) => (<ListingCard key={l.id} l={l} />))}
      </div>
    </div>
  );
}
