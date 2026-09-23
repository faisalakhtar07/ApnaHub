import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import { jobsApi } from "../lib/api";

export default function JobDetails() {
  const { id } = useParams();
  const [j, setJ] = useState(null);
  useEffect(() => { jobsApi.get(id).then(setJ); }, [id]);

  if (!j) return <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading job…</div>;

  const location = [j.location, j.city, j.state].filter(Boolean).join(", ");
  const facts = [["Salary", j.salary], ["Experience", j.experience], ["Type", j.jobType], ["Vacancies", j.vacancies]].filter(([, v]) => v);

  return (
    <>
      <Breadcrumb items={["Home", "Jobs", j.title]} />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
        <Card className="p-8" hover={false}>
          <div className="flex items-start gap-4">
            {j.companyLogo ? (
              <img src={j.companyLogo} className="w-14 h-14 rounded-2xl object-cover" alt={j.companyName} />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center font-display font-bold text-xl text-indigo-600 dark:text-indigo-400">{j.companyName?.charAt(0)}</div>
            )}
            <div>
              <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">{j.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{j.companyName}{location ? ` · ${location}` : ""}</p>
            </div>
          </div>

          {facts.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-slate-50 dark:bg-white/5 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400 font-mono">{k}</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">{v}</p>
                </div>
              ))}
            </div>
          )}

          {j.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {j.skills.map((s) => <Badge key={s}>{s}</Badge>)}
            </div>
          )}

          {j.description && (
            <>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-8 mb-2">About the role</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{j.description}</p>
            </>
          )}
          {j.responsibilities && (
            <>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mt-6 mb-2">Responsibilities</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{j.responsibilities}</p>
            </>
          )}
          {j.qualification && <p className="text-sm text-slate-500 dark:text-slate-400 mt-4"><span className="font-medium text-slate-700 dark:text-slate-200">Qualification:</span> {j.qualification}</p>}
          {j.applicationDeadline && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Apply before {new Date(j.applicationDeadline).toLocaleDateString()}</p>}

          <div className="flex flex-wrap gap-3 mt-8">
            {j.contactNumber && <Btn variant="primary" icon={Phone} onClick={() => window.open(`tel:${j.contactNumber}`)}>Call to apply</Btn>}
            {j.whatsapp && <Btn variant="marigold" icon={MessageCircle} onClick={() => window.open(`https://wa.me/${j.whatsapp.replace(/\D/g, "")}`, "_blank")}>WhatsApp</Btn>}
            {j.email && <Btn variant="outline" icon={Mail} onClick={() => window.open(`mailto:${j.email}`)}>Email</Btn>}
            <Btn variant="ghost" icon={Bookmark}>Save</Btn>
          </div>
        </Card>
      </div>
    </>
  );
}
