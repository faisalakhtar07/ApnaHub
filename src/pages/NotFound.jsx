import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="section py-24 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <p className="font-display font-bold text-8xl text-primary/20">404</p>
        <h1 className="text-2xl font-bold mt-2">This page wandered off.</h1>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          The page you're looking for doesn't exist, or the listing may have been removed.
        </p>
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button asChild><Link to="/"><Home size={15} /> Back Home</Link></Button>
          <Button variant="outline" asChild><Link to="/search"><Search size={15} /> Search</Link></Button>
        </div>
      </motion.div>
    </div>
  )
}
