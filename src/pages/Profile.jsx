import { User, Settings, MapPin, Mail, Phone, ImageOff } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { listings, jobs } from '@/data/mockData'

export default function Profile() {
  return (
    <div className="section py-8">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="grid lg:grid-cols-3 gap-8 mt-6">
        <Card className="p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-display font-bold">
              RK
            </div>
            <h2 className="font-semibold mt-3">Ravi Kumar</h2>
            <p className="text-xs text-muted-foreground">Member since Jan 2025</p>
            <Badge variant="seal" className="mt-2">Verified</Badge>
          </div>
          <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Mail size={14} /> ravi.kumar@example.com</p>
            <p className="flex items-center gap-2"><Phone size={14} /> +91 90000 00001</p>
            <p className="flex items-center gap-2"><MapPin size={14} /> Sadar Bazar, Aurangabad</p>
          </div>
          <Button variant="outline" className="w-full mt-6"><Settings size={15} /> Edit Profile</Button>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="listings">
            <TabsList>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              <div className="grid sm:grid-cols-2 gap-4">
                {listings.slice(0, 3).map((item) => (
                  <Card key={item.id} className="overflow-hidden flex flex-col">
                    <div className="h-28 bg-muted flex items-center justify-center text-muted-foreground/40">
                      <ImageOff size={22} />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.price}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1 text-xs text-destructive border-destructive/30">Delete</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="grid sm:grid-cols-2 gap-4">
                {jobs.slice(0, 2).map((job) => (
                  <Card key={job.id} className="p-4">
                    <p className="font-semibold text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{job.company} · {job.location}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="text-center py-16 text-muted-foreground">
                <User size={28} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Messaging connects to the API in a later phase.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
