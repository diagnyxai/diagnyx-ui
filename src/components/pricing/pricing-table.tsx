'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Star } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out Diagnyx',
    billing: '/month',
    features: [
      '10K events/month',
      '1 user',
      '7 day data retention',
      'Basic monitoring',
      'Community support',
      'REST API access',
      'Basic integrations',
    ],
    notIncluded: [
      'Hallucination detection',
      'Cost optimization',
      'Custom evaluations',
      'SSO/SAML',
      'Advanced analytics',
      'Priority support',
    ],
    cta: 'Start Free',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$299',
    description: 'For growing AI teams',
    billing: '/month',
    features: [
      '1M events/month',
      '10 users',
      '30 day data retention',
      'Hallucination detection',
      'Cost optimization (up to 85% savings)',
      'Custom evaluations',
      'Advanced analytics',
      'Slack/Teams integration',
      'Email support',
      'REST API & SDK',
      'Webhook notifications',
    ],
    notIncluded: [
      'SSO/SAML',
      'On-premise deployment',
      'Custom SLA',
      'Professional services',
    ],
    cta: 'Start 14-Day Trial',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Business',
    price: '$999',
    description: 'For teams at scale',
    billing: '/month',
    features: [
      '10M events/month',
      'Unlimited users',
      '90 day data retention',
      'All Pro features',
      'SSO/SAML authentication',
      'Advanced RBAC',
      'Custom dashboards',
      'API access with higher limits',
      'Priority email & chat support',
      'Custom integrations',
      'Advanced security features',
    ],
    notIncluded: [
      'On-premise deployment',
      'Custom SLA',
      'Professional services',
    ],
    cta: 'Start 14-Day Trial',
    href: '/signup?plan=business',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    billing: '',
    features: [
      'Unlimited events',
      'Unlimited users',
      'Unlimited retention',
      'All Business features',
      'On-premise/hybrid deployment',
      'Custom SLA (99.95%+ uptime)',
      'Professional services',
      'Dedicated customer success',
      'Custom contracts & terms',
      'Advanced compliance (SOC2, HIPAA)',
      'Multi-region deployments',
      'Custom development',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    href: '/contact-sales',
    popular: false,
  },
]

const comparisonFeatures = [
  {
    category: 'Core Monitoring',
    features: [
      { name: 'Event Tracking', free: '10K/month', pro: '1M/month', business: '10M/month', enterprise: 'Unlimited' },
      { name: 'Data Retention', free: '7 days', pro: '30 days', business: '90 days', enterprise: 'Custom' },
      { name: 'Real-time Analytics', free: true, pro: true, business: true, enterprise: true },
      { name: 'Custom Dashboards', free: false, pro: 'Basic', business: 'Advanced', enterprise: 'Unlimited' },
    ]
  },
  {
    category: 'AI Quality & Security',
    features: [
      { name: 'Hallucination Detection', free: false, pro: true, business: true, enterprise: true },
      { name: 'Cost Optimization', free: false, pro: 'Up to 85%', business: 'Up to 85%', enterprise: 'Custom models' },
      { name: 'Custom Evaluations', free: false, pro: true, business: true, enterprise: true },
      { name: 'PII Detection', free: false, pro: true, business: true, enterprise: true },
    ]
  },
  {
    category: 'Team & Access',
    features: [
      { name: 'Team Members', free: '1 user', pro: '10 users', business: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'SSO/SAML', free: false, pro: false, business: true, enterprise: true },
      { name: 'Role-based Access', free: false, pro: 'Basic', business: 'Advanced', enterprise: 'Custom' },
      { name: 'API Access', free: 'Basic', pro: 'Standard', business: 'Advanced', enterprise: 'Unlimited' },
    ]
  },
  {
    category: 'Support & Services',
    features: [
      { name: 'Support', free: 'Community', pro: 'Email', business: 'Priority', enterprise: 'Dedicated CSM' },
      { name: 'SLA', free: false, pro: false, business: '99.9%', enterprise: 'Custom' },
      { name: 'Professional Services', free: false, pro: false, business: false, enterprise: true },
      { name: 'Custom Development', free: false, pro: false, business: false, enterprise: true },
    ]
  },
]

export function PricingTable() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full relative ${plan.popular ? 'border-blue-600 border-2 shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.billing && <span className="text-gray-500">{plan.billing}</span>}
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

        {/* Detailed Comparison Table */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {comparisonFeatures.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">{category.category}</h4>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-5 bg-gray-50 border-b">
                      <div className="p-4 font-medium">Feature</div>
                      <div className="p-4 font-medium text-center">Free</div>
                      <div className="p-4 font-medium text-center">Pro</div>
                      <div className="p-4 font-medium text-center">Business</div>
                      <div className="p-4 font-medium text-center">Enterprise</div>
                    </div>
                    {category.features.map((feature, featureIndex) => (
                      <div key={feature.name} className={`grid grid-cols-5 border-b last:border-b-0 ${featureIndex % 2 === 0 ? 'bg-gray-25' : 'bg-white'}`}>
                        <div className="p-4 font-medium text-gray-900">{feature.name}</div>
                        <div className="p-4 text-center">
                          {typeof feature.free === 'boolean' ? (
                            feature.free ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-sm">{feature.free}</span>
                          )}
                        </div>
                        <div className="p-4 text-center">
                          {typeof feature.pro === 'boolean' ? (
                            feature.pro ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-sm">{feature.pro}</span>
                          )}
                        </div>
                        <div className="p-4 text-center">
                          {typeof feature.business === 'boolean' ? (
                            feature.business ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-sm">{feature.business}</span>
                          )}
                        </div>
                        <div className="p-4 text-center">
                          {typeof feature.enterprise === 'boolean' ? (
                            feature.enterprise ? <Check className="h-5 w-5 text-green-600 mx-auto" /> : <X className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : (
                            <span className="text-sm">{feature.enterprise}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-2">
            All plans include: SDK libraries, REST API, Documentation, Basic integrations
          </p>
          <p className="text-sm text-gray-500">
            Prices exclude applicable taxes. Volume discounts available for annual billing.
          </p>
        </div>
      </div>
    </section>
  )
}