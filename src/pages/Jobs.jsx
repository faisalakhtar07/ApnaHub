import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import PaginationBar from "../components/layout/PaginationBar";
import Reveal from "../components/ui/Reveal";
import JobCard from "../components/JobCard";
import { jobsApi } from "../lib/api";

export default function Jobs() {
  const [tab, setTab] = useState("All");
  const [items, setItems] = useState([]);
  useEffect(() => { jobsApi.list().then(setItems); }, []);
  return (
    <>
      <PageHeader eyebrow="Careers" title="Jobs in Aurangabad" subtitle="520+ live openings from verified local employers." />
      <Breadcrumb items={["Home", "Jobs"]} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <FilterBar tabs={["All", "Full-time", "Part-time", "Fresher"]} active={tab} setActive={setTab} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((j, i) => (<Reveal key={j.id} delay={(i % 4) * 70}><JobCard j={j} /></Reveal>))}
        </div>
        <PaginationBar />
      </div>
    </>
  );
}
