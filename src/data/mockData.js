// Mock data for local development of the UI before the Express/MongoDB
// API is wired up. Shapes here intentionally mirror the planned Mongoose
// schemas (see backend/models) so swapping in real API calls later is a
// drop-in replacement rather than a rewrite.

export const CITY = 'Aurangabad, Bihar'

export const categories = [
  { id: 'businesses', name: 'Local Businesses', icon: 'Store', count: 340 },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase', count: 128 },
  { id: 'bikes', name: 'Bikes', icon: 'Bike', count: 76 },
  { id: 'cars', name: 'Cars', icon: 'Car', count: 41 },
  { id: 'mobiles', name: 'Mobiles', icon: 'Smartphone', count: 203 },
  { id: 'electronics', name: 'Electronics', icon: 'Tv', count: 95 },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa', count: 58 },
  { id: 'property', name: 'Property', icon: 'Home', count: 62 },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 84 },
  { id: 'others', name: 'Others', icon: 'Grid2x2', count: 37 },
]

export const jobs = [
  { id: 'j1', title: 'Store Manager', company: 'Shree Krishna Traders', salary: '₹18,000 – 22,000/mo', type: 'Full-time', location: 'Sadar Bazar', postedMins: 12 },
  { id: 'j2', title: 'Delivery Rider', company: 'Local Mart Express', salary: '₹12,000/mo + incentives', type: 'Full-time', location: 'Station Road', postedMins: 45 },
  { id: 'j3', title: 'Computer Operator', company: 'Aurangabad e-Seva Kendra', salary: '₹15,000/mo', type: 'Full-time', location: 'Court Road', postedMins: 120 },
  { id: 'j4', title: 'School Teacher (Maths)', company: "Children's Paradise School", salary: '₹20,000 – 25,000/mo', type: 'Full-time', location: 'Civil Lines', postedMins: 200 },
]

export const listings = [
  { id: 'l1', title: 'Honda Activa 5G, 2021', price: '₹58,000', category: 'Bikes', location: 'Daudnagar Road', image: null },
  { id: 'l2', title: 'iPhone 12, 128GB', price: '₹32,500', category: 'Mobiles', location: 'Sadar Bazar', image: null },
  { id: 'l3', title: '2BHK Flat for Rent', price: '₹8,500/mo', category: 'Property', location: 'Civil Lines', image: null },
  { id: 'l4', title: 'Wooden Study Table', price: '₹2,200', category: 'Furniture', location: 'Model Town', image: null },
]

export const businesses = [
  { id: 'b1', name: 'Shree Krishna Traders', category: 'Grocery & Kirana', location: 'Sadar Bazar', verified: true, rating: 4.6 },
  { id: 'b2', name: 'Rani Beauty Parlour', category: 'Salon & Spa', location: 'Station Road', verified: true, rating: 4.8 },
  { id: 'b3', name: 'Bihar Electricals', category: 'Electronics Repair', location: 'Court Road', verified: false, rating: 4.2 },
  { id: 'b4', name: 'Annapurna Bhandar', category: 'Sweets & Bakery', location: 'Civil Lines', verified: true, rating: 4.7 },
]

export const testimonials = [
  { id: 't1', name: 'Ravi Kumar', role: 'Shop Owner, Sadar Bazar', quote: 'Listed my shop on APNAHUB and started getting calls within a week.' },
  { id: 't2', name: 'Sunita Devi', role: 'Job Seeker', quote: 'Found a teaching job near my home without visiting a single office.' },
  { id: 't3', name: 'Amit Singh', role: 'Buyer', quote: 'Sold my old bike in three days, straight to a buyer nearby.' },
]

// Live activity feed used in the hero — gives the impression of a town
// that's actively transacting right now, not a static directory.
export const liveActivity = [
  { id: 'a1', text: 'New job posted', detail: 'Store Manager · Sadar Bazar', mins: 2, tilt: -4 },
  { id: 'a2', text: 'Listed for sale', detail: 'Honda Activa 5G · ₹58,000', mins: 6, tilt: 3 },
  { id: 'a3', text: 'Business verified', detail: 'Annapurna Bhandar', mins: 15, tilt: -2 },
]
