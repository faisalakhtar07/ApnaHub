import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import PaginationBar from "../components/layout/PaginationBar";
import Reveal from "../components/ui/Reveal";
import BusinessCard from "../components/BusinessCard";
import { businessesApi } from "../lib/api";

export default function Businesses() {
  const [tab, setTab] = useState("All");
  const [items, setItems] = useState([]);
  useEffect(() => { businessesApi.list().then(setItems); }, []);
  return (
    <>
      <PageHeader eyebrow="Directory" title="Local Businesses" subtitle="340+ verified businesses across Aurangabad and growing." />
      <Breadcrumb items={["Home", "Businesses"]} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <FilterBar tabs={["All", "Open now", "Electronics", "Food", "Services"]} active={tab} setActive={setTab} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((b, i) => (<Reveal key={b.id} delay={(i % 4) * 70}><BusinessCard b={b} /></Reveal>))}
        </div>
        <PaginationBar />
      </div>
    </>
  );
}
