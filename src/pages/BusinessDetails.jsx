import { useParams, Link } from 'react-router-dom'
import { MapPin, Star, Phone, MessageCircle, Globe, Clock, ImageOff, Flag, Share2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { businesses } from '@/data/mockData'
import { useToast } from '@/components/ui/toast'

export default function BusinessDetails() {
  const { id } = useParams()
  const { toast } = useToast()
  const biz = businesses.find((b) => b.id === id) ?? businesses[0]

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Businesses', to: '/businesses' }, { label: biz.name }]} />

      <div className="grid lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 sm:h-80 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/40">
            <ImageOff size={40} />
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold">{biz.name}</h1>
                  {biz.verified && <Badge variant="seal">Verified</Badge>}
                  <Badge variant={biz.open ? 'success' : 'destructive'}>{biz.open ? 'Open Now' : 'Closed'}</Badge>
                </div>
                <p className="text-muted-foreground mt-1">{biz.category}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button size="icon" variant="outline" onClick={() => toast({ title: 'Link copied', variant: 'success' })} aria-label="Share">
                  <Share2 size={15} />
                </Button>
                <Button size="icon" variant="outline" onClick={() => toast({ title: 'Reported', description: 'Thanks — our team will review this listing.' })} aria-label="Report">
                  <Flag size={15} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin size={15} /> {biz.location}, Aurangabad, Bihar</span>
              <span className="flex items-center gap-1.5 font-semibold text-amber-500"><Star size={15} fill="currentColor" /> {biz.rating} ({biz.reviews} reviews)</span>
              <span className="flex items-center gap-1.5"><Clock size={15} /> 9:00 AM – 9:00 PM</span>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {biz.name} is a {biz.category.toLowerCase()} business serving the {biz.location} area of Aurangabad.
                Full business descriptions, photo galleries, and opening-hours editing will connect to the API in a later phase.
              </p>
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-sm text-muted-foreground">Review list and submission form will connect to the API in a later phase.</p>
            </TabsContent>
            <TabsContent value="location">
              <div className="h-64 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/40 text-sm">
                Google Maps embed goes here
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky contact card */}
        <div>
          <Card className="p-5 sticky top-24">
            <p className="font-semibold text-sm mb-4">Contact {biz.name}</p>
            <div className="space-y-2.5">
              <Button className="w-full"><Phone size={15} /> Call Now</Button>
              <Button variant="secondary" className="w-full"><MessageCircle size={15} /> WhatsApp</Button>
              <Button variant="outline" className="w-full"><Globe size={15} /> Visit Website</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Always meet in a public place and verify details before making payments.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
