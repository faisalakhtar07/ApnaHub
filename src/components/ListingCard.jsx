import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, ShoppingCart, Check } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Btn from "./ui/Btn";
import { cart } from "../lib/cart";

export default function ListingCard({ l }) {
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const sold = l.status === "sold";

  useEffect(() => cart.subscribe(() => setInCart(cart.has(l.id))), [l.id]);
  useEffect(() => setInCart(cart.has(l.id)), [l.id]);

  const addToCart = (e) => {
    e.stopPropagation();
    cart.add({ id: l.id, title: l.title, price: l.price, img: l.img, seller: l.seller, loc: l.loc });
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 overflow-hidden cursor-pointer" onClick={() => navigate(`/buy-sell/${l.id}`)}>
        <img src={l.img} alt={l.title} className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${sold ? "grayscale opacity-70" : ""}`} />
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-slate-900/80 text-white text-xs font-display font-bold tracking-wide">SOLD</span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setFav((f) => !f); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur flex items-center justify-center transition-colors"
        >
          <Heart size={14} className={fav ? "fill-rose-500 text-rose-500" : "text-slate-500"} />
        </button>
        <Badge className="absolute bottom-3 left-3 !bg-white/90 dark:!bg-slate-900/80 backdrop-blur">{l.cond}</Badge>
      </div>
      <div className="p-5">
        <div className="cursor-pointer" onClick={() => navigate(`/buy-sell/${l.id}`)}>
          <p className="font-mono font-bold text-lg text-slate-900 dark:text-white">{l.price}</p>
          <h3 className="font-medium text-slate-700 dark:text-slate-200 text-sm mt-1 truncate">{l.title}</h3>
          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={12} /> {l.loc}</span>
            <span>{l.seller}</span>
          </div>
        </div>
        {!sold && (
          <Btn variant={inCart ? "outline" : "ghost"} size="sm" icon={inCart ? Check : ShoppingCart} className="w-full mt-3" onClick={addToCart} disabled={inCart}>
            {inCart ? "In Cart" : "Add to Cart"}
          </Btn>
        )}
      </div>
    </Card>
  );
}
