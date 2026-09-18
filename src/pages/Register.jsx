import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Btn from "../components/ui/Btn";
import { authApi } from "../lib/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authApi.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join APNAHUB — it's free">
      <form className="space-y-4" onSubmit={submit}>
        <input required value={form.name} onChange={update("name")} placeholder="Full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
        <input value={form.phone} onChange={update("phone")} placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
        <input required type="email" value={form.email} onChange={update("email")} placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
        <input required type="password" value={form.password} onChange={update("password")} placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
        {error && <p className="text-xs text-rose-500">{error}</p>}
        <Btn variant="primary" className="w-full" type="submit">Create account</Btn>
      </form>
      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold">Log in</Link>
      </p>
    </AuthLayout>
  );
}
