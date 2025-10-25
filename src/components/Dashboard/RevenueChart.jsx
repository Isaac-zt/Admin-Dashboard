import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="theme-card rounded-lg shadow-lg p-2 xs:p-3 text-xs xs:text-sm">
      <p className="theme-text font-medium mb-0.5 xs:mb-1">{label}</p>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 xs:gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <p className="theme-muted">
            {item.name}: ${item.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function RevenueChart() {
const data = useMemo(() => [
  { month: "Jan", revenue: 45000, expenses: 33000 },
  { month: "Feb", revenue: 52000, expenses: 42000 },
  { month: "Mar", revenue: 61000, expenses: 48000 },
  { month: "Apr", revenue: 70000, expenses: 55000 },
  { month: "May", revenue: 80000, expenses: 60000 },
  { month: "Jun", revenue: 75000, expenses: 58000 },
  { month: "Jul", revenue: 82000, expenses: 62000 },
  { month: "Aug", revenue: 88000, expenses: 64000 },
  { month: "Sep", revenue: 92000, expenses: 68000 },
  { month: "Oct", revenue: 97000, expenses: 72000 },
  { month: "Nov", revenue: 102000, expenses: 75000 },
  { month: "Dec", revenue: 110000, expenses: 80000 }
], []);

  return (
    <div className='theme-card backdrop-blur-xl rounded-2xl theme-border p-3 xs:p-4 sm:p-5 md:p-6'>
        <div className='flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6'>
            <div>
                <h3 className='text-lg xs:text-xl font-bold theme-text'>Revenue Chart</h3>
                <p className='text-xs xs:text-sm theme-muted'>Monthly revenue and expenses</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4'>
                <div className='flex items-center gap-1.5 xs:gap-2'>
                  <div className='w-2.5 h-2.5 xs:w-3 xs:h-3 bg-gradient-to-r from-blue-500 to-purple-600
                  rounded-full'></div>  
                  <div className='text-xs xs:text-sm theme-muted'>
                    <span>Revenue</span>
                  </div>
                </div>
                 <div className='flex items-center gap-1.5 xs:gap-2'>
                  <div className='w-2.5 h-2.5 xs:w-3 xs:h-3 bg-gradient-to-r from-slate-400 to-slate-500
                  rounded-full'></div>  
                  <div className='text-xs xs:text-sm theme-muted'>
                    <span>Expenses</span>
                  </div>
                </div>
            </div>
        </div>

        <div className='h-60 xs:h-72 sm:h-80'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ 
                top: 10, 
                right: 5, 
                left: -15, 
                bottom: 0,
                ...(window.innerWidth >= 640 && { top: 15, right: 20, left: -10 }),
                ...(window.innerWidth >= 768 && { top: 20, right: 30, left: 0 })
              }}
              maxBarSize={window.innerWidth < 640 ? 25 : window.innerWidth < 768 ? 30 : 40}
              throttleDelay={100}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(100, 116, 139, 0.2)"
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                tick={{ 
                  fill: '#6B7280', 
                  fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12 
                }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                interval={window.innerWidth < 640 ? 1 : 0}
              />
              <YAxis 
                tick={{ 
                  fill: '#6B7280',
                  fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12
                }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                tickFormatter={(value) => `$${value / 1000}k`}
                width={window.innerWidth < 640 ? 35 : window.innerWidth < 768 ? 40 : 45}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(30, 41, 59, 0.4)' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#colorRevenue)" 
                radius={[4, 4, 0, 0]}
                animationDuration={750}
                animationBegin={100}
              />
              <Bar 
                dataKey="expenses" 
                fill="url(#colorExpenses)" 
                radius={[4, 4, 0, 0]}
                animationDuration={750}
                animationBegin={200}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.9}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6B7280" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
    </div>
  )
}
