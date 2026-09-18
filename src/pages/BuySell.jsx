import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import FilterBar from "../components/layout/FilterBar";
import PaginationBar from "../components/layout/PaginationBar";
import Reveal from "../components/ui/Reveal";
import ListingCard from "../components/ListingCard";
import { listingsApi } from "../lib/api";

export default function BuySell() {
  const [tab, setTab] = useState("All");
  const [items, setItems] = useState([]);
  useEffect(() => { listingsApi.list().then(setItems); }, []);
  return (
    <>
      <PageHeader eyebrow="Marketplace" title="Buy & Sell" subtitle="890+ active listings from people near you." />
      <Breadcrumb items={["Home", "Buy & Sell"]} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <FilterBar tabs={["All", "Vehicles", "Electronics", "Furniture"]} active={tab} setActive={setTab} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((l, i) => (<Reveal key={l.id} delay={(i % 4) * 70}><ListingCard l={l} /></Reveal>))}
        </div>
        <PaginationBar />
      </div>
    </>
  );
}
