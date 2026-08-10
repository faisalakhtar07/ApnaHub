import * as Icons from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/mockData'

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 dark:text-white">
            Browse by category
          </h2>
          <p className="text-ink/60 dark:text-white/60 mt-1 text-sm">
            Everything happening in Aurangabad, organized.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const Icon = Icons[cat.icon] ?? Icons.Grid2x2
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="card p-5 flex flex-col items-center text-center gap-3 hover:-translate-y-1 group"
            >
              <div className="p-3.5 rounded-2xl bg-indigo-900/5 dark:bg-white/5 text-sindoor group-hover:bg-sindoor group-hover:text-white transition-colors duration-300">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-semibold text-sm text-indigo-900 dark:text-white">{cat.name}</p>
                <p className="text-xs text-ink/50 dark:text-white/40 mt-0.5">{cat.count} listed</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
