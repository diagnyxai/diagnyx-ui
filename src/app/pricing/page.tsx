import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PricingHero } from '@/components/pricing/pricing-hero'
import { PricingTable } from '@/components/pricing/pricing-table'
import { PricingFAQ } from '@/components/pricing/pricing-faq'
import { ROICalculator } from '@/components/pricing/roi-calculator'
import { PricingTestimonials } from '@/components/pricing/pricing-testimonials'

export const metadata: Metadata = {
  title: 'Pricing - Diagnyx LLM Observability Platform',
  description: 'Simple, transparent pricing for LLM observability. Start free, scale as you grow. Enterprise-grade features for teams of all sizes.',
  openGraph: {
    title: 'Pricing - Diagnyx LLM Observability Platform',
    description: 'Simple, transparent pricing for LLM observability. Start free, scale as you grow.',
  },
}

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PricingHero />
      <PricingTable />
      <ROICalculator />
      <PricingTestimonials />
      <PricingFAQ />
      <Footer />
    </main>
  )
}