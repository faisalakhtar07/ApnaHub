import Hero from '../components/home/Hero'
import FeaturedCategories from '../components/home/FeaturedCategories'
import LatestJobs from '../components/home/LatestJobs'
import LatestListings from '../components/home/LatestListings'
import FeaturedBusinesses from '../components/home/FeaturedBusinesses'
import PopularCategories from '../components/home/PopularCategories'
import CTASection from '../components/home/CTASection'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <LatestJobs />
      <LatestListings />
      <FeaturedBusinesses />
      <PopularCategories />
      <CTASection />
      <Testimonials />
    </>
  )
}
