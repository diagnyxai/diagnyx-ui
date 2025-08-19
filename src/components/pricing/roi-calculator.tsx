'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { DollarSign, TrendingUp, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export function ROICalculator() {
  const [monthlyLLMCost, setMonthlyLLMCost] = useState(10000)
  const [engineerHours, setEngineerHours] = useState(40)
  const [incidentCost, setIncidentCost] = useState(50000)

  const engineerCostPerHour = 150
  const costSavingsPercentage = 85
  const timeReductionPercentage = 70
  const incidentReductionPercentage = 60

  const monthlySavings = (monthlyLLMCost * costSavingsPercentage) / 100
  const engineerSavings = (engineerHours * engineerCostPerHour * timeReductionPercentage) / 100
  const incidentSavings = (incidentCost * incidentReductionPercentage) / 100 / 12 // Monthly average

  const totalMonthlySavings = monthlySavings + engineerSavings + incidentSavings
  const annualSavings = totalMonthlySavings * 12
  const diagnyxCost = 999 // Business plan
  const netAnnualSavings = annualSavings - (diagnyxCost * 12)
  const roi = ((netAnnualSavings / (diagnyxCost * 12)) * 100).toFixed(0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you can save with Diagnyx. Adjust the inputs below to match your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Current Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Monthly LLM API Costs</Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      value={monthlyLLMCost}
                      onChange={(e) => setMonthlyLLMCost(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Current monthly spend on OpenAI, Anthropic, etc.
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium">
                    Engineer Hours on AI Operations (monthly)
                  </Label>
                  <div className="mt-2">
                    <Slider
                      value={[engineerHours]}
                      onValueChange={(value) => setEngineerHours(value[0])}
                      max={200}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>10 hrs</span>
                      <span className="font-medium">{engineerHours} hrs</span>
                      <span>200 hrs</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Time spent debugging, monitoring, and optimizing AI systems
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium">Cost per AI Incident</Label>
                  <div className="mt-2">
                    <Input
                      type="number"
                      value={incidentCost}
                      onChange={(e) => setIncidentCost(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Average cost of downtime, hallucinations, or quality issues
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Your Potential Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {roi}% ROI
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">
                      ${netAnnualSavings.toLocaleString()} saved annually
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                        <div>
                          <div className="font-medium">LLM Cost Reduction</div>
                          <div className="text-sm text-gray-600">85% average savings</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        ${monthlySavings.toLocaleString()}/mo
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-purple-600 mr-2" />
                        <div>
                          <div className="font-medium">Engineering Time</div>
                          <div className="text-sm text-gray-600">70% time reduction</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        ${engineerSavings.toLocaleString()}/mo
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-orange-600 mr-2" />
                        <div>
                          <div className="font-medium">Incident Prevention</div>
                          <div className="text-sm text-gray-600">60% fewer incidents</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        ${incidentSavings.toLocaleString()}/mo
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Total Monthly Savings:</span>
                      <span className="text-lg font-bold text-green-600">
                        ${totalMonthlySavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Diagnyx Cost (Business):</span>
                      <span className="text-lg">
                        ${diagnyxCost}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Net Monthly Benefit:</span>
                      <span className="text-green-600">
                        ${(totalMonthlySavings - diagnyxCost).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" asChild>
                    <a href="/signup?plan=business">
                      Start Your 14-Day Free Trial
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            * Calculations based on average customer savings. Individual results may vary.
          </p>
        </motion.div>
      </div>
    </section>
  )
}