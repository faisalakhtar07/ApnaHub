import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, Briefcase, Building2, ShoppingBag, Star, ChevronLeft, ChevronRight,
  Quote, PlayCircle, Apple, Mail, Send, CheckCircle2, Building2 as BuildingIcon, ListChecks, Users,
  Handshake, UserPlus,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import Skeleton from "../components/ui/Skeleton";
import Reveal from "../components/ui/Reveal";
import SectionHead from "../components/ui/SectionHead";
import SectionHeading from "../components/SectionHeading";
import RoleCard from "../components/RoleCard";
import AdvertisementHub from "../components/AdvertisementHub";
import { goToPostAd } from "../lib/postAdFlow";
import { categoryDestination } from "../lib/categoryRoutes";
import RevealImage from "../components/RevealImage";
import HowItWorks from "../components/HowItWorks";
import BusinessCard from "../components/BusinessCard";
import JobCard from "../components/JobCard";
import ListingCard from "../components/ListingCard";
import useCountUp from "../hooks/useCountUp";
import useInView from "../hooks/useInView";
import { CATEGORIES, TESTIMONIALS, WHY, PULSE } from "../data/mockData";
import { businessesApi, jobsApi, listingsApi, statsApi } from "../lib/api";

function PulseTicker() {
  const items = [...PULSE, ...PULSE];
  return (
    <div className="relative border-y border-slate-200/70 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-3">
        {items.map((t, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const [loc, setLoc] = useState("Aurangabad, Bihar");
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}&loc=${encodeURIComponent(loc)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-[#131B2E] dark:via-[#0B1120] dark:to-[#0B1120] pt-16 pb-10 sm:pt-24 sm:pb-16">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-indigo-400/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute top-40 -left-24 w-[360px] h-[360px] rounded-full bg-amber-300/20 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center relative">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold font-mono tracking-wide mb-6">
              <MapPin size={13} /> LIVE NOW IN AURANGABAD, BIHAR
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-semibold text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] text-slate-900 dark:text-white tracking-tight">
              Everything Local,<br />
              <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">All in One Place.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Jobs, local businesses, and buy-and-sell listings from your own city — starting in Aurangabad, growing across Bihar and India.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <form onSubmit={submitSearch} className="mt-8 flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none max-w-xl">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-white/10 shrink-0">
                <MapPin size={16} className="text-indigo-500 shrink-0" />
                <select
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 outline-none w-32"
                >
                  <option>Aurangabad, Bihar</option>
                  <option>Gaya, Bihar</option>
                  <option>Patna, Bihar</option>
                  <option>Daudnagar, Bihar</option>
                </select>
              </div>
              <div className="flex items-center gap-2 px-3 py-2.5 flex-1">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search jobs, businesses, or listings…"
                  className="bg-transparent text-sm w-full outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                />
              </div>
              <Btn variant="primary" className="shrink-0" type="submit">Search</Btn>
            </form>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn variant="marigold" icon={Briefcase} onClick={() => navigate("/jobs")}>Find Jobs</Btn>
              <Btn variant="outline" icon={Building2} onClick={() => navigate("/businesses")}>Browse Businesses</Btn>
              <Btn variant="ghost" icon={ShoppingBag} onClick={() => navigate("/buy-sell")}>Buy & Sell</Btn>
            </div>
          </Reveal>
        </div>

        <div className="relative hidden lg:block h-[440px]">
          <Reveal delay={200} className="absolute top-0 right-4 w-64">
            <Card className="p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center"><Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" /></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">Store Manager</p>
                  <p className="text-xs text-slate-400">₹15,000–22,000/mo</p>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={340} className="absolute top-40 left-0 w-60">
            <Card className="p-4 animate-float [animation-delay:0.5s]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center"><Star size={18} className="text-emerald-600 dark:text-emerald-400 fill-current" /></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">4.8 rated shop</p>
                  <p className="text-xs text-slate-400">Milan Sweets & Bakers</p>
                </div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={460} className="absolute bottom-6 right-10 w-56">
            <Card className="p-4 animate-float [animation-delay:1s]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center"><ShoppingBag size={18} className="text-amber-600 dark:text-amber-400" /></div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">Honda Activa 5G</p>
                  <p className="text-xs text-slate-400 font-mono">₹58,000</p>
                </div>
              </div>
            </Card>
          </Reveal>
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-100 to-amber-100 dark:from-indigo-500/10 dark:to-amber-500/10" />
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <SectionHead eyebrow="Explore" title="Browse by category" subtitle="Everything you need from your neighborhood, organized in one place." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => {
          const dest = categoryDestination(c.title);
          return (
            <Reveal key={c.title} delay={i * 60}>
              <button
                onClick={() => navigate(dest || "/categories")}
                disabled={c.soon}
                className={`w-full text-left group ${c.soon ? "cursor-not-allowed opacity-70" : ""}`}
              >
                <Card className="p-5 h-full relative overflow-hidden">
                  {c.soon && <Badge tone="soon" className="absolute top-4 right-4">Soon</Badge>}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${c.tone} transition-transform group-hover:scale-110`}>
                    <c.icon size={20} />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 dark:text-white">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                </Card>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedBusinesses() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { businessesApi.list().then((d) => { setItems(d); setLoading(false); }); }, []);
  return (
    <section className="bg-slate-50/70 dark:bg-white/[0.02] py-20 border-y border-slate-100 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHead
          eyebrow="Featured"
          title="Businesses near you"
          subtitle="Discover verified shops and services in Aurangabad."
          action={<Btn variant="outline" iconRight onClick={() => navigate("/businesses")}>View all</Btn>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            : items.map((b, i) => (
                <Reveal key={b.id} delay={i * 80}><BusinessCard b={b} /></Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}

function LatestJobs() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { jobsApi.list().then(setItems); }, []);
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <SectionHead
        eyebrow="Careers"
        title="Latest jobs in Aurangabad"
        subtitle="Fresh opportunities posted by local employers every day."
        action={<Btn variant="outline" iconRight onClick={() => navigate("/jobs")}>View all jobs</Btn>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((j, i) => (<Reveal key={j.id} delay={i * 80}><JobCard j={j} /></Reveal>))}
      </div>
    </section>
  );
}

function BuySellSection() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { listingsApi.list().then(setItems); }, []);
  return (
    <section className="bg-slate-50/70 dark:bg-white/[0.02] py-20 border-y border-slate-100 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHead
          eyebrow="Marketplace"
          title="Buy & sell locally"
          subtitle="Genuine listings from real people in your city."
          action={<Btn variant="outline" iconRight onClick={() => navigate("/buy-sell")}>View all listings</Btn>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((l, i) => (<Reveal key={l.id} delay={i * 80}><ListingCard l={l} /></Reveal>))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ icon: Icon, value, suffix, label }) {
  const [ref, inView] = useInView(0.5);
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={20} className="text-amber-400" />
      </div>
      <p className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
        {n.toLocaleString()}<span className="text-amber-400">{suffix}</span>
      </p>
      <p className="text-sm text-slate-400 mt-2 font-medium">{label}</p>
    </div>
  );
}

function StatsSection() {
  const [stats, setStats] = useState({ businesses: 0, jobs: 0, listings: 0, users: 0 });
  useEffect(() => { statsApi.get().then(setStats).catch(() => {}); }, []);
  return (
    <section className="bg-[#0B1120] py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCounter icon={BuildingIcon} value={stats.businesses} suffix={stats.businesses > 0 ? "+" : ""} label="Local businesses" />
        <StatCounter icon={Briefcase} value={stats.jobs} suffix={stats.jobs > 0 ? "+" : ""} label="Jobs posted" />
        <StatCounter icon={ListChecks} value={stats.listings} suffix={stats.listings > 0 ? "+" : ""} label="Buy & sell listings" />
        <StatCounter icon={Users} value={stats.users} suffix={stats.users > 0 ? "+" : ""} label="Registered users" />
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <SectionHead eyebrow="Why APNAHUB" title="Built on local trust" subtitle="Everything is designed around one idea — your city, made easier to navigate." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 70}>
            <Card className="p-6 text-center h-full">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                <w.icon size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white">{w.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{w.desc}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section className="bg-slate-50/70 dark:bg-white/[0.02] py-20 border-y border-slate-100 dark:border-white/[0.05]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-600 dark:text-indigo-400 mb-3">Voices from Aurangabad</p>
        <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-white mb-10">What our community says</h2>
        <Card className="p-10 relative" hover={false}>
          <Quote size={32} className="text-indigo-200 dark:text-indigo-500/30 mx-auto mb-4" />
          <p key={idx} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed animate-fadeIn">"{t.quote}"</p>
          <div className="flex items-center justify-center gap-1 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-amber-400 flex items-center justify-center font-display font-bold text-white text-sm">
              {t.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>
            </div>
          </div>
        </Card>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-white/10">
            <ChevronLeft size={16} />
          </button>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "w-6 bg-indigo-600" : "bg-slate-300 dark:bg-white/20"}`} />
          ))}
          <button onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:bg-white dark:hover:bg-white/10">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DownloadApp() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <Reveal>
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-800 overflow-hidden p-10 sm:p-16 text-center">
          <div aria-hidden className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-amber-400/20 blur-[80px]" />
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white tracking-tight">Take APNAHUB with you</h2>
          <p className="text-indigo-200 mt-3 max-w-md mx-auto">Search jobs, message businesses and post listings on the go.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Btn variant="ghost" icon={PlayCircle} className="!bg-white/10 !text-white">Get it on Google Play</Btn>
            <Btn variant="ghost" icon={Apple} className="!bg-white/10 !text-white">Download on the App Store</Btn>
            <Badge tone="soon" className="!bg-white/15 !text-white">iOS · Coming Soon</Badge>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 text-center">
      <Mail size={26} className="mx-auto text-indigo-500 mb-4" />
      <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Stay in the loop</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Get new job alerts and listings from Aurangabad, straight to your inbox.</p>
      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true); }}
        className="flex flex-col sm:flex-row gap-2 mt-6 max-w-md mx-auto"
      >
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-4 py-3 rounded-full border border-slate-200 dark:border-white/15 bg-white dark:bg-[#131B2E] text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200"
        />
        <Btn variant="primary" icon={done ? CheckCircle2 : Send}>{done ? "Subscribed" : "Subscribe"}</Btn>
      </form>
    </section>
  );
}

const ROLES = [
  {
    icon: ShoppingBag,
    title: "For Sellers",
    description: "Post your item and reach genuine local buyers, free.",
    features: ["List in under 2 minutes", "Just a phone number to start", "No commission, ever", "Buyer questions land in your inbox"],
    onAction: goToPostAd,
  },
  {
    icon: Users,
    title: "For Buyers",
    description: "Browse real listings and ask sellers directly — no login needed.",
    features: ["No account required to browse", "Ask a question before you commit", "Chat directly on WhatsApp", "Genuine local sellers only"],
    to: "/buy-sell",
  },
  {
    icon: BuildingIcon,
    title: "For Businesses",
    description: "List your shop or service and get discovered locally.",
    features: ["Free business profile", "Shown in local search", "Ratings & reviews", "Call or WhatsApp button built in"],
    to: "/register",
  },
];

function RolesSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
      <SectionHeading eyebrow="Who We Serve" title="Built for buyers, sellers, and businesses" subtitle="One platform connecting everyone in Aurangabad — simple, transparent, and free to start." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {ROLES.map((role, i) => (<RoleCard key={role.title} {...role} delay={i * 0.1} />))}
      </div>
    </section>
  );
}

function StorySection() {
  const navigate = useNavigate();
  return (
    <section className="overflow-hidden bg-slate-50/70 dark:bg-white/[0.02] py-20 border-y border-slate-100 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative h-[340px] overflow-hidden rounded-[32px] md:h-[480px] order-2 md:order-1">
          <RevealImage src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1600&q=80" alt="Local buying and selling in Aurangabad" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        </div>
        <Reveal className="order-1 md:order-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Built Around Trust</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">A better way to buy and sell locally.</h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">
            APNAHUB connects sellers, buyers, and local businesses through a transparent marketplace designed specifically for Aurangabad — no middlemen, no commission.
          </p>
          <div className="mt-8"><Btn variant="primary" icon={UserPlus} onClick={() => goToPostAd(navigate)}>Start Selling Today</Btn></div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <AdvertisementHub />
      <Hero />
      <PulseTicker />
      <CategoriesSection />
      <RolesSection />
      <FeaturedBusinesses />
      <LatestJobs />
      <BuySellSection />
      <StatsSection />
      <StorySection />
      <WhyChoose />
      <HowItWorks />
      <TestimonialsSlider />
      <DownloadApp />
      <Newsletter />
    </>
  );
}
