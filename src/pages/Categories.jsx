import * as Icons from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { categories } from '@/data/mockData'

export default function Categories() {
  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Categories' }]} />
      <h1 className="text-3xl font-bold mt-4">All Categories</h1>
      <p className="text-muted-foreground mt-1 text-sm mb-8">Everything available on APNAHUB, in one view.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = Icons[cat.icon] ?? Icons.Grid2x2
          const content = (
            <Card hover={!cat.comingSoon} className="p-5 h-full flex flex-col gap-3 relative">
              {cat.comingSoon && <Badge variant="outline" className="absolute top-4 right-4 text-[10px]">Soon</Badge>}
              <div className={`p-3 rounded-xl w-fit ${cat.comingSoon ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  {cat.comingSoon ? cat.description : `${cat.description} · ${cat.count} listed`}
                </p>
              </div>
            </Card>
          )
          return cat.comingSoon
            ? <div key={cat.id} className="opacity-70">{content}</div>
            : <Link key={cat.id} to={`/categories/${cat.id}`}>{content}</Link>
        })}
      </div>
    </div>
  )
}
