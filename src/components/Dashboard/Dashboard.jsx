import React from 'react'
import StatsGrid from './statsGrid'
import ChartSection from './ChartSection'

export default function Dashboard() {
  return (
    <div className='space-y-6'>
      {/* STATS GRID */}
      <StatsGrid />

      <ChartSection />
    </div>
  )
}
