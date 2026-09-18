import React from "react";
import { motion } from "framer-motion";
import RevealImage from "./RevealImage";

const STEPS = [
  {
    title: "Post Your Item",
    desc: "Sellers list an item with 5–6 photos, price and location — no account needed upfront, just a phone number.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Verify With OTP",
    desc: "A quick OTP confirms the seller's phone number, keeping every listing tied to a real, reachable person.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Buyer Asks a Question",
    desc: "Buyers browse freely and message the seller directly from the listing — no login required to ask.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Deal Closes Locally",
    desc: "Buyer and seller connect, meet, and close the deal — no middlemen, no commission, all within Aurangabad.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white dark:bg-[#0B1120] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-14 text-center md:mb-20">
          <p className="mb-5 inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400">
            Process
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-5xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">
            A simple, transparent process for both buyers and sellers — start to finish.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative mb-8 min-h-[520px] md:mb-10 md:min-h-[640px]">
              <div className="sticky" style={{ top: `${90 + index * 18}px`, zIndex: index + 1 }}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-[440px] overflow-hidden rounded-[30px] border border-black/10 bg-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.18)] md:h-[540px] md:rounded-[38px]"
                >
                  <RevealImage src={step.image} alt={step.title} />
                  <div className="absolute inset-0 bg-black/45" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                  <div
                    className="pointer-events-none absolute right-5 top-3 select-none font-display text-[100px] font-bold leading-none text-white/10 md:right-10 md:text-[160px]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-12">
                    <div className="flex items-start justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 font-display text-lg font-bold text-white backdrop-blur-md md:h-16 md:w-16 md:text-xl">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
                        Step {index + 1} of {STEPS.length}
                      </div>
                    </div>

                    <div className="max-w-xl">
                      <h3 className="font-display text-2xl font-bold text-white md:text-4xl">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
