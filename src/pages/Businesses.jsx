import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Store, MapPin, Star, Phone, MessageCircle, ImageOff, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Pagination } from '@/components/ui/pagination'
import { CardSkeleton } from '@/components/ui/skeleton'
import { businesses as allBusinesses } from '@/data/mockData'

const PAGE_SIZE = 6

export default function Businesses() {
  const [loading] = useState(false) // wire up to real fetch state in Phase 3
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)

  const businesses = useMemo(() => {
    const list = [...allBusinesses, ...allBusinesses]; // pad for pagination demo
    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [sort])

  const totalPages = Math.ceil(businesses.length / PAGE_SIZE)
  const pageItems = businesses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Businesses' }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Local Businesses</h1>
          <p className="text-muted-foreground mt-1 text-sm">{businesses.length} businesses in Aurangabad, Bihar</p>
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1) }}
            className="text-sm bg-card border border-border rounded-full px-4 py-2 outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : pageItems.map((biz, i) => (
              <Card key={`${biz.id}-${i}`} className="overflow-hidden flex flex-col">
                <div className="h-36 bg-muted flex items-center justify-center text-muted-foreground/40 relative">
                  <ImageOff size={26} />
                  <Badge variant={biz.open ? 'success' : 'destructive'} className="absolute top-3 left-3">
                    {biz.open ? 'Open' : 'Closed'}
                  </Badge>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-sm leading-snug pr-2">{biz.name}</h3>
                    {biz.verified && <Badge variant="seal" className="shrink-0">Verified</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{biz.category}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {biz.location}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-500"><Star size={12} fill="currentColor" /> {biz.rating} ({biz.reviews})</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8"><Phone size={14} /></Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 text-secondary border-secondary/30"><MessageCircle size={14} /></Button>
                    <Button size="sm" variant="ghost" className="flex-1 justify-center text-xs" asChild>
                      <Link to={`/businesses/${biz.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
