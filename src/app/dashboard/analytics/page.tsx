'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights into your LLM performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Time Range Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Request Volume</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2M</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="mr-1 h-4 w-4" />
              +23.5% vs previous week
            </div>
            <div className="h-20 mt-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded flex items-end justify-between p-2">
              <div className="bg-blue-500 w-2 rounded" style={{height: '40%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '60%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '80%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '65%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '90%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '95%'}}></div>
              <div className="bg-blue-500 w-2 rounded" style={{height: '100%'}}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Response Time</CardTitle>
            <CardDescription>Across all models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">847ms</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingUp className="mr-1 h-4 w-4" />
              +15ms vs previous week
            </div>
            <div className="h-20 mt-4 bg-gradient-to-r from-orange-100 to-orange-200 rounded flex items-end justify-between p-2">
              <div className="bg-orange-500 w-2 rounded" style={{height: '70%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '65%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '80%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '75%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '85%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '90%'}}></div>
              <div className="bg-orange-500 w-2 rounded" style={{height: '95%'}}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate</CardTitle>
            <CardDescription>Non-error responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.2%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="mr-1 h-4 w-4" />
              +0.3% vs previous week
            </div>
            <div className="h-20 mt-4 bg-gradient-to-r from-green-100 to-green-200 rounded flex items-end justify-between p-2">
              <div className="bg-green-500 w-2 rounded" style={{height: '98%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '97%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '99%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '98%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '99%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '100%'}}></div>
              <div className="bg-green-500 w-2 rounded" style={{height: '99%'}}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Request Timeline
            </CardTitle>
            <CardDescription>
              Hourly request volume over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Interactive chart would be displayed here</p>
                <p className="text-sm text-gray-400 mt-1">Showing request patterns and peak usage times</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Usage Distribution</CardTitle>
            <CardDescription>Percentage of requests by model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">GPT-4</span>
                  </div>
                  <span className="text-sm text-gray-600">45.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '45.2%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium">Claude Haiku</span>
                  </div>
                  <span className="text-sm text-gray-600">32.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '32.1%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Claude Sonnet</span>
                  </div>
                  <span className="text-sm text-gray-600">18.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '18.7%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">Others</span>
                  </div>
                  <span className="text-sm text-gray-600">4.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{width: '4%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
            <CardDescription>Most active API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">/api/v1/completions</div>
                  <div className="text-sm text-gray-500">Chat completions</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">542K</div>
                  <Badge variant="secondary" className="text-xs">+12%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">/api/v1/embeddings</div>
                  <div className="text-sm text-gray-500">Text embeddings</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">231K</div>
                  <Badge variant="secondary" className="text-xs">+8%</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">/api/v1/moderations</div>
                  <div className="text-sm text-gray-500">Content moderation</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">89K</div>
                  <Badge variant="secondary" className="text-xs">-2%</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Error Analysis
          </CardTitle>
          <CardDescription>
            Breakdown of errors by type and frequency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">0.8%</div>
              <div className="text-sm text-gray-600">Error Rate</div>
              <div className="text-xs text-gray-500 mt-1">9.6K errors out of 1.2M requests</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">524ms</div>
              <div className="text-sm text-gray-600">Avg Error Response Time</div>
              <div className="text-xs text-gray-500 mt-1">323ms faster than success</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">429</div>
              <div className="text-sm text-gray-600">Most Common Error</div>
              <div className="text-xs text-gray-500 mt-1">Rate limit exceeded</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}