'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Play, Shield, DollarSign, Brain, Star, CheckCircle, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const customerLogos = [
  { name: 'TechFlow AI', logo: 'TF' },
  { name: 'InnovateLabs', logo: 'IL' },
  { name: 'MedTech Solutions', logo: 'MS' },
  { name: 'StartupFlow', logo: 'SF' },
  { name: 'AI Dynamics', logo: 'AD' },
  { name: 'DataCorp', logo: 'DC' }
]

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_70%)] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent_70%)] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              SOC 2 Type II Certified
            </Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              GDPR Compliant
            </Badge>
            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
              <Star className="w-3 h-3 mr-1" />
              Enterprise Ready
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
            The Complete
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              LLM Observability Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            Monitor every LLM interaction, detect hallucinations with 99.7% accuracy, and reduce costs by up to 85%. 
            Trusted by AI teams at scale to deliver reliable, cost-effective AI applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12 border-gray-300 hover:bg-gray-50" asChild>
              <Link href="/demo">
                <Play className="mr-2 h-5 w-5" />
                Request Demo
              </Link>
            </Button>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">99.7%</div>
              <div className="text-sm text-gray-600 font-medium">Hallucination Detection Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">Industry-leading AI safety</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">85%</div>
              <div className="text-sm text-gray-600 font-medium">Average Cost Reduction</div>
              <div className="text-xs text-gray-500 mt-1">Smart model routing & caching</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
              <div className="text-sm text-gray-600 font-medium">Requests Per Second</div>
              <div className="text-xs text-gray-500 mt-1">Enterprise-scale performance</div>
            </motion.div>
          </div>

          {/* Customer logos */}
          <div className="mb-12">
            <p className="text-sm text-gray-500 mb-6">Trusted by AI teams at</p>
            <div className="flex items-center justify-center flex-wrap gap-8 opacity-60">
              {customerLogos.map((customer) => (
                <div key={customer.name} className="flex items-center space-x-2 text-gray-400">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold">
                    {customer.logo}
                  </div>
                  <span className="text-sm font-medium">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Hero Dashboard Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative">
            {/* Dashboard mockup container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              {/* Browser bar */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 px-4">
                  <div className="bg-white border border-gray-200 rounded px-3 py-1 text-xs text-gray-500">
                    app.diagnyx.ai/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div className="relative">
                {/* Professional dashboard mockup - replace with actual screenshots */}
                <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400 mb-4">Diagnyx Dashboard</div>
                    <div className="text-gray-500">Professional product screenshots will be added here</div>
                    <div className="text-sm text-gray-400 mt-2">Real-time LLM monitoring • Cost optimization • Hallucination detection</div>
                  </div>
                </div>
                {/* Overlay to make it look more professional */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent pointer-events-none rounded-lg"></div>
              </div>
            </div>

            {/* Floating metrics cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 top-1/4 bg-white rounded-lg shadow-lg p-4 border hidden lg:block"
            >
              <div className="text-xs text-gray-500 mb-1">Cost Savings This Month</div>
              <div className="text-2xl font-bold text-green-600">$47,382</div>
              <div className="text-xs text-green-600">↗ 23% vs last month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-4 top-1/3 bg-white rounded-lg shadow-lg p-4 border hidden lg:block"
            >
              <div className="text-xs text-gray-500 mb-1">Requests Processed</div>
              <div className="text-2xl font-bold text-blue-600">1.2M</div>
              <div className="text-xs text-blue-600">↗ 45% vs last month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 border hidden md:block"
            >
              <div className="text-xs text-gray-500 mb-1">Avg Response Time</div>
              <div className="text-2xl font-bold text-purple-600">127ms</div>
              <div className="text-xs text-green-600">↗ 15% improvement</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}