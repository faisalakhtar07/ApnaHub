import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Heart, MapPin, MessageSquareText, ShoppingBag, ShoppingCart, Check } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Badge from "../components/ui/Badge";
import Btn from "../components/ui/Btn";
import AskSellerModal from "../components/AskSellerModal";
import BuyNowModal from "../components/BuyNowModal";
import { listingsApi } from "../lib/api";
import { cart } from "../lib/cart";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [l, setL] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [askOpen, setAskOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => { listingsApi.get(id).then(setL); }, [id]);
  useEffect(() => { if (l) setInCart(cart.has(l.id)); }, [l]);

  if (!l) return <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 text-slate-400 text-sm">Loading listing…</div>;

  const gallery = l.images && l.images.length ? l.images : [l.img];
  const sold = l.status === "sold";

  const addToCart = () => {
    cart.add({ id: l.id, title: l.title, price: l.price, img: l.img, seller: l.seller, loc: l.loc });
    setInCart(true);
  };

  return (
    <>
      <Breadcrumb items={["Home", "Buy & Sell", l.title]} />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 grid sm:grid-cols-2 gap-8">
        <div>
          <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96">
            <img src={gallery[activeImg]} className={`w-full h-full object-cover ${sold ? "grayscale opacity-70" : ""}`} alt={l.title} />
            {sold && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-5 py-2 rounded-full bg-slate-900/80 text-white font-display font-bold tracking-wide">SOLD</span>
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${i === activeImg ? "border-indigo-500" : "border-transparent"}`}
                >
                  <img src={src} className="w-full h-full object-cover" alt={`${l.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Badge>{l.cond}</Badge>
            {sold && <Badge tone="closed">Sold</Badge>}
            {l.negotiable && !sold && <Badge tone="soon">Negotiable</Badge>}
          </div>
          <h1 className="font-display text-2xl font-semibold text-slate-900 dark:text-white mt-3">{l.title}</h1>
          <p className="font-mono font-bold text-3xl text-indigo-600 dark:text-indigo-400 mt-2">{l.price}</p>
          <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-3"><MapPin size={13} /> {l.loc}</p>
          <div className="flex items-center gap-3 mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-amber-400 flex items-center justify-center font-display font-bold text-white text-sm">{l.seller.charAt(0)}</div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{l.seller}</p>
              <p className="text-xs text-slate-400">Seller on APNAHUB</p>
            </div>
          </div>

          {sold ? (
            <div className="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-center text-sm text-slate-500 dark:text-slate-400">
              This item has already been sold.
            </div>
          ) : (
            <>
              <div className="flex gap-3 mt-6">
                <Btn variant="marigold" icon={ShoppingBag} className="flex-1" onClick={() => setBuyOpen(true)}>Buy Now</Btn>
                <Btn variant={inCart ? "outline" : "ghost"} icon={inCart ? Check : ShoppingCart} onClick={addToCart} disabled={inCart}>
                  {inCart ? "In Cart" : "Add to Cart"}
                </Btn>
              </div>
              <div className="flex gap-3 mt-3">
                <Btn variant="outline" icon={MessageCircle} className="flex-1">Chat on WhatsApp</Btn>
                <Btn variant="ghost" icon={Heart}>Save</Btn>
              </div>
              <Btn variant="ghost" icon={MessageSquareText} className="w-full mt-3" onClick={() => setAskOpen(true)}>
                Ask the seller a question
              </Btn>
            </>
          )}
        </div>
      </div>
      <AskSellerModal open={askOpen} onClose={() => setAskOpen(false)} listingId={l.id} listingTitle={l.title} />
      <BuyNowModal open={buyOpen} onClose={() => setBuyOpen(false)} listingId={l.id} listingTitle={l.title} />
    </>
  );
}
