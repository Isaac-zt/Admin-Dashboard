import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Electronics', value: 4000, color: '#3b82f6' },
  { name: 'Clothing', value: 3000, color: '#8b5cf6' },
  { name: 'Home & Kitchen', value: 2000, color: '#f43f5e' },
  { name: 'Books', value: 1000, color: '#f59e0b' },
  { name: 'Other', value: 500, color: '#4ade80' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-slate-800 text-slate-100 rounded-lg shadow-lg p-3 border border-slate-700">
      <p className="text-sm font-semibold">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center space-x-2 text-sm text-slate-200">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span>{p.name}</span>
          <span className="font-medium">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RAD);
  const y = cy + radius * Math.sin(-midAngle * RAD);
  return (
    <text x={x} y={y} fill="#94A3B8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 14, fontWeight: 600 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SalesChart() {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), []);

  return (
    <div className='bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl'>
      <div className='mb-4 flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-800 dark:text-white'>Sales by category</h3>
          <p className='text-sm text-slate-500 dark:text-slate-400'>Production Distribution</p>
        </div>
        <div className='text-right'>
          <div className='text-xs text-slate-400'>Total</div>
          <div className='text-sm font-semibold text-slate-800 dark:text-white'>{total.toLocaleString()}</div>
        </div>
      </div>

  <div className='h-72 relative'>
        <ResponsiveContainer>
          <PieChart>
            <defs>
              {/* subtle shadow for modern look */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
              </filter>
            </defs>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="85%"
              paddingAngle={6}
              labelLine={false}
              label={renderLabel}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={2}
                  style={{ filter: 'url(#shadow)' }}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} cursor={{ fill: 'rgba(2,6,23,0.6)' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ textAlign: 'center' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
