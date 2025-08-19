'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const detailedFeatures = [
  {
    title: 'Hallucination Detection Pipeline',
    subtitle: 'Advanced AI Quality Assurance',
    badge: 'Core Feature',
    icon: Shield,
    description: 'Our hallucination detection system combines multiple advanced techniques to achieve industry-leading accuracy.',
    image: '/images/hallucination-detection.jpg',
    stats: [
      { label: 'Detection Accuracy', value: '99.7%' },
      { label: 'False Positive Rate', value: '<0.5%' },
      { label: 'Processing Latency', value: '<200ms' }
    ],
    keyPoints: [
      'Semantic entropy calculation for uncertainty measurement',
      'CHECK framework for factual verification',
      'Ensemble voting across multiple detection models',
      'Real-time and batch processing capabilities',
      'Custom threshold configuration per use case',
      'Integration with external knowledge bases'
    ],
    technicalDetails: 'Our system uses a multi-layered approach combining semantic entropy analysis, factual consistency checking, and ensemble voting. The CHECK framework validates claims against authoritative sources while semantic entropy measures model uncertainty in responses.',
    reverse: false
  },
  {
    title: 'RouteLLM Cost Optimization',
    subtitle: 'Intelligent Model Selection',
    badge: 'Cost Savings',
    icon: TrendingUp,
    description: 'Automatically route requests to the most cost-effective model that meets your quality requirements.',
    image: '/images/cost-optimization.jpg',
    stats: [
      { label: 'Average Savings', value: '85%' },
      { label: 'Routing Decision Time', value: '<5ms' },
      { label: 'Quality Maintenance', value: '98%+' }
    ],
    keyPoints: [
      'Cascade architecture from cost-effective to premium models',
      'Quality-based routing with confidence thresholds',
      'Provider-agnostic implementation',
      'Dynamic model selection based on request complexity',
      'Continuous performance monitoring and optimization',
      'Custom routing rules and policies'
    ],
    technicalDetails: 'RouteLLM implements a cascade routing strategy where requests are first sent to cost-effective models. If the response quality doesn\'t meet thresholds, requests are automatically routed to more capable models, optimizing the cost-quality trade-off.',
    reverse: true
  },
  {
    title: 'Real-time Analytics Engine',
    subtitle: 'OpenTelemetry-Native Monitoring',
    badge: 'Performance',
    icon: Zap,
    description: 'Comprehensive observability with distributed tracing, metrics collection, and real-time dashboards.',
    image: '/images/analytics-dashboard.jpg',
    stats: [
      { label: 'Ingestion Rate', value: '10K+ req/sec' },
      { label: 'Query Response', value: '<500ms' },
      { label: 'Data Retention', value: '90+ days' }
    ],
    keyPoints: [
      'OpenTelemetry standard compliance for vendor neutrality',
      'Distributed tracing across your entire AI stack',
      'Custom metrics and KPI tracking',
      'Real-time alerting and notification system',
      'Advanced querying and filtering capabilities',
      'Export to popular monitoring platforms'
    ],
    technicalDetails: 'Built on OpenTelemetry standards, our analytics engine provides vendor-neutral observability. It captures detailed traces across your AI pipeline, from initial request to final response, enabling deep performance analysis and troubleshooting.',
    reverse: false
  }
]

export function FeatureDetails() {
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
            Deep Dive into Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand how our advanced features work under the hood and the value they deliver
          </p>
        </motion.div>

        <div className="space-y-20">
          {detailedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${feature.reverse ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={feature.reverse ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex p-2 rounded-lg bg-blue-100">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <Badge variant="outline">{feature.badge}</Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {feature.stats.map((stat, i) => (
                      <div key={i} className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Key Points */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities:</h4>
                    <ul className="space-y-2">
                      {feature.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Details */}
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Technical Implementation:</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {feature.technicalDetails}
                      </p>
                    </CardContent>
                  </Card>

                  <Button className="group">
                    Learn More About This Feature
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Image */}
                <div className={feature.reverse ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl" />
                    {/* Professional feature mockup placeholder */}
                    <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-500 mb-2">{feature.title}</div>
                        <div className="text-sm text-gray-400">Professional screenshot placeholder</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                        View Interactive Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}