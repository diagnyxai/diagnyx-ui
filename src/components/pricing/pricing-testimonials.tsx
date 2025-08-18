'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechFlow AI',
    companySize: '500-1000 employees',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b2fd?w=64&h=64&fit=crop&crop=face',
    content: "Diagnyx helped us reduce our LLM costs by 78% in the first month. The hallucination detection alone prevented three major customer-facing incidents.",
    metrics: {
      costSavings: '78%',
      timeReduction: '65%',
      plan: 'Business'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'InnovateLabs',
    companySize: '100-500 employees',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    content: "The ROI was immediate. We went from spending 40 hours a week debugging AI issues to less than 10. The cost optimization features are game-changing.",
    metrics: {
      costSavings: '82%',
      timeReduction: '75%',
      plan: 'Pro'
    }
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Head of AI',
    company: 'MedTech Solutions',
    companySize: '1000+ employees',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    content: "In healthcare, accuracy is non-negotiable. Diagnyx's 99.7% hallucination detection rate gives us the confidence to deploy AI at scale.",
    metrics: {
      costSavings: '71%',
      accuracyImprovement: '99.7%',
      plan: 'Enterprise'
    }
  },
  {
    name: 'James Park',
    role: 'Lead AI Engineer',
    company: 'StartupFlow',
    companySize: '10-50 employees',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    content: "As a startup, every dollar counts. Diagnyx's free tier let us get started, and the Pro plan pays for itself 10x over. The cost optimization alone saves us $15K monthly.",
    metrics: {
      costSavings: '86%',
      monthlySavings: '$15,000',
      plan: 'Pro'
    }
  }
]

const companySizes = [
  { size: '10-50', count: '2,400+' },
  { size: '50-200', count: '800+' },
  { size: '200-1000', count: '300+' },
  { size: '1000+', count: '150+' }
]

export function PricingTestimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Teams of All Sizes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why thousands of AI teams choose Diagnyx for their observability needs
          </p>
        </motion.div>

        {/* Company Size Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {companySizes.map((item, index) => (
            <div key={item.size} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{item.count}</div>
              <div className="text-sm text-gray-600">{item.size} employees</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-blue-600 mr-2" />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    {testimonial.metrics.costSavings && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {testimonial.metrics.costSavings}
                        </div>
                        <div className="text-xs text-gray-600">Cost Savings</div>
                      </div>
                    )}
                    {testimonial.metrics.timeReduction && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {testimonial.metrics.timeReduction}
                        </div>
                        <div className="text-xs text-gray-600">Time Reduction</div>
                      </div>
                    )}
                    {testimonial.metrics.accuracyImprovement && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {testimonial.metrics.accuracyImprovement}
                        </div>
                        <div className="text-xs text-gray-600">Accuracy Rate</div>
                      </div>
                    )}
                    {testimonial.metrics.monthlySavings && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {testimonial.metrics.monthlySavings}
                        </div>
                        <div className="text-xs text-gray-600">Monthly Savings</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-lg font-semibold text-gray-700">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                        <div className="text-xs text-gray-400">{testimonial.companySize}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {testimonial.metrics.plan} Plan
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Join thousands of AI teams who trust Diagnyx for their LLM observability
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Free Trial
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Read More Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}