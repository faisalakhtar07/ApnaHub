import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Heart, MessageCircle, Phone, Flag, Share2, ImageOff, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { listings } from '@/data/mockData'
import { useToast } from '@/components/ui/toast'

export default function ProductDetails() {
  const { id } = useParams()
  const { toast } = useToast()
  const [fav, setFav] = useState(false)
  const item = listings.find((l) => l.id === id) ?? listings[0]

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Buy & Sell', to: '/buy-sell' }, { label: item.title }]} />

      <div className="grid lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-72 sm:h-96 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/40">
            <ImageOff size={40} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted flex items-center justify-center text-muted-foreground/30">
                <ImageOff size={18} />
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{item.title}</h1>
                <p className="font-stamp font-bold text-2xl text-primary mt-2">{item.price}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => { setFav(!fav); toast({ title: fav ? 'Removed from favorites' : 'Added to favorites', variant: 'success' }) }} aria-label="Favorite">
                  <Heart size={15} className={fav ? 'text-primary' : ''} fill={fav ? 'currentColor' : 'none'} />
                </Button>
                <Button size="icon" variant="outline" onClick={() => toast({ title: 'Link copied', variant: 'success' })} aria-label="Share">
                  <Share2 size={15} />
                </Button>
                <Button size="icon" variant="outline" onClick={() => toast({ title: 'Reported', description: 'Thanks — our team will review this listing.' })} aria-label="Report">
                  <Flag size={15} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge variant="seal">{item.condition}</Badge>
              <Badge variant="outline">{item.category}</Badge>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-4">
              <MapPin size={15} /> {item.location}, Aurangabad, Bihar
            </div>

            <Card className="p-6 mt-6">
              <h2 className="font-semibold mb-3">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.title} in {item.condition.toLowerCase()} condition. Full item descriptions and photo
                galleries will connect to the API in a later phase.
              </p>
            </Card>
          </div>
        </div>

        <div>
          <Card className="p-5 sticky top-24">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Seller</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                {item.seller.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm flex items-center gap-1">{item.seller} <ShieldCheck size={13} className="text-secondary" /></p>
                <p className="text-xs text-muted-foreground">Member since 2024</p>
              </div>
            </div>
            <div className="space-y-2.5">
              <Button variant="secondary" className="w-full"><MessageCircle size={15} /> WhatsApp Seller</Button>
              <Button variant="outline" className="w-full"><Phone size={15} /> Call Seller</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Meet in a public place, inspect the item, and avoid advance payments to strangers.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
