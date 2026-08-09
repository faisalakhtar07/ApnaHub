import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart, ImageOff, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Pagination } from '@/components/ui/pagination'
import { CardSkeleton } from '@/components/ui/skeleton'
import { listings as allListings } from '@/data/mockData'

const PAGE_SIZE = 8

export default function BuySell() {
  const [loading] = useState(false)
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState(new Set())

  const listings = useMemo(() => {
    const list = [...allListings, ...allListings]
    return category === 'all' ? list : list.filter((l) => l.category === category)
  }, [category])

  const categories = ['all', ...new Set(allListings.map((l) => l.category))]
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE))
  const pageItems = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleFav = (id) => setFavorites((prev) => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Buy & Sell' }]} />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Buy &amp; Sell</h1>
          <p className="text-muted-foreground mt-1 text-sm">{listings.length} listings in Aurangabad, Bihar</p>
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-muted-foreground" />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1) }}
            className="text-sm bg-card border border-border rounded-full px-4 py-2 outline-none"
          >
            {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : pageItems.map((item, i) => {
              const key = `${item.id}-${i}`
              return (
                <Card key={key} className="overflow-hidden flex flex-col">
                  <div className="h-36 bg-muted flex items-center justify-center text-muted-foreground/40 relative">
                    <ImageOff size={26} />
                    <button
                      onClick={() => toggleFav(key)}
                      aria-label="Add to favorites"
                      className="absolute top-3 right-3 p-1.5 rounded-full glass"
                    >
                      <Heart size={15} className={favorites.has(key) ? 'text-primary' : ''} fill={favorites.has(key) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <Link to={`/buy-sell/${item.id}`} className="p-4 flex flex-col flex-1">
                    <Badge variant="seal" className="self-start mb-2">{item.condition}</Badge>
                    <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <MapPin size={12} /> {item.location}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <span className="font-stamp font-bold">{item.price}</span>
                      <span className="text-xs text-muted-foreground">{item.seller}</span>
                    </div>
                  </Link>
                </Card>
              )
            })}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
