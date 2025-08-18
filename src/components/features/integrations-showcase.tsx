'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink, Code, Plug } from 'lucide-react'
import { motion } from 'framer-motion'

const integrationCategories = [
  {
    title: 'LLM Providers',
    description: 'Monitor and optimize across all major AI providers',
    icon: '🤖',
    items: [
      { name: 'OpenAI', logo: '🔥', models: 'GPT-3.5, GPT-4, GPT-4 Turbo', status: 'Native' },
      { name: 'Anthropic', logo: '🏛️', models: 'Claude, Claude Instant', status: 'Native' },
      { name: 'Google', logo: '🔍', models: 'PaLM, Gemini', status: 'Native' },
      { name: 'AWS Bedrock', logo: '☁️', models: 'Titan, Jurassic-2', status: 'Native' },
      { name: 'Cohere', logo: '💫', models: 'Command, Generate', status: 'Native' },
      { name: 'Hugging Face', logo: '🤗', models: '1000+ Models', status: 'API' }
    ]
  },
  {
    title: 'AI Frameworks',
    description: 'Seamless integration with popular AI development frameworks',
    icon: '🛠️',
    items: [
      { name: 'LangChain', logo: '🦜', description: 'Python & TypeScript', status: 'SDK' },
      { name: 'LlamaIndex', logo: '🦙', description: 'Data-centric AI apps', status: 'SDK' },
      { name: 'Haystack', logo: '🔍', description: 'NLP framework', status: 'Plugin' },
      { name: 'Semantic Kernel', logo: '🧠', description: 'Microsoft AI framework', status: 'SDK' },
      { name: 'AutoGPT', logo: '🤖', description: 'Autonomous AI agents', status: 'Plugin' },
      { name: 'Custom APIs', logo: '⚙️', description: 'REST/GraphQL', status: 'Native' }
    ]
  },
  {
    title: 'Monitoring & DevOps',
    description: 'Integrate with your existing observability stack',
    icon: '📊',
    items: [
      { name: 'OpenTelemetry', logo: '🔭', description: 'Native OTEL support', status: 'Native' },
      { name: 'Prometheus', logo: '📈', description: 'Metrics collection', status: 'Native' },
      { name: 'Grafana', logo: '📊', description: 'Dashboards & alerts', status: 'Plugin' },
      { name: 'DataDog', logo: '🐶', description: 'APM integration', status: 'Native' },
      { name: 'New Relic', logo: '📱', description: 'Performance monitoring', status: 'SDK' },
      { name: 'Splunk', logo: '🔎', description: 'Log analytics', status: 'Forwarder' }
    ]
  },
  {
    title: 'Communication & Alerts',
    description: 'Stay informed with real-time notifications',
    icon: '📢',
    items: [
      { name: 'Slack', logo: '💬', description: 'Team notifications', status: 'Native' },
      { name: 'Microsoft Teams', logo: '👥', description: 'Enterprise chat', status: 'Native' },
      { name: 'Discord', logo: '🎮', description: 'Community alerts', status: 'Webhook' },
      { name: 'PagerDuty', logo: '📟', description: 'Incident management', status: 'Native' },
      { name: 'Email', logo: '📧', description: 'SMTP notifications', status: 'Native' },
      { name: 'SMS', logo: '📱', description: 'Text alerts', status: 'Native' }
    ]
  }
]

const codeExamples = [
  {
    title: 'Python SDK Integration',
    framework: 'LangChain',
    code: `from diagnyx import DiagnyxTracer
from langchain.llms import OpenAI

# Initialize Diagnyx tracing
tracer = DiagnyxTracer(api_key="your-api-key")

# Wrap your LLM with automatic tracing
llm = OpenAI(temperature=0.7)
traced_llm = tracer.trace_llm(llm)

# Use as normal - traces automatically sent to Diagnyx
response = traced_llm("Explain quantum computing")
print(response)`
  },
  {
    title: 'JavaScript SDK Integration',
    framework: 'Node.js',
    code: `import { DiagnyxClient } from '@diagnyx/sdk';

const diagnyx = new DiagnyxClient({
  apiKey: process.env.DIAGNYX_API_KEY,
  endpoint: 'https://api.diagnyx.ai'
});

// Trace OpenAI API calls
const response = await diagnyx.trace('gpt-4', {
  messages: [{ role: 'user', content: 'Hello!' }],
  temperature: 0.7
});

console.log(response.data);`
  },
  {
    title: 'REST API Integration',
    framework: 'cURL',
    code: `curl -X POST https://api.diagnyx.ai/v1/traces \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "trace_id": "trace_123",
    "span_id": "span_456",
    "model": "gpt-4",
    "input": "Hello world",
    "output": "Hello! How can I help?",
    "latency_ms": 1250,
    "token_usage": {
      "prompt_tokens": 2,
      "completion_tokens": 8,
      "total_tokens": 10
    }
  }'`
  }
]

export function IntegrationsShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Plug className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Integrations & Ecosystem
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect Diagnyx to your existing AI stack in minutes. Support for 40+ providers, 
            frameworks, and tools with zero-configuration setup.
          </p>
        </motion.div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {integrationCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.logo}</span>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-600">
                              {'models' in item ? item.models : item.description}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={item.status === 'Native' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Quick Start Examples
              </h3>
            </div>
            <p className="text-lg text-gray-600">
              Get started in under 5 minutes with your preferred language and framework
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {codeExamples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <Badge variant="outline">{example.framework}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Docs
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't See Your Integration?
              </h3>
              <p className="text-blue-100 mb-6">
                We're constantly adding new integrations. Request support for your tools, 
                or build custom integrations with our flexible API.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" className="group">
                  Request Integration
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}