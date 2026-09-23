import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import Reveal from "../components/ui/Reveal";
import BusinessCard from "../components/BusinessCard";
import ListingCard from "../components/ListingCard";
import { businessesApi, listingsApi } from "../lib/api";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const loc = params.get("loc") || "Aurangabad, Bihar";
  const [results, setResults] = useState([]);

  useEffect(() => {
    Promise.all([businessesApi.list(), listingsApi.list()]).then(([businesses, listings]) => {
      const needle = q.trim().toLowerCase();
      const pool = [
        ...businesses.map((b) => ({ ...b, _kind: "business" })),
        ...listings.map((l) => ({ ...l, _kind: "listing" })),
      ];
      const filtered = needle
        ? pool.filter((item) => (item.name || item.title || "").toLowerCase().includes(needle))
        : pool;
      setResults(filtered);
    });
  }, [q]);

  return (
    <>
      <PageHeader eyebrow="Search" title={q ? `Results for "${q}"` : "Search results"} subtitle={`${results.length} results found in ${loc}.`} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {results.map((item, i) => (
            <Reveal key={`${item.name || item.title}-${i}`} delay={(i % 4) * 70}>
              {item._kind === "business" ? <BusinessCard b={item} /> : <ListingCard l={item} />}
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
