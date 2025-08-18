'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  Gauge,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'

const featureCategories = [
  {
    title: 'AI Quality & Safety',
    description: 'Ensure your AI outputs are accurate, safe, and reliable',
    color: 'purple',
    features: [
      {
        icon: Brain,
        title: 'Hallucination Detection',
        description: 'Advanced semantic entropy analysis and CHECK framework for 99.7% accuracy in detecting AI hallucinations.',
        badge: '99.7% Accuracy',
        details: [
          'Semantic entropy calculation',
          'CHECK framework verification', 
          'Ensemble voting system',
          'Real-time and batch processing',
          'Custom threshold configuration'
        ]
      },
      {
        icon: Shield,
        title: 'Safety & Compliance',
        description: 'Built-in content filtering, PII detection, and compliance tools for GDPR, HIPAA, and SOC 2.',
        badge: 'Enterprise Ready',
        details: [
          'Automatic PII detection',
          'Content safety filtering',
          'Audit logging & compliance',
          'GDPR, HIPAA, SOC 2 ready',
          'Data residency controls'
        ]
      },
      {
        icon: AlertTriangle,
        title: 'Anomaly Detection',
        description: 'ML-powered predictive analytics to identify and prevent issues before they impact users.',
        badge: 'Predictive',
        details: [
          'Statistical anomaly detection',
          'Performance drift monitoring',
          'Behavioral pattern analysis',
          'Custom alert thresholds',
          'Automated incident escalation'
        ]
      }
    ]
  },
  {
    title: 'Cost Optimization',
    description: 'Dramatically reduce your LLM costs without sacrificing quality',
    color: 'green',
    features: [
      {
        icon: DollarSign,
        title: 'Intelligent Routing',
        description: 'RouteLLM technology automatically selects the most cost-effective model for each request.',
        badge: '85% Savings',
        details: [
          'Cascade routing architecture',
          'Quality-cost optimization',
          'Provider-agnostic routing',
          'Dynamic model selection',
          'Performance tracking'
        ]
      },
      {
        icon: Zap,
        title: 'Smart Caching',
        description: 'Intelligent caching system that reduces redundant API calls while maintaining response quality.',
        badge: 'Sub-10ms',
        details: [
          'Semantic similarity caching',
          'Configurable TTL policies',
          'Cache hit optimization',
          'Context-aware matching',
          'Performance analytics'
        ]
      },
      {
        icon: GitBranch,
        title: 'Prompt Management',
        description: 'Version control, A/B testing, and collaborative editing for your prompts with Git-like workflows.',
        badge: 'Git-like',
        details: [
          'Version control system',
          'A/B testing framework',
          'Collaborative editing',
          'Performance comparison',
          'Rollback capabilities'
        ]
      }
    ]
  },
  {
    title: 'Observability & Analytics',
    description: 'Comprehensive monitoring and insights for your AI systems',
    color: 'blue',
    features: [
      {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        description: 'OpenTelemetry-native distributed tracing with comprehensive metrics and dashboards.',
        badge: 'Sub-100ms',
        details: [
          'OpenTelemetry integration',
          'Distributed tracing',
          'Custom metrics collection',
          'Performance monitoring',
          'Real-time dashboards'
        ]
      },
      {
        icon: Gauge,
        title: 'SLA Monitoring',
        description: 'Track and enforce service level agreements with automated alerting and escalation.',
        badge: '99.95% SLA',
        details: [
          'SLA tracking & enforcement',
          'Uptime monitoring',
          'Performance benchmarks',
          'Automated alerting',
          'Escalation workflows'
        ]
      },
      {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Role-based access control, shared dashboards, and team performance metrics.',
        badge: 'RBAC',
        details: [
          'Role-based access control',
          'Shared team dashboards',
          'Performance analytics',
          'Collaborative workflows',
          'Team activity tracking'
        ]
      }
    ]
  },
  {
    title: 'Enterprise & Security',
    description: 'Enterprise-grade security and deployment options',
    color: 'gray',
    features: [
      {
        icon: Lock,
        title: 'Zero-Knowledge Mode',
        description: 'Analyze AI performance without storing sensitive data using privacy-preserving analytics.',
        badge: 'Privacy First',
        details: [
          'No sensitive data storage',
          'Privacy-preserving analytics',
          'Encrypted processing',
          'Compliance-friendly',
          'Audit trail maintenance'
        ]
      },
      {
        icon: Globe,
        title: 'Global Infrastructure',
        description: 'Deploy on AWS, GCP, Azure, or on-premise with full data residency control.',
        badge: 'Multi-Cloud',
        details: [
          'Multi-cloud deployment',
          'On-premise options',
          'Data residency control',
          'Global edge locations',
          'Disaster recovery'
        ]
      },
      {
        icon: Layers,
        title: 'Multi-Model Support',
        description: 'Support for OpenAI, Anthropic, Google, AWS Bedrock, and 40+ LLM providers.',
        badge: '40+ Models',
        details: [
          'Universal provider support',
          'Unified API interface',
          'Model-agnostic monitoring',
          'Custom model integration',
          'Provider failover'
        ]
      }
    ]
  }
]

const colorClasses = {
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }
}

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {featureCategories.map((category, categoryIndex) => {
          const colorClass = colorClasses[category.color as keyof typeof colorClasses]
          
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <Card className={`h-full hover:shadow-lg transition-shadow ${colorClass.border} border-2`}>
                      <CardHeader>
                        <div className={`inline-flex p-3 rounded-lg ${colorClass.bg} mb-4`}>
                          <feature.icon className={`h-6 w-6 ${colorClass.text}`} />
                        </div>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            {feature.badge}
                          </Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {feature.details.map((detail, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start">
                              <span className={`inline-block w-1.5 h-1.5 rounded-full ${colorClass.bg} mt-2 mr-2 flex-shrink-0`} />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" size="sm" className="w-full group">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}