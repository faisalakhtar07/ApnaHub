/**
 * Generic skeleton placeholder shown while listings/jobs/businesses load
 * from the API. Mirrors the card dimensions used across the home page so
 * layout doesn't shift once real content arrives.
 */
export default function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-32 w-full rounded-xl bg-black/5 dark:bg-white/10 mb-4" />
      <div className="h-4 w-3/4 rounded bg-black/5 dark:bg-white/10 mb-2" />
      <div className="h-3 w-1/2 rounded bg-black/5 dark:bg-white/10 mb-4" />
      <div className="h-8 w-full rounded-full bg-black/5 dark:bg-white/10" />
    </div>
  )
}
