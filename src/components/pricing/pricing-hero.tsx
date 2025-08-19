'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Shield, DollarSign, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function PricingHero() {
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Start free, scale as you grow. No hidden fees, no surprises. 
            Choose the plan that fits your team's needs and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center space-x-3 text-gray-700"
            >
              <Shield className="h-6 w-6 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">14-Day Free Trial</p>
                <p className="text-sm text-gray-500">No Credit Card Required</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-3 text-gray-700"
            >
              <DollarSign className="h-6 w-6 text-green-600" />
              <div className="text-left">
                <p className="font-semibold">Volume Discounts</p>
                <p className="text-sm text-gray-500">Save up to 40%</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-3 text-gray-700"
            >
              <Users className="h-6 w-6 text-purple-600" />
              <div className="text-left">
                <p className="font-semibold">Enterprise Support</p>
                <p className="text-sm text-gray-500">24/7 Dedicated Team</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}