'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Shield, DollarSign, Brain, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeaturesHero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-6">
            🚀 Production-Ready AI Observability
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Everything You Need for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Production AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Comprehensive observability, optimization, and security features designed 
            specifically for AI teams deploying LLMs at scale in production environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/demo">
                Request Demo
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center space-y-2 text-gray-700"
            >
              <Brain className="h-8 w-8 text-purple-600" />
              <div className="text-center">
                <p className="font-semibold">AI Quality</p>
                <p className="text-sm text-gray-500">Hallucination Detection</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-2 text-gray-700"
            >
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="text-center">
                <p className="font-semibold">Cost Optimization</p>
                <p className="text-sm text-gray-500">Up to 85% Savings</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center space-y-2 text-gray-700"
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <p className="font-semibold">Security</p>
                <p className="text-sm text-gray-500">Enterprise-Grade</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center space-y-2 text-gray-700"
            >
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="text-center">
                <p className="font-semibold">Analytics</p>
                <p className="text-sm text-gray-500">Real-time Insights</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}