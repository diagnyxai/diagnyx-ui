'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Shield, 
  DollarSign, 
  BarChart3, 
  Zap, 
  Lock,
  AlertTriangle,
  Layers,
  Globe,
  GitBranch,
  Users,
  Gauge
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Brain,
    title: 'Hallucination Detection',
    description: 'Detect AI hallucinations with 99.7% accuracy using semantic entropy and CHECK framework.',
    badge: '99.7% Accuracy',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description: 'Reduce LLM costs by 85% with intelligent model routing and caching strategies.',
    badge: '85% Savings',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Built-in PII detection, audit logging, and compliance tools for GDPR, HIPAA, SOC 2.',
    badge: 'Enterprise Ready',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Monitor every LLM call with OpenTelemetry-native distributed tracing.',
    badge: 'Sub-100ms',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Zap,
    title: 'Intelligent Routing',
    description: 'Automatically route requests to optimal models based on cost, speed, and quality.',
    badge: 'RouteLLM',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: AlertTriangle,
    title: 'Anomaly Detection',
    description: 'ML-powered predictive analytics to prevent failures before they impact users.',
    badge: 'Predictive',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: GitBranch,
    title: 'Prompt Management',
    description: 'Version control, A/B testing, and collaborative editing for your prompts.',
    badge: 'Git-like',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Layers,
    title: 'Multi-Model Support',
    description: 'Support for OpenAI, Anthropic, Google, AWS Bedrock, and 40+ LLM providers.',
    badge: '40+ Models',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Globe,
    title: 'Global Infrastructure',
    description: 'Deploy on AWS, GCP, Azure, or on-premise with full data residency control.',
    badge: 'Multi-Cloud',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Role-based access control, shared dashboards, and team performance metrics.',
    badge: 'RBAC',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Mode',
    description: 'Analyze AI performance without storing sensitive data using privacy-preserving analytics.',
    badge: 'Privacy First',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
  {
    icon: Gauge,
    title: 'SLA Monitoring',
    description: 'Track and enforce SLAs with automated alerting and escalation workflows.',
    badge: '99.95% SLA',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Production AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive observability, optimization, and security features designed for AI teams at scale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {feature.badge}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}