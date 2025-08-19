import { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FeaturesHero } from '@/components/features/features-hero'
import { FeaturesGrid } from '@/components/features/features-grid'
import { FeatureDetails } from '@/components/features/feature-details'
import { TechnicalSpecs } from '@/components/features/technical-specs'
import { IntegrationsShowcase } from '@/components/features/integrations-showcase'

export const metadata: Metadata = {
  title: 'Features - Diagnyx LLM Observability Platform',
  description: 'Comprehensive LLM observability features: hallucination detection, cost optimization, security, real-time analytics, and more.',
  openGraph: {
    title: 'Features - Diagnyx LLM Observability Platform',
    description: 'Comprehensive LLM observability features for production AI systems',
  },
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FeaturesHero />
      <FeaturesGrid />
      <FeatureDetails />
      <TechnicalSpecs />
      <IntegrationsShowcase />
      <Footer />
    </main>
  )
}