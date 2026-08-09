import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  return (
    <div className="section py-16 flex justify-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display font-bold text-2xl">
            APNA<span className="text-primary">HUB</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Reset your password</h1>
          <p className="text-muted-foreground text-sm mt-1">Enter your email and we'll send a reset link.</p>
        </div>

        <Card className="p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="mx-auto text-secondary mb-3" size={36} />
              <p className="font-semibold text-sm">Check your inbox</p>
              <p className="text-sm text-muted-foreground mt-1">We've sent a password reset link to your email.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="email" placeholder="you@example.com" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full">Send Reset Link</Button>
            </form>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remembered it? <Link to="/login" className="text-primary font-semibold hover:underline">Back to login</Link>
        </p>
      </motion.div>
    </div>
  )
}
