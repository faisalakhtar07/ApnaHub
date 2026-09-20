import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Btn from "../components/ui/Btn";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-5">
      <AlertTriangle size={40} className="text-amber-400 mb-5" />
      <p className="font-display font-bold text-6xl text-slate-900 dark:text-white">404</p>
      <h1 className="font-display text-xl font-semibold text-slate-700 dark:text-slate-200 mt-2">Page not found</h1>
      <p className="text-sm text-slate-400 mt-2 max-w-xs">The page you're looking for doesn't exist or may have moved.</p>
      <Btn variant="primary" className="mt-6" onClick={() => navigate("/")} icon={HomeIcon}>Back to home</Btn>
    </div>
  );
}
