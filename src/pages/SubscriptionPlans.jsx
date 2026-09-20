import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ShieldCheck } from "lucide-react";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { subscriptionPlansApi, subscriptionsApi, userAuthApi } from "../lib/api";
import { loadRazorpay } from "../lib/razorpay";

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    subscriptionPlansApi.list().then(setPlans).finally(() => setLoading(false));
  }, []);

  const choosePlan = async (plan) => {
    setError("");
    if (!userAuthApi.isLoggedIn()) {
      navigate("/login", { state: { redirectTo: "/subscribe" } });
      return;
    }

    setPayingId(plan._id);
    try {
      const checkout = await subscriptionsApi.checkout(plan._id);

      // Admin has this plan priced at ₹0 — activated instantly, no payment needed.
      if (checkout.free) {
        navigate("/create-ad");
        return;
      }

      const ready = await loadRazorpay();
      if (!ready) throw new Error("Couldn't load the payment window. Check your connection and try again.");

      const rzp = new window.Razorpay({
        key: checkout.keyId,
        amount: checkout.amount,
        currency: checkout.currency,
        name: "APNAHUB",
        description: `${plan.name} advertisement subscription`,
        order_id: checkout.orderId,
        handler: async (response) => {
          try {
            await subscriptionsApi.verify({
              paymentId: checkout.paymentId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate("/create-ad");
          } catch (err) {
            setError(err.message || "Payment verification failed. If money was deducted, contact support.");
          }
        },
        modal: { ondismiss: () => setPayingId(null) },
        theme: { color: "#4F46E5" },
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
    } finally {
      setPayingId(null);
    }
  };

  return (
    <>
      <PageHeader eyebrow="Post an Ad" title="Choose a subscription plan" subtitle="Purchase a plan to unlock advertisement posting — pricing is set by APNAHUB and shown in full before you pay." />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        {error && <div className="mb-6 text-sm text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400 px-4 py-3 rounded-xl">{error}</div>}

        {loading ? (
          <p className="text-sm text-slate-400">Loading plans…</p>
        ) : plans.length === 0 ? (
          <p className="text-sm text-slate-400">No subscription plans are available yet. Please check back soon.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <Card key={plan._id} className="p-6 flex flex-col" hover={false}>
                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.durationDays} days</p>
                <p className="font-display font-bold text-3xl text-indigo-600 dark:text-indigo-400 mt-4">
                  {plan.price > 0 ? `₹${plan.price.toLocaleString("en-IN")}` : "Free"}
                </p>
                {plan.description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{plan.description}</p>}
                <ul className="space-y-2 mt-4 flex-1">
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-emerald-500 shrink-0" /> {plan.adLimit} ad{plan.adLimit > 1 ? "s" : ""}</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-emerald-500 shrink-0" /> Up to {plan.photoLimit} photos</li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-emerald-500 shrink-0" /> Up to {plan.videoLimit} video{plan.videoLimit !== 1 ? "s" : ""}</li>
                  {plan.features?.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><Check size={14} className="text-emerald-500 shrink-0" /> {f}</li>
                  ))}
                </ul>
                <Btn variant="primary" className="w-full mt-6" icon={ShieldCheck} onClick={() => choosePlan(plan)} disabled={payingId === plan._id}>
                  {payingId === plan._id ? "Opening payment…" : plan.price > 0 ? "Subscribe & pay" : "Activate free plan"}
                </Btn>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
