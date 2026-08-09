// Mock data shared across pages. Shapes mirror the planned Mongoose
// schemas so wiring the real API later is a drop-in replacement.

export const CITY = 'Aurangabad, Bihar'

export const categories = [
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase', description: 'Local job openings, updated daily', count: 128 },
  { id: 'businesses', name: 'Local Businesses', icon: 'Store', description: 'Shops & services near you', count: 340 },
  { id: 'buy-sell', name: 'Buy & Sell', icon: 'Tag', description: 'Second-hand & new items', count: 412 },
  { id: 'electronics', name: 'Electronics', icon: 'Tv', description: 'Phones, laptops & gadgets', count: 95 },
  { id: 'cars', name: 'Cars', icon: 'Car', description: 'Buy or sell used cars', count: 41 },
  { id: 'bikes', name: 'Bikes', icon: 'Bike', description: 'Two-wheelers, all budgets', count: 76 },
  { id: 'property', name: 'Property', icon: 'Home', description: 'Coming soon', count: 0, comingSoon: true },
  { id: 'blood-donor', name: 'Blood Donor', icon: 'Droplet', description: 'Coming soon', count: 0, comingSoon: true },
]

export const jobs = [
  { id: 'j1', title: 'Store Manager', company: 'Shree Krishna Traders', salary: '₹18,000 – 22,000/mo', experience: '2+ years', type: 'Full-time', location: 'Sadar Bazar', postedMins: 12, isNew: true },
  { id: 'j2', title: 'Delivery Rider', company: 'Local Mart Express', salary: '₹12,000/mo + incentives', experience: 'Fresher', type: 'Full-time', location: 'Station Road', postedMins: 45 },
  { id: 'j3', title: 'Computer Operator', company: 'Aurangabad e-Seva Kendra', salary: '₹15,000/mo', experience: '1+ year', type: 'Full-time', location: 'Court Road', postedMins: 120 },
  { id: 'j4', title: 'School Teacher (Maths)', company: "Children's Paradise School", salary: '₹20,000 – 25,000/mo', experience: '3+ years', type: 'Full-time', location: 'Civil Lines', postedMins: 200 },
  { id: 'j5', title: 'Sales Executive', company: 'Bihar Electricals', salary: '₹14,000/mo + commission', experience: '1+ year', type: 'Full-time', location: 'Court Road', postedMins: 260 },
  { id: 'j6', title: 'Data Entry Operator', company: 'Aurangabad e-Seva Kendra', salary: '₹13,000/mo', experience: 'Fresher', type: 'Part-time', location: 'Station Road', postedMins: 320 },
]

export const listings = [
  { id: 'l1', title: 'Honda Activa 5G, 2021', price: '₹58,000', category: 'Bikes', condition: 'Used - Good', location: 'Daudnagar Road', seller: 'Ravi Kumar' },
  { id: 'l2', title: 'iPhone 12, 128GB', price: '₹32,500', category: 'Mobiles', condition: 'Used - Excellent', location: 'Sadar Bazar', seller: 'Amit Singh' },
  { id: 'l3', title: '2BHK Flat for Rent', price: '₹8,500/mo', category: 'Property', condition: 'For Rent', location: 'Civil Lines', seller: 'Sunita Devi' },
  { id: 'l4', title: 'Wooden Study Table', price: '₹2,200', category: 'Furniture', condition: 'Used - Good', location: 'Model Town', seller: 'Manoj Pandey' },
  { id: 'l5', title: 'Samsung 43" Smart TV', price: '₹19,000', category: 'Electronics', condition: 'Used - Excellent', location: 'Station Road', seller: 'Neha Gupta' },
  { id: 'l6', title: 'Maruti Alto 800, 2018', price: '₹2,45,000', category: 'Cars', condition: 'Used - Good', location: 'Court Road', seller: 'Vikash Yadav' },
]

export const businesses = [
  { id: 'b1', name: 'Shree Krishna Traders', category: 'Grocery & Kirana', location: 'Sadar Bazar', verified: true, rating: 4.6, reviews: 82, open: true, phone: '+919000000001' },
  { id: 'b2', name: 'Rani Beauty Parlour', category: 'Salon & Spa', location: 'Station Road', verified: true, rating: 4.8, reviews: 140, open: true, phone: '+919000000002' },
  { id: 'b3', name: 'Bihar Electricals', category: 'Electronics Repair', location: 'Court Road', verified: false, rating: 4.2, reviews: 34, open: false, phone: '+919000000003' },
  { id: 'b4', name: 'Annapurna Bhandar', category: 'Sweets & Bakery', location: 'Civil Lines', verified: true, rating: 4.7, reviews: 96, open: true, phone: '+919000000004' },
  { id: 'b5', name: 'Aurangabad e-Seva Kendra', category: 'Government Services', location: 'Court Road', verified: true, rating: 4.4, reviews: 58, open: true, phone: '+919000000005' },
  { id: 'b6', name: 'Modern Furniture House', category: 'Furniture', location: 'Model Town', verified: false, rating: 4.1, reviews: 21, open: true, phone: '+919000000006' },
]

export const testimonials = [
  { id: 't1', name: 'Ravi Kumar', role: 'Shop Owner, Sadar Bazar', rating: 5, quote: 'Listed my shop on APNAHUB and started getting calls within a week.' },
  { id: 't2', name: 'Sunita Devi', role: 'Job Seeker', rating: 5, quote: 'Found a teaching job near my home without visiting a single office.' },
  { id: 't3', name: 'Amit Singh', role: 'Buyer', rating: 4, quote: 'Sold my old bike in three days, straight to a buyer nearby.' },
]

export const stats = [
  { id: 's1', label: 'Businesses Listed', value: 340 },
  { id: 's2', label: 'Jobs Posted', value: 128 },
  { id: 's3', label: 'Active Listings', value: 412 },
  { id: 's4', label: 'Registered Users', value: 2400 },
]

export const whyChooseUs = [
  { id: 'w1', icon: 'ShieldCheck', title: 'Trusted', description: 'Every business is reviewed before it goes live.' },
  { id: 'w2', icon: 'Zap', title: 'Fast', description: 'Post a listing in under two minutes.' },
  { id: 'w3', icon: 'Gift', title: 'Free', description: 'No fees to browse, post, or connect.' },
  { id: 'w4', icon: 'BadgeCheck', title: 'Verified', description: 'Seller and business identities are checked.' },
  { id: 'w5', icon: 'MapPin', title: 'Local', description: 'Built for Aurangabad, expanding across Bihar.' },
]
