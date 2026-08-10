import { Link } from 'react-router-dom'
import { categories } from '../../data/mockData'

export default function PopularCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h3 className="text-sm font-semibold text-ink/50 dark:text-white/40 uppercase tracking-wider mb-4">
        Popular searches
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="px-4 py-2 rounded-full text-sm font-medium border border-black/10 dark:border-white/10
                       text-ink/70 dark:text-white/70 hover:border-sindoor hover:text-sindoor transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
