'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

const data = [
  { name: 'Direct Services', value: 72, color: '#9333EA', description: 'Shelter, counseling, and support programs' },
  { name: 'Operations', value: 18, color: '#5770 0.0809 283.5720)', description: 'Facility maintenance and administration' },
  { name: 'Outreach', value: 10, color: '#8565 0.0600 229.9378)', description: 'Community education and prevention programs' }
]

const COLORS = ['#9333EA', '#7C3AED', '#A78BFA']

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      name: string
      value: number
      color: string
      description: string
    }
  }>
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <p className="font-semibold text-foreground">{data.name}</p>
        <p className="text-2xl font-bold text-primary">{data.value}%</p>
        <p className="text-sm text-muted-foreground mt-1">{data.description}</p>
      </div>
    )
  }
  return null
}

export default function BudgetBreakdownChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Where Your Money Goes</CardTitle>
        <CardDescription>
          Transparent breakdown of how we use your donations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-start gap-3">
              <div
                className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-lg font-bold text-primary">{item.value}%</p>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full" asChild>
          <a href="/financial-report.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            View Full Financial Report
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
