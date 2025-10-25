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
    <div className="theme-card rounded-lg shadow-lg p-2 xs:p-3 theme-border">
      <p className="text-xs xs:text-sm font-semibold theme-text mb-0.5 xs:mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-1.5 xs:gap-2 text-xs xs:text-sm theme-text">
          <span className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full" style={{ background: p.fill }} />
          <span className="truncate max-w-[100px] xs:max-w-none">{p.name}</span>
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
  
  // Responsive font size based on viewport width
  const fontSize = window.innerWidth < 640 ? 10 : 
                  window.innerWidth < 768 ? 12 : 14;
                  
  return (
    <text 
      x={x} 
      y={y} 
      fill="#94A3B8" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central" 
      style={{ fontSize, fontWeight: 600 }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SalesChart() {
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), []);

  return (
    <div className='theme-card backdrop-blur-xl rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 theme-border hover:shadow-xl'>
      <div className='mb-3 xs:mb-4 flex flex-col xs:flex-row items-start gap-2 xs:items-center xs:justify-between'>
        <div>
          <h3 className='text-base xs:text-lg font-bold theme-text'>Sales by category</h3>
          <p className='text-xs xs:text-sm theme-muted'>Production Distribution</p>
        </div>
        <div className='flex xs:flex-col items-baseline xs:items-end gap-1 xs:gap-0'>
          <div className='text-[10px] xs:text-xs theme-muted'>Total</div>
          <div className='text-xs xs:text-sm font-semibold theme-text'>{total.toLocaleString()}</div>
        </div>
      </div>

  <div className='h-56 xs:h-64 sm:h-72 relative'>
        <ResponsiveContainer>
          <PieChart>
            <defs>
              {/* subtle shadow for modern look */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.12" />
              </filter>
            </defs>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={window.innerWidth < 640 ? "35%" : "40%"}
              outerRadius={window.innerWidth < 640 ? "75%" : window.innerWidth < 768 ? "80%" : "85%"}
              paddingAngle={window.innerWidth < 640 ? 4 : 6}
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

            <Tooltip 
              content={<CustomTooltip />} 
              wrapperStyle={{ outline: 'none' }} 
              cursor={{ fill: 'rgba(2,6,23,0.6)' }} 
            />
            <Legend 
              verticalAlign="bottom" 
              height={window.innerWidth < 640 ? 28 : 36} 
              iconType="circle" 
              iconSize={window.innerWidth < 640 ? 8 : 10}
              wrapperStyle={{ 
                textAlign: 'center',
                fontSize: window.innerWidth < 640 ? '10px' : 
                         window.innerWidth < 768 ? '12px' : '14px'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
