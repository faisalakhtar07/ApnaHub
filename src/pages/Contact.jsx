import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useToast } from '@/components/ui/toast'

export default function Contact() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({ title: 'Message sent', description: "We'll get back to you within a day.", variant: 'success' })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <h1 className="text-3xl font-bold mt-4">Get in touch</h1>
      <p className="text-muted-foreground mt-1 text-sm mb-10">Questions, feedback, or partnership ideas — we'd love to hear from you.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Card className="p-5 flex items-start gap-3">
            <Mail className="text-primary shrink-0" size={18} />
            <div>
              <p className="font-semibold text-sm">Email</p>
              <p className="text-sm text-muted-foreground">hello@apnahub.in</p>
            </div>
          </Card>
          <Card className="p-5 flex items-start gap-3">
            <Phone className="text-primary shrink-0" size={18} />
            <div>
              <p className="font-semibold text-sm">Phone</p>
              <p className="text-sm text-muted-foreground">+91 90000 00000</p>
            </div>
          </Card>
          <Card className="p-5 flex items-start gap-3">
            <MapPin className="text-primary shrink-0" size={18} />
            <div>
              <p className="font-semibold text-sm">Office</p>
              <p className="text-sm text-muted-foreground">Sadar Bazar, Aurangabad, Bihar</p>
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-2 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit"><Send size={15} /> Send Message</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
