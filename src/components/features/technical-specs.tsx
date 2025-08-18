'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Server, Database, Shield, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const specifications = [
  {
    category: 'Performance & Scale',
    icon: Server,
    color: 'blue',
    specs: [
      { name: 'Event Ingestion Rate', value: '10,000+ requests/second', description: 'Peak throughput for LLM trace collection' },
      { name: 'Query Response Time', value: '<500ms p95', description: 'Analytics dashboard query performance' },
      { name: 'API Latency', value: '<100ms p95', description: 'REST API response times' },
      { name: 'Concurrent Users', value: '1,000+', description: 'Simultaneous dashboard users supported' },
      { name: 'Data Processing', value: '1TB+ daily', description: 'Raw event data processing capacity' },
      { name: 'Uptime SLA', value: '99.95%', description: 'Production service availability' }
    ]
  },
  {
    category: 'Data & Storage',
    icon: Database,
    color: 'green',
    specs: [
      { name: 'Data Retention', value: 'Up to 2 years', description: 'Configurable data retention policies' },
      { name: 'Compression Ratio', value: '10:1 average', description: 'Efficient data storage compression' },
      { name: 'Backup Frequency', value: 'Continuous', description: 'Real-time data replication and backup' },
      { name: 'Recovery Time', value: '<15 minutes', description: 'Point-in-time recovery capability' },
      { name: 'Data Export', value: 'Real-time', description: 'Streaming export to external systems' },
      { name: 'Archive Storage', value: 'Cold tier', description: 'Cost-effective long-term storage' }
    ]
  },
  {
    category: 'Security & Compliance',
    icon: Shield,
    color: 'purple',
    specs: [
      { name: 'Encryption at Rest', value: 'AES-256', description: 'Military-grade encryption for stored data' },
      { name: 'Encryption in Transit', value: 'TLS 1.3', description: 'Latest transport layer security' },
      { name: 'Authentication', value: 'Multi-factor', description: 'TOTP, SMS, and hardware key support' },
      { name: 'Access Control', value: 'RBAC + ABAC', description: 'Role and attribute-based permissions' },
      { name: 'Audit Logging', value: 'Immutable', description: 'Tamper-proof audit trail' },
      { name: 'Certifications', value: 'SOC2, HIPAA, GDPR', description: 'Major compliance frameworks' }
    ]
  },
  {
    category: 'Infrastructure & Deployment',
    icon: Globe,
    color: 'orange',
    specs: [
      { name: 'Cloud Providers', value: 'AWS, GCP, Azure', description: 'Multi-cloud deployment options' },
      { name: 'Regions Available', value: '20+ worldwide', description: 'Global data center presence' },
      { name: 'Deployment Models', value: 'SaaS, Hybrid, On-prem', description: 'Flexible hosting options' },
      { name: 'Container Support', value: 'Docker, Kubernetes', description: 'Cloud-native deployment' },
      { name: 'Auto-scaling', value: 'Kubernetes HPA', description: 'Automatic resource scaling' },
      { name: 'Disaster Recovery', value: 'Multi-region', description: 'Geographic redundancy' }
    ]
  }
]

const integrationSpecs = {
  'LLM Providers': [
    'OpenAI (GPT-3.5, GPT-4, GPT-4 Turbo)',
    'Anthropic (Claude, Claude Instant)',
    'Google (PaLM, Gemini)',
    'AWS Bedrock (Titan, Jurassic)',
    'Cohere (Command, Generate)',
    'Hugging Face (Transformers)',
    'Custom models via API'
  ],
  'Frameworks & SDKs': [
    'LangChain (Python, TypeScript)',
    'LlamaIndex (GPT Index)',
    'Haystack',
    'Semantic Kernel',
    'OpenAI Python/Node SDKs',
    'Native REST API',
    'GraphQL interface'
  ],
  'Monitoring & DevOps': [
    'OpenTelemetry (traces, metrics)',
    'Prometheus metrics',
    'Grafana dashboards',
    'DataDog integration',
    'New Relic connector',
    'Splunk forwarder',
    'Custom webhooks'
  ],
  'Communication': [
    'Slack notifications',
    'Microsoft Teams',
    'Discord webhooks',
    'PagerDuty alerts',
    'Email notifications',
    'SMS alerting',
    'Custom integrations'
  ]
}

const colorClasses = {
  blue: 'text-blue-600 bg-blue-50',
  green: 'text-green-600 bg-green-50',
  purple: 'text-purple-600 bg-purple-50',
  orange: 'text-orange-600 bg-orange-50'
}

export function TechnicalSpecs() {
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
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for enterprise scale with industry-leading performance, security, and reliability
          </p>
        </motion.div>

        {/* Performance Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClasses[spec.color as keyof typeof colorClasses]}`}>
                      <spec.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{spec.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {spec.specs.map((item, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                        </div>
                        <Badge variant="secondary" className="ml-3 font-mono text-xs">
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Integration Ecosystem
            </h3>
            <p className="text-lg text-gray-600">
              Seamlessly integrate with your existing AI and infrastructure stack
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(integrationSpecs).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Performance Guarantees
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600">99.95%</div>
                  <div className="text-sm text-gray-600">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">&lt;500ms</div>
                  <div className="text-sm text-gray-600">Query Response</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Events/Second</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}