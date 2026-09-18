import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bookmark } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { jobsApi } from "../lib/api";

export default function JobDetails() {
  const { id } = useParams();
  const [j, setJ] = useState(null);
  useEffect(() => { jobsApi.get(id).then(setJ); }, [id]);

  if (!j) return <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading job…</div>;

  return (
    <>
      <Breadcrumb items={["Home", "Jobs", j.title]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-8" hover={false}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-display font-bold text-xl text-indigo-600 dark:text-indigo-400">{j.company.charAt(0)}</div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{j.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{j.company} · {j.loc}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[["Salary", j.salary], ["Experience", j.exp], ["Type", j.type]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4 text-center">
                <p className="text-[11px] uppercase tracking-wide text-slate-400 font-mono">{k}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{v}</p>
              </div>
            ))}
          </div>
          <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-8 mb-2">About the role</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We're hiring a motivated team member to join our Aurangabad location. Prior experience in a similar role is a plus but not required — training provided.
          </p>
          <div className="flex gap-3 mt-8">
            <Btn variant="primary" className="flex-1">Apply now</Btn>
            <Btn variant="outline" icon={Bookmark}>Save</Btn>
          </div>
        </Card>
      </div>
    </>
  );
}
