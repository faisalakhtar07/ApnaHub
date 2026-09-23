import {
  Briefcase, Building2, ShoppingBag, Smartphone, Car, Bike,
  Home as HomeIcon, Droplet, ShieldCheck, Zap, Gift, BadgeCheck, MapPinned,
} from "lucide-react";

export const CATEGORIES = [
  { icon: Briefcase, title: "Jobs", desc: "Local hiring, no middlemen", tone: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" },
  { icon: Building2, title: "Local Businesses", desc: "Discover shops near you", tone: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
  { icon: ShoppingBag, title: "Buy & Sell", desc: "Trade within your city", tone: "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400" },
  { icon: Smartphone, title: "Electronics", desc: "Phones, laptops & more", tone: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400" },
  { icon: Car, title: "Cars", desc: "Verified sellers, fair prices", tone: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" },
  { icon: Bike, title: "Bikes", desc: "Two-wheelers, all budgets", tone: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400" },
  { icon: HomeIcon, title: "Property", desc: "Rent & sale · Coming Soon", tone: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400", soon: true },
  { icon: Droplet, title: "Blood Donor", desc: "Find donors nearby · Coming Soon", tone: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400", soon: true },
];

export const BUSINESSES = [
  { id: 1, name: "Shree Krishna Electronics", category: "Electronics Store", city: "Aurangabad", address: "Court Road, Aurangabad", phone: "9000000001", whatsapp: "9000000001", coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"] },
  { id: 2, name: "Milan Sweets & Bakers", category: "Sweet Shop", city: "Aurangabad", address: "Station Road, Aurangabad", phone: "9000000002", whatsapp: "9000000002", coverImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600&auto=format&fit=crop"] },
  { id: 3, name: "Ideal Motor Works", category: "Bike Repair & Service", city: "Aurangabad", address: "Daudnagar Road, Aurangabad", phone: "9000000003", whatsapp: "9000000003", coverImage: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=600&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=600&auto=format&fit=crop"] },
  { id: 4, name: "Sunrise Readymade Garments", category: "Clothing Store", city: "Aurangabad", address: "Bazar Samiti, Aurangabad", phone: "9000000004", whatsapp: "9000000004", coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop", images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop"] },
];

export const JOBS = [
  { id: 1, title: "Field Sales Executive", companyName: "Nova Distributors", jobType: "Full Time", experience: "0–2 yrs", salary: "₹12,000–18,000/mo", location: "Aurangabad", city: "Aurangabad", state: "Bihar" },
  { id: 2, title: "Computer Operator", companyName: "Sethi Cyber Cafe", jobType: "Full Time", experience: "Fresher", salary: "₹9,000–12,000/mo", location: "Aurangabad", city: "Aurangabad", state: "Bihar" },
  { id: 3, title: "Delivery Rider", companyName: "QuickKirana", jobType: "Part Time", experience: "Any", salary: "₹300–500/day", location: "Aurangabad", city: "Aurangabad", state: "Bihar" },
  { id: 4, title: "Store Manager", companyName: "Milan Sweets & Bakers", jobType: "Full Time", experience: "2+ yrs", salary: "₹15,000–22,000/mo", location: "Aurangabad", city: "Aurangabad", state: "Bihar" },
];

export const LISTINGS = [
  { id: 1, title: "Honda Activa 5G, 2021", price: "₹58,000", cond: "Used – Good", loc: "Aurangabad", seller: "Ravi K.", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop" },
  { id: 2, title: "iPhone 12, 128GB", price: "₹27,500", cond: "Used – Excellent", loc: "Aurangabad", seller: "Simran P.", img: "https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=600&auto=format&fit=crop" },
  { id: 3, title: "Study Table with Chair", price: "₹1,800", cond: "Used – Fair", loc: "Aurangabad", seller: "Amit S.", img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop" },
  { id: 4, title: "Maruti Alto 800, 2018", price: "₹2,45,000", cond: "Used – Good", loc: "Aurangabad", seller: "Deepak V.", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=600&auto=format&fit=crop" },
];

export const TESTIMONIALS = [
  { name: "Rakesh Kumar", role: "Shop Owner, Court Road", quote: "APNAHUB brought me customers I never reached before. Listing my shop took five minutes.", rating: 5 },
  { name: "Priya Singh", role: "Job Seeker", quote: "I found a store manager role near my house within a week of signing up.", rating: 5 },
  { name: "Manoj Yadav", role: "Bike Seller", quote: "Sold my old Activa to a genuine local buyer without any agent commission.", rating: 4 },
];

export const WHY = [
  { icon: ShieldCheck, title: "Trusted", desc: "Verified businesses and real listings you can rely on." },
  { icon: Zap, title: "Fast", desc: "Post, browse and connect in seconds, not days." },
  { icon: Gift, title: "Free", desc: "No hidden charges to list your business or listing." },
  { icon: BadgeCheck, title: "Verified", desc: "ID-checked sellers and manually reviewed listings." },
  { icon: MapPinned, title: "Local", desc: "Built for Aurangabad first, expanding across Bihar." },
];

export const PULSE = [
  "New job posted · Field Sales Executive, Aurangabad",
  "Milan Sweets & Bakers just got verified ✓",
  "Honda Activa 5G listed 4 minutes ago",
  "12 businesses joined APNAHUB this week",
  "Store Manager role filled in Bazar Samiti",
];
