'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowRight, TrendingUp, DollarSign, Shield, Clock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const successStories = [
  {
    company: 'TechFlow AI',
    logo: 'TF',
    industry: 'FinTech',
    size: '500-1000 employees',
    challenge: 'Rising LLM costs and hallucination risks in financial AI applications',
    solution: 'Implemented Diagnyx for cost optimization and AI quality monitoring',
    results: {
      costSavings: '78%',
      timeReduction: '65%',
      accuracyImprovement: '99.7%',
      monthlyValue: '$84,000'
    },
    quote: "Diagnyx transformed our AI operations. We reduced costs by 78% while achieving 99.7% hallucination detection accuracy. The platform prevented three major incidents that could have cost us millions.",
    author: {
      name: 'Sarah Chen',
      role: 'VP of Engineering',
      avatar: 'SC'
    },
    metrics: [
      { icon: DollarSign, label: 'Monthly Savings', value: '$84,000', color: 'text-green-600' },
      { icon: TrendingUp, label: 'Cost Reduction', value: '78%', color: 'text-green-600' },
      { icon: Shield, label: 'Incidents Prevented', value: '3', color: 'text-blue-600' },
      { icon: Clock, label: 'Implementation Time', value: '2 days', color: 'text-purple-600' }
    ]
  },
  {
    company: 'MedTech Solutions',
    logo: 'MS',
    industry: 'Healthcare',
    size: '1000+ employees',
    challenge: 'Need for 99.9%+ accuracy in medical AI applications with strict compliance',
    solution: 'Enterprise deployment with custom compliance and zero-knowledge mode',
    results: {
      costSavings: '71%',
      accuracyImprovement: '99.8%',
      complianceScore: '100%',
      patientSafety: 'Zero incidents'
    },
    quote: "In healthcare, accuracy isn't just important—it's life-critical. Diagnyx's 99.8% hallucination detection rate and HIPAA compliance give us the confidence to deploy AI at scale while ensuring patient safety.",
    author: {
      name: 'Dr. Emily Watson',
      role: 'Head of AI',
      avatar: 'EW'
    },
    metrics: [
      { icon: Shield, label: 'Detection Accuracy', value: '99.8%', color: 'text-blue-600' },
      { icon: TrendingUp, label: 'Cost Reduction', value: '71%', color: 'text-green-600' },
      { icon: Shield, label: 'Compliance Score', value: '100%', color: 'text-blue-600' },
      { icon: Clock, label: 'Zero Incidents', value: '6 months', color: 'text-purple-600' }
    ]
  },
  {
    company: 'StartupFlow',
    logo: 'SF',
    industry: 'SaaS',
    size: '10-50 employees',
    challenge: 'Limited budget with need for enterprise-grade AI monitoring',
    solution: 'Started with free tier, upgraded to Pro plan as they scaled',
    results: {
      costSavings: '86%',
      monthlySavings: '$15,000',
      timeReduction: '80%',
      growthEnabled: '300%'
    },
    quote: "As a startup, every dollar counts. Diagnyx's free tier let us get started, and the Pro plan pays for itself 10x over. The cost optimization alone saves us $15K monthly, which we reinvest in growth.",
    author: {
      name: 'James Park',
      role: 'Lead AI Engineer',
      avatar: 'JP'
    },
    metrics: [
      { icon: DollarSign, label: 'Monthly Savings', value: '$15,000', color: 'text-green-600' },
      { icon: TrendingUp, label: 'Cost Reduction', value: '86%', color: 'text-green-600' },
      { icon: Clock, label: 'Time Reduction', value: '80%', color: 'text-purple-600' },
      { icon: TrendingUp, label: 'Growth Enabled', value: '300%', color: 'text-blue-600' }
    ]
  }
]

const overallStats = [
  { label: 'Average Cost Reduction', value: '78%', description: 'Across all customers' },
  { label: 'Implementation Time', value: '< 1 day', description: 'Average setup time' },
  { label: 'Customer Satisfaction', value: '4.9/5', description: 'Based on 500+ reviews' },
  { label: 'ROI Achievement', value: '< 30 days', description: 'Payback period' }
]

export function CustomerSuccess() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Customer Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how AI teams across industries are transforming their operations with Diagnyx
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {overallStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Success Stories */}
        <div className="space-y-12">
          {successStories.map((story, index) => (
            <motion.div
              key={story.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Content Side */}
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                          {story.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{story.company}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline">{story.industry}</Badge>
                            <span>•</span>
                            <span>{story.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                        <p className="text-gray-600 text-sm mb-4">{story.challenge}</p>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                        <p className="text-gray-600 text-sm">{story.solution}</p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 italic mb-4">
                          "{story.quote}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                            {story.author.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{story.author.name}</div>
                            <div className="text-xs text-gray-600">{story.author.role}</div>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full group" asChild>
                        <Link href={`/case-studies/${story.company.toLowerCase().replace(/\s+/g, '-')}`}>
                          Read Full Case Study
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {/* Metrics Side */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12">
                      <h4 className="font-bold text-gray-900 mb-6">Key Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {story.metrics.map((metric, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 text-center">
                            <div className="flex justify-center mb-2">
                              <metric.icon className={`h-5 w-5 ${metric.color}`} />
                            </div>
                            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-600">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Additional context */}
                      <div className="mt-6 p-4 bg-white rounded-lg">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">ROI Achieved</div>
                          <div className="text-2xl font-bold text-green-600">
                            {index === 0 ? '847%' : index === 1 ? '623%' : '1,124%'}
                          </div>
                          <div className="text-xs text-gray-500">First year return</div>
                        </div>
                      </div>
                    </div>
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
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join These Success Stories?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Start your free trial today and see why hundreds of AI teams trust Diagnyx 
                for their LLM observability needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link href="/case-studies">
                    View All Case Studies
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}