import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diagnyx - LLM Observability Platform',
  description: 'Monitor, optimize, and secure your AI applications with real-time observability, cost optimization, and hallucination detection.',
  keywords: 'LLM observability, AI monitoring, hallucination detection, cost optimization, OpenTelemetry',
  authors: [{ name: 'Diagnyx' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://diagnyx.ai',
    siteName: 'Diagnyx',
    title: 'Diagnyx - LLM Observability Platform',
    description: 'Monitor, optimize, and secure your AI applications',
    images: [{
      url: 'https://diagnyx.ai/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Diagnyx Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnyx - LLM Observability Platform',
    description: 'Monitor, optimize, and secure your AI applications',
    images: ['https://diagnyx.ai/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}