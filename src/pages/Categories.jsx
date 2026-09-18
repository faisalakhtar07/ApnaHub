import React from "react";
import PageHeader from "../components/layout/PageHeader";
import Reveal from "../components/ui/Reveal";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { CATEGORIES } from "../data/mockData";

export default function Categories() {
  return (
    <>
      <PageHeader eyebrow="Explore" title="All Categories" subtitle="Find exactly what you're looking for." />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.title} delay={i * 50}>
            <Card className="p-6 h-full relative">
              {c.soon && <Badge tone="soon" className="absolute top-4 right-4">Soon</Badge>}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${c.tone}`}><c.icon size={22} /></div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">{c.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </>
  );
}
