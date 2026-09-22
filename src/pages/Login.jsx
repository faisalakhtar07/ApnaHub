import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Btn from "../components/ui/Btn";
import { userAuthApi } from "../lib/api";

export default function Login() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await userAuthApi.login(phone, password);
      navigate("/my-account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue to APNAHUB">
      <form className="space-y-4" onSubmit={submit}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200" />
        <div className="relative">
          <input value={password} onChange={(e) => setPassword(e.target.value)} required type={show ? "text" : "password"} placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-sm outline-none focus:ring-2 ring-indigo-400 text-slate-700 dark:text-slate-200 pr-11" />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Forgot password?</Link>
        </div>
        <Btn variant="primary" className="w-full" type="submit" disabled={loading}>{loading ? "Signing in…" : "Log in"}</Btn>
      </form>
      <p className="text-center text-sm text-slate-400 mt-6">
        New to APNAHUB?{" "}
        <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
