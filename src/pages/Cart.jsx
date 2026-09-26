import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, MessageCircle, Phone, ShoppingBag } from "lucide-react";
import Card from "../components/ui/Card";
import Btn from "../components/ui/Btn";
import { cart } from "../lib/cart";

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(cart.list());

  useEffect(() => cart.subscribe(setItems), []);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <ShoppingBag size={22} className="text-indigo-500" />
        <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">Your Cart</h1>
      </div>
      <p className="text-sm text-slate-400 mb-8">Saved items — contact each seller directly to buy. There's no checkout here; APNAHUB doesn't handle payment between buyers and sellers.</p>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-slate-400 mb-4">Your cart is empty.</p>
          <Btn variant="primary" onClick={() => navigate("/buy-sell")}>Browse Buy & Sell</Btn>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex items-center gap-4" hover={false}>
              <img src={item.img} className="w-16 h-16 rounded-xl object-cover shrink-0" alt={item.title} />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/buy-sell/${item.id}`)}>
                <p className="font-medium text-slate-800 dark:text-white truncate">{item.title}</p>
                <p className="text-xs text-slate-400">{item.price} · {item.loc}</p>
                <p className="text-xs text-slate-400 mt-0.5">Seller: {item.seller}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                {item.sellerPhone && (
                  <button onClick={() => window.open(`tel:${item.sellerPhone}`)} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:text-indigo-500">
                    <Phone size={14} />
                  </button>
                )}
                <button onClick={() => navigate(`/buy-sell/${item.id}`)} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 hover:text-emerald-500">
                  <MessageCircle size={14} />
                </button>
                <button onClick={() => cart.remove(item.id)} className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}
          <button onClick={() => cart.clear()} className="text-xs text-slate-400 hover:text-rose-500 mt-2">Clear cart</button>
        </div>
      )}
    </div>
  );
}
