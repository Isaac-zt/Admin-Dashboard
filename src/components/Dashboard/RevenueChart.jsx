import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3">
      <p className="text-slate-300 font-medium mb-1">{label}</p>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <p className="text-slate-400">
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
    <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-blur-2xl border border-slate-200/50 dark:border-slate-700/50 p-6'>
        <div className='flex items-center justify-between mb-6'>
            <div>
                <h3 className='text-xl font-bold text-slate-800 dark:text-white'>Revenue Chart</h3>
                <p className='text-sm text-slate-600 dark:text-slate-400'>Monthly revenue and expenses</p>
            </div>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600
                  rounded-full'></div>  
                  <div className='text-sm text-slate-600 dark:text-slate-400'>
                    <span>Revenue</span>
                  </div>
                </div>
                 <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500
                  rounded-full'></div>  
                  <div className='text-sm text-slate-600 dark:text-slate-400'>
                    <span>Expenses</span>
                  </div>
                </div>
            </div>
        </div>

        <div className='h-80'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              maxBarSize={40}
              throttleDelay={100}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(100, 116, 139, 0.2)"
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#475569' }}
                tickLine={{ stroke: '#475569' }}
                tickFormatter={(value) => `$${value / 1000}k`}
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
