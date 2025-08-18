'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Zap,
  Target,
  Settings,
  Calendar,
  PieChart,
  BarChart3,
  RefreshCw
} from 'lucide-react';

export default function CostsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cost Optimization</h1>
          <p className="text-gray-600 mt-1">Monitor and optimize your LLM spending</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Optimize
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,247</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$21,459</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              85% reduction achieved
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Request</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.0038</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -73% optimization
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,753</div>
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="mr-1 h-3 w-3" />
              67% of monthly budget
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Daily Cost Trend
            </CardTitle>
            <CardDescription>
              Spending over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between bg-gray-50 rounded p-4">
              {/* Mock chart visualization */}
              <div className="flex items-end space-x-1 h-full w-full">
                {Array.from({length: 30}, (_, i) => (
                  <div 
                    key={i}
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${Math.random() * 80 + 20}%`,
                      width: '3%'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Optimization Impact
            </CardTitle>
            <CardDescription>
              Savings breakdown by optimization method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">RouteLLM</Badge>
                    <span className="text-sm">Intelligent model routing</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">$18,234</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Caching</Badge>
                    <span className="text-sm">Response caching</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">$2,847</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '13%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Batching</Badge>
                    <span className="text-sm">Request batching</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">$378</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '2%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Cost by Model
            </CardTitle>
            <CardDescription>
              Spending distribution across different models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <div>
                      <div className="font-medium">GPT-4</div>
                      <div className="text-sm text-gray-500">542K requests</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">$1,847</div>
                  <div className="text-sm text-gray-500">56.9%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <div>
                      <div className="font-medium">Claude Sonnet</div>
                      <div className="text-sm text-gray-500">231K requests</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">$892</div>
                  <div className="text-sm text-gray-500">27.5%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div>
                      <div className="font-medium">Claude Haiku</div>
                      <div className="text-sm text-gray-500">412K requests</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">$347</div>
                  <div className="text-sm text-gray-500">10.7%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <div>
                      <div className="font-medium">Others</div>
                      <div className="text-sm text-gray-500">89K requests</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">$161</div>
                  <div className="text-sm text-gray-500">4.9%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
            <CardDescription>
              Ways to reduce your costs further
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">High Impact</span>
                </div>
                <p className="text-sm text-green-800 mb-2">
                  Enable smart caching for repetitive queries
                </p>
                <p className="text-xs text-green-600">
                  Potential savings: $1,200/month
                </p>
                <Button size="sm" className="mt-2 w-full">
                  Enable Caching
                </Button>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Medium Impact</span>
                </div>
                <p className="text-sm text-blue-800 mb-2">
                  Optimize prompt lengths to reduce token usage
                </p>
                <p className="text-xs text-blue-600">
                  Potential savings: $340/month
                </p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Analyze Prompts
                </Button>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900">Low Impact</span>
                </div>
                <p className="text-sm text-orange-800 mb-2">
                  Set up budget alerts for cost control
                </p>
                <p className="text-xs text-orange-600">
                  Prevents overspend
                </p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  Set Alerts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracking</CardTitle>
          <CardDescription>
            Monthly budget usage and projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$10,000</div>
              <div className="text-sm text-gray-600">Monthly Budget</div>
              <div className="text-xs text-gray-500 mt-1">Set by admin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$3,247</div>
              <div className="text-sm text-gray-600">Spent So Far</div>
              <div className="text-xs text-gray-500 mt-1">32.5% of budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">$9,741</div>
              <div className="text-sm text-gray-600">Projected Total</div>
              <div className="text-xs text-gray-500 mt-1">Based on current usage</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Budget Usage</span>
              <span className="text-sm font-medium">32.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full" style={{width: '32.5%'}}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$10,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}