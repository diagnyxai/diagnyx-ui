'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out Diagnyx',
    features: [
      '10K events/month',
      '1 user',
      '7 day data retention',
      'Basic monitoring',
      'Community support',
    ],
    notIncluded: [
      'Hallucination detection',
      'Cost optimization',
      'Custom evaluations',
      'SSO/SAML',
    ],
    cta: 'Start Free',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$299',
    description: 'For growing AI teams',
    features: [
      '1M events/month',
      '10 users',
      '30 day data retention',
      'Hallucination detection',
      'Cost optimization',
      'Custom evaluations',
      'Slack integration',
      'Email support',
    ],
    notIncluded: [
      'SSO/SAML',
      'On-premise deployment',
      'Custom SLA',
    ],
    cta: 'Start Trial',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$999',
    description: 'For teams at scale',
    features: [
      '10M events/month',
      'Unlimited users',
      '90 day data retention',
      'All Pro features',
      'SSO/SAML',
      'Advanced analytics',
      'API access',
      'Priority support',
      'Custom integrations',
    ],
    notIncluded: [
      'On-premise deployment',
      'Custom SLA',
    ],
    cta: 'Start Trial',
    href: '/signup?plan=business',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited events',
      'Unlimited users',
      'Unlimited retention',
      'All Business features',
      'On-premise deployment',
      'Custom SLA',
      'Professional services',
      'Dedicated support',
      'Custom contracts',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    href: '/contact-sales',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full ${plan.popular ? 'border-blue-600 border-2 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="text-center">
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-500">/month</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start opacity-50">
                        <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include: SDK libraries, REST API, Documentation, Basic integrations
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Prices exclude applicable taxes. Volume discounts available.
          </p>
        </div>
      </div>
    </section>
  )
}