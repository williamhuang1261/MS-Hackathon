'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Sector } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { FileText } from 'lucide-react'
import type { PieSectorDataItem } from 'recharts/types/polar/Pie'

type Category = {
  name: string
  value: number
  details: string[]
}

const data: Category[] = [
  { 
    name: 'Direct Services', 
    value: 70, 
    details: [
      'Emergency shelter for women & children',
      'Crisis intervention',
      'Counselling / therapy',
      'Multilingual support',
      'Social worker follow-ups',
      'Safety planning & case management',
    ],
  },
  { 
    name: 'Operations & Administration', 
    value: 18, 
    details: [
      'Staff salaries (admin, finance, HR)',
      'Building costs for shelters and offices',
      'Utilities, transportation, insurance',
      'Volunteer coordination',
      'IT systems',
      'Financial and legal compliance',
    ],
  },
  { 
    name: 'Outreach & Prevention', 
    value: 12, 
    details: [
      'Community awareness campaigns',
      'Educational programs in schools',
      'Training for community leaders',
      'Multilingual awareness material',
      'Partnership building',
      'Prevention & advocacy work',
    ],
  },
]

// Distinguishable violet palette (deep violet, vivid violet, soft lavender)
const COLORS = ['#4B1F66', '#7C3AED', '#C6B1E7']

export default function BudgetBreakdownChart() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const active = React.useMemo(() => data[activeIndex], [activeIndex])

  const onSliceEnter = (_: unknown, index: number) => setActiveIndex(index)

  // Rotate the active category every 3 seconds
  React.useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">What Your Donation Supports</CardTitle>
        <CardDescription>
          Transparent breakdown of how we use your donations to support our mission.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Details panel on the left so it doesn't cover the chart */}
          <div className="w-full md:w-[300px] order-2 md:order-1">
            <div className="rounded-xl border-2 border-athena-violet/20 bg-gradient-to-br from-warm-blush/40 via-lavender-mist/35 to-warm-blush/20 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-athena-violet/80 mb-1">Category</p>
              <p className="text-2xl font-bold text-athena-violet mb-3">{active.name}</p>
              {/* Static bullet list for current category */}
              {Array.isArray(active.details) && (
                <div className="min-h-[56px]">
                  <ul className="space-y-2">
                    {active.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className="mt-2 inline-block h-2 w-2 rounded-full"
                          style={{ backgroundColor: COLORS[activeIndex] }}
                        />
                        <p className="text-sm leading-relaxed text-soft-charcoal">{d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Give the chart an explicit width so ResponsiveContainer can calculate sizes */}
          <div className="w-[340px] md:w-[420px] h-[360px] order-1 md:order-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  strokeWidth={5}
                  onMouseEnter={onSliceEnter}
                  {...({
                    activeIndex,
                    activeShape: ({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                      <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                          {...props}
                          outerRadius={outerRadius + 25}
                          innerRadius={outerRadius + 12}
                        />
                      </g>
                    ),
                  } as any)}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {active.value}%
                            </tspan>
                          </text>
                        )
                      }
                      return null
                    }}
                  />
                </Pie>
                {/* Tooltip removed to prevent overlay on chart; info shown in left panel */}
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-auto space-y-3 order-3">
            {data.map((item, index) => (
              <div
                key={item.name}
                className={`flex items-center gap-3 cursor-pointer select-none px-2 py-1 rounded-md transition
                  ${activeIndex === index ? 'bg-lavender-mist/30 ring-1 ring-athena-violet/30' : 'hover:bg-lavender-mist/20'}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveIndex(index)
                }}
                aria-pressed={activeIndex === index}
                role="button"
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="flex-1 text-center md:text-left">
                  {/* Legend item: name only (no numbers, no subtitles) */}
                  <p className={`font-semibold text-foreground ${activeIndex === index ? 'text-athena-violet' : ''}`}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
