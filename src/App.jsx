import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { PageTransition } from '@/components/shared/PageTransition'
import { ScrollToTop } from '@/components/shared/ScrollToTop'

import Home from '@/pages/Home'
import Businesses from '@/pages/Businesses'
import BusinessDetails from '@/pages/BusinessDetails'
import Jobs from '@/pages/Jobs'
import JobDetails from '@/pages/JobDetails'
import BuySell from '@/pages/BuySell'
import ProductDetails from '@/pages/ProductDetails'
import Categories from '@/pages/Categories'
import SearchResults from '@/pages/SearchResults'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/businesses" element={<PageTransition><Businesses /></PageTransition>} />
            <Route path="/businesses/:id" element={<PageTransition><BusinessDetails /></PageTransition>} />
            <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
            <Route path="/jobs/:id" element={<PageTransition><JobDetails /></PageTransition>} />
            <Route path="/buy-sell" element={<PageTransition><BuySell /></PageTransition>} />
            <Route path="/buy-sell/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
            <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
            <Route path="/categories/:id" element={<PageTransition><Categories /></PageTransition>} />
            <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><NotFound /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><NotFound /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
