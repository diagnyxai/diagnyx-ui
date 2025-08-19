'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How does the 14-day free trial work?',
    answer: 'Start with any paid plan and get full access for 14 days. No credit card required. You can cancel anytime during the trial with no charges. After the trial, you\'ll automatically be moved to the Free plan unless you choose to upgrade.'
  },
  {
    question: 'What counts as an "event" in my plan?',
    answer: 'An event is any LLM API call, evaluation, or trace that Diagnyx processes. This includes requests to OpenAI, Anthropic, or any other LLM provider that you monitor through our platform. Function calls, tool usage, and streaming responses each count as separate events.'
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features and your billing adjusts for the remainder of your billing cycle. When downgrading, changes take effect at the start of your next billing period.'
  },
  {
    question: 'How do volume discounts work?',
    answer: 'Volume discounts are available for annual billing and high-volume usage. Save up to 40% with annual plans. Enterprise customers with high event volumes can get custom pricing. Contact our sales team for a quote tailored to your usage patterns.'
  },
  {
    question: 'What happens if I exceed my event limit?',
    answer: 'We\'ll notify you when you reach 80% of your limit. If you exceed your monthly limit, we won\'t cut you off - instead, overage events are charged at $0.001 per event for Pro, $0.0005 for Business, and custom rates for Enterprise. You can upgrade anytime to get a higher limit.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with Diagnyx within the first 30 days of your paid subscription, contact us for a full refund. Refunds are processed within 5-7 business days.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We\'re SOC 2 Type II certified and GDPR compliant. Your data is encrypted in transit and at rest. We offer zero-knowledge mode for analyzing performance without storing sensitive data. Enterprise customers can deploy on-premise or in their own cloud environment.'
  },
  {
    question: 'What integrations are included?',
    answer: 'All plans include integrations with major LLM providers (OpenAI, Anthropic, Google, AWS Bedrock), popular frameworks (LangChain, LlamaIndex), and basic monitoring tools. Paid plans add Slack, Teams, PagerDuty, and custom webhook integrations.'
  },
  {
    question: 'How does cost optimization work?',
    answer: 'Our RouteLLM technology automatically routes requests to the most cost-effective model that meets your quality requirements. We analyze response patterns and suggest model alternatives, implement intelligent caching, and provide batch processing optimizations. Customers typically see 70-85% cost reduction.'
  },
  {
    question: 'What support is included?',
    answer: 'Free tier includes community support via Discord. Pro includes email support with 24-hour response time. Business includes priority support with 4-hour response time and live chat. Enterprise customers get a dedicated customer success manager and phone support.'
  },
  {
    question: 'Can I use Diagnyx with my existing monitoring stack?',
    answer: 'Yes! Diagnyx works alongside your existing observability tools. We provide OpenTelemetry-native integration, REST APIs, and webhooks to send data to your preferred monitoring platforms like DataDog, New Relic, or Grafana.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'Your data is retained for 90 days after cancellation, giving you time to export it if needed. You can download your data via our API or contact support for assistance. After 90 days, all data is permanently deleted in compliance with our retention policy.'
  }
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We have answers. Contact us if you need more information.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CardContent className="px-6 pb-6 pt-0">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Support
            </a>
            <a
              href="/docs"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Read Documentation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}