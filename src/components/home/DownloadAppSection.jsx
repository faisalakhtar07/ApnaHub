import { motion } from 'framer-motion'
import { Apple, Smartphone } from 'lucide-react'

export default function DownloadAppSection() {
  return (
    <section className="section py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground px-8 py-14 sm:px-16 text-center"
      >
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold max-w-lg mx-auto leading-tight">
            APNAHUB, right in your pocket.
          </h2>
          <p className="text-white/80 mt-4 max-w-md mx-auto">
            The mobile app is on its way — get notified the moment it launches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button disabled className="inline-flex items-center gap-2.5 rounded-xl bg-black/20 px-5 py-3 opacity-80 cursor-not-allowed">
              <Smartphone size={22} />
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-wide">Coming soon on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </button>
            <button disabled className="inline-flex items-center gap-2.5 rounded-xl bg-black/20 px-5 py-3 opacity-80 cursor-not-allowed">
              <Apple size={22} />
              <span className="text-left">
                <span className="block text-[10px] uppercase tracking-wide">Coming soon on</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
