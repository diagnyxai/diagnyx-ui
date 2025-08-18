'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Settings,
  RefreshCw,
  Target,
  Shield,
  Search
} from 'lucide-react';

export default function QualityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Quality Assurance</h1>
          <p className="text-gray-600 mt-1">Monitor and ensure the quality of your LLM outputs</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Target className="mr-2 h-4 w-4" />
            Thresholds
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">99.7%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.2% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clean Responses</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              831,429 responses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.3%</div>
            <div className="flex items-center text-xs text-orange-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              11,043 responses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Hallucinations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.5%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              4,228 responses
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detection Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Detection Accuracy
            </CardTitle>
            <CardDescription>
              Performance of different detection methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">CHECK Framework</Badge>
                  </div>
                  <span className="text-sm font-medium">99.7%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '99.7%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Primary detection method</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Semantic Entropy</Badge>
                  </div>
                  <span className="text-sm font-medium">97.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '97.3%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Statistical analysis</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Ensemble Voting</Badge>
                  </div>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '99.9%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Combined approach</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Issue Categories
            </CardTitle>
            <CardDescription>
              Types of quality issues detected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-red-900">Factual Inconsistency</div>
                    <div className="text-sm text-red-700">Contradicts known facts</div>
                  </div>
                </div>
                <Badge variant="destructive">2,847</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-orange-900">Context Deviation</div>
                    <div className="text-sm text-orange-700">Strays from original context</div>
                  </div>
                </div>
                <Badge variant="secondary">1,381</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-yellow-900">Confidence Mismatch</div>
                    <div className="text-sm text-yellow-700">Low confidence with high certainty</div>
                  </div>
                </div>
                <Badge variant="secondary">7,862</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-blue-900">Repetition Issues</div>
                    <div className="text-sm text-blue-700">Excessive repetition detected</div>
                  </div>
                </div>
                <Badge variant="secondary">3,179</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Detections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quality Issues</CardTitle>
          <CardDescription>
            Latest hallucinations and quality problems detected
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">High Risk</Badge>
                  <span className="text-sm text-gray-500">3 minutes ago</span>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                <strong>User:</strong> "What is the capital of Australia?"<br/>
                <strong>AI:</strong> "The capital of Australia is Sydney, which is also its largest city and economic center."
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-red-600">Confidence: 34%</span>
                <span className="text-gray-600">Model: GPT-4</span>
                <span className="text-gray-600">Issue: Factual Inconsistency</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Medium Risk</Badge>
                  <span className="text-sm text-gray-500">12 minutes ago</span>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                <strong>User:</strong> "Explain quantum computing in simple terms."<br/>
                <strong>AI:</strong> "Quantum computing uses quantum mechanics to process information. Unlike classical computers that use bits, quantum computers use quantum bits or qubits. These qubits can exist in multiple states simultaneously through superposition..."
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-orange-600">Confidence: 67%</span>
                <span className="text-gray-600">Model: Claude Sonnet</span>
                <span className="text-gray-600">Issue: Context Deviation</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Low Risk</Badge>
                  <span className="text-sm text-gray-500">24 minutes ago</span>
                </div>
                <Button variant="outline" size="sm">Review</Button>
              </div>
              <div className="bg-gray-50 p-3 rounded text-sm mb-2">
                <strong>User:</strong> "What are the benefits of regular exercise?"<br/>
                <strong>AI:</strong> "Regular exercise has numerous benefits including improved cardiovascular health, increased strength and endurance, better mental health, weight management, and reduced risk of chronic diseases..."
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-yellow-600">Confidence: 89%</span>
                <span className="text-gray-600">Model: GPT-4</span>
                <span className="text-gray-600">Issue: Confidence Mismatch</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}