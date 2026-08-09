import Hero from '@/components/home/Hero'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedBusinesses from '@/components/home/FeaturedBusinesses'
import LatestJobs from '@/components/home/LatestJobs'
import BuySellSection from '@/components/home/BuySellSection'
import StatsSection from '@/components/home/StatsSection'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import DownloadAppSection from '@/components/home/DownloadAppSection'

export default function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <LatestJobs />
      <BuySellSection />
      <FeaturedBusinesses />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <DownloadAppSection />
    </>
  )
}
