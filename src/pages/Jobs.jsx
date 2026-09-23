import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import PaginationBar from "../components/layout/PaginationBar";
import Reveal from "../components/ui/Reveal";
import Btn from "../components/ui/Btn";
import JobCard from "../components/JobCard";
import { jobsApi } from "../lib/api";

export default function Jobs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("All");
  const [items, setItems] = useState([]);
  useEffect(() => { jobsApi.list().then(setItems); }, []);
  return (
    <>
      <PageHeader eyebrow="Careers" title="Jobs in Aurangabad" subtitle="Live openings from verified local employers." />
      <Breadcrumb items={["Home", "Jobs"]} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <FilterBar tabs={["All", "Full Time", "Part Time", "Contract", "Internship", "Work From Home"]} active={tab} setActive={setTab} />
          <Btn variant="primary" icon={Plus} className="shrink-0" onClick={() => navigate("/post-job")}>Post a Job</Btn>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((j, i) => (<Reveal key={j.id} delay={(i % 4) * 70}><JobCard j={j} /></Reveal>))}
        </div>
        <PaginationBar />
      </div>
    </>
  );
}
