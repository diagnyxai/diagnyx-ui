'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, Star, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const benefits = [
  { icon: CheckCircle, text: '14-day free trial' },
  { icon: Clock, text: 'Setup in under 5 minutes' },
  { icon: Shield, text: 'No credit card required' },
  { icon: Star, text: 'Cancel anytime' }
]

const urgencyStats = [
  { label: 'AI Teams Already Using Diagnyx', value: '3,650+' },
  { label: 'Cost Savings This Month', value: '$2.4M+' },
  { label: 'Hallucinations Prevented', value: '47,000+' }
]

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_70%)]" />
            
            <CardContent className="relative p-8 lg:p-16 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Main CTA Content */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      🚀 Start Today
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-100 border-green-300/30">
                      <Star className="w-3 h-3 mr-1" />
                      Limited Time
                    </Badge>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Ready to Transform Your
                    <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      AI Operations?
                    </span>
                  </h2>
                  
                  <p className="text-xl text-blue-100 mb-8">
                    Join thousands of AI teams who trust Diagnyx to monitor, optimize, 
                    and secure their LLM applications. Start your free trial today.
                  </p>

                  {/* Benefits list */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit.text}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <benefit.icon className="w-4 h-4 text-green-300" />
                        <span className="text-sm text-blue-100">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-50 shadow-lg text-lg px-8 h-12 group"
                      asChild
                    >
                      <Link href="/signup">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 h-12"
                      asChild
                    >
                      <Link href="/demo">
                        Request Demo
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-blue-200 mt-4">
                    No credit card required • Setup in under 5 minutes • Cancel anytime
                  </p>
                </div>

                {/* Right: Stats & Social Proof */}
                <div className="space-y-8">
                  {/* Live stats */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="font-semibold text-lg mb-4 text-center">Live Impact Today</h3>
                    <div className="space-y-4">
                      {urgencyStats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-blue-100">{stat.label}:</span>
                          <span className="text-lg font-bold text-yellow-300">{stat.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Customer testimonial preview */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-blue-100 ml-2">4.9/5 from 500+ reviews</span>
                    </div>
                    <blockquote className="text-sm text-blue-100 italic mb-3">
                      "Diagnyx reduced our LLM costs by 78% in the first month. The ROI was immediate."
                    </blockquote>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold">
                        SC
                      </div>
                      <div>
                        <div className="text-xs font-medium">Sarah Chen</div>
                        <div className="text-xs text-blue-200">VP Engineering, TechFlow AI</div>
                      </div>
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center justify-center gap-4 text-xs text-blue-200">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>SOC 2</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>GDPR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>HIPAA</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alternative CTA for different user personas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Developers */}
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Developers</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get started in 5 minutes with our SDK
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Teams */}
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Teams</h3>
              <p className="text-sm text-gray-600 mb-4">
                Collaborate on AI quality and costs
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/signup?plan=pro">Start Pro Trial</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise */}
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">For Enterprise</h3>
              <p className="text-sm text-gray-600 mb-4">
                Custom deployment and support
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/contact-sales">Contact Sales</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}