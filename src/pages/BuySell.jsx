import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import PaginationBar from "../components/layout/PaginationBar";
import Reveal from "../components/ui/Reveal";
import ListingCard from "../components/ListingCard";
import { listingsApi } from "../lib/api";

const TABS = ["All", "Vehicles", "Electronics", "Furniture", "Fashion", "Books & Hobbies", "Other"];

export default function BuySell() {
  const [params] = useSearchParams();
  const initialCategory = params.get("category");
  const [tab, setTab] = useState(TABS.includes(initialCategory) ? initialCategory : "All");
  const [items, setItems] = useState([]);
  useEffect(() => { listingsApi.list().then(setItems); }, []);

  const visible = tab === "All" ? items : items.filter((l) => l.category === tab);

  return (
    <>
      <PageHeader eyebrow="Marketplace" title="Buy & Sell" subtitle="Active listings from people near you." />
      <Breadcrumb items={["Home", "Buy & Sell"]} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <FilterBar tabs={TABS} active={tab} setActive={setTab} />
        {visible.length === 0 ? (
          <p className="text-sm text-slate-400 py-12 text-center">No listings in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((l, i) => (<Reveal key={l.id} delay={(i % 4) * 70}><ListingCard l={l} /></Reveal>))}
          </div>
        )}
        <PaginationBar />
      </div>
    </>
  );
}
