import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

/**
 * Placeholder for routes not yet built in this phase. Keeps navigation
 * links functional while Auth, Dashboard, and category pages are built
 * in later phases.
 */
function ComingSoon({ title }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-bold text-indigo-900 dark:text-white">{title}</h1>
      <p className="text-ink/60 dark:text-white/60 mt-3">
        This page is part of the next build phase.
      </p>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/businesses" element={<ComingSoon title="Local Businesses" />} />
          <Route path="/jobs" element={<ComingSoon title="Jobs" />} />
          <Route path="/buy-sell" element={<ComingSoon title="Buy & Sell" />} />
          <Route path="/login" element={<ComingSoon title="Log in" />} />
          <Route path="/signup" element={<ComingSoon title="Sign up" />} />
          <Route path="*" element={<ComingSoon title="Page not found" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
