'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Brain,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Zap,
  Shield
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your LLM applications in real-time</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 24h
          </Button>
          <Button size="sm">
            View Reports
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847,329</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Saved</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,341</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              85% reduction this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.7%</div>
            <div className="flex items-center text-xs text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" />
              Above target
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-orange-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2 from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Request Volume
            </CardTitle>
            <CardDescription>
              Last 24 hours activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Quality Analysis
            </CardTitle>
            <CardDescription>
              Hallucination detection results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Clean Responses</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">98.2%</div>
                  <div className="text-xs text-gray-500">831K requests</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Potential Issues</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">1.3%</div>
                  <div className="text-xs text-gray-500">11K requests</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">Confirmed Hallucinations</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">0.5%</div>
                  <div className="text-xs text-gray-500">4.2K requests</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Performance and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Model Performance
            </CardTitle>
            <CardDescription>
              Response times and success rates by model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">GPT-4</Badge>
                  <div>
                    <div className="font-medium">OpenAI GPT-4</div>
                    <div className="text-sm text-gray-500">Primary model</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">1.2s avg</div>
                  <div className="text-xs text-green-600">99.9% success</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">Claude</Badge>
                  <div>
                    <div className="font-medium">Anthropic Claude</div>
                    <div className="text-sm text-gray-500">Fallback model</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">0.8s avg</div>
                  <div className="text-xs text-green-600">99.8% success</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">Haiku</Badge>
                  <div>
                    <div className="font-medium">Claude Haiku</div>
                    <div className="text-sm text-gray-500">Cost optimizer</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">0.3s avg</div>
                  <div className="text-xs text-green-600">99.5% success</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">High Error Rate</p>
                  <p className="text-xs text-gray-500">Model: GPT-4 • 2 min ago</p>
                  <Badge variant="destructive" className="text-xs mt-1">Critical</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Cost Threshold Exceeded</p>
                  <p className="text-xs text-gray-500">Project: ChatBot • 15 min ago</p>
                  <Badge variant="secondary" className="text-xs mt-1">Warning</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Model Available</p>
                  <p className="text-xs text-gray-500">GPT-4 Turbo • 1 hour ago</p>
                  <Badge variant="secondary" className="text-xs mt-1">Info</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Team Activity
          </CardTitle>
          <CardDescription>
            Recent actions by your team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">John Doe</span> created a new prompt version
                </p>
                <p className="text-xs text-gray-500">v2.1 of "Customer Support Bot" • 5 minutes ago</p>
              </div>
              <Badge variant="secondary">Prompt</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                SM
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Sarah Miller</span> updated alert thresholds
                </p>
                <p className="text-xs text-gray-500">Cost alerts for Production environment • 1 hour ago</p>
              </div>
              <Badge variant="secondary">Config</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                AL
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Alex Liu</span> added new evaluation metric
                </p>
                <p className="text-xs text-gray-500">"Response Relevance" for quality scoring • 2 hours ago</p>
              </div>
              <Badge variant="secondary">Quality</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}