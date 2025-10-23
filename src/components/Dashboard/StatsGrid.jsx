import { ArrowDownRight, ArrowUpRight, DollarSign, Eye, ShoppingCart, Users } from 'lucide-react'
import React from 'react'

const stats = [
    {
        title: "Total Revenue",
        value: "$145,231.89",
        change: "+12.5%",
        trend: "up",
        icon: DollarSign,
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
        textColor: "text-emerald-500 dark:text-emerald-400",
        progress: 85,
    },
    {
        title: "Active Users",
        value: "23,456",
        change: "+8.3%",
        trend: "up",
        icon: Users,
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-500 dark:text-blue-400",
        progress: 80,
    },
    {
        title: "Total Orders",
        value: "5,678",
        change: "-2.1%",
        trend: "down",
        icon: ShoppingCart,
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50 dark:bg-purple-900/20",
        textColor: "text-purple-500 dark:text-purple-400",
        progress: 72,
    },
    {
        title: "Page Views",
        value: "1,234,567",
        change: "+15.4%",
        trend: "up",
        icon: Eye,
        color: "from-yellow-500 to-orange-600",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-500 dark:text-yellow-400",
        progress: 90,
    },
]

export default function StatsGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
      {stats.map((stats, index) => {
          return (
          <div className={'relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 '
      + 'border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl '
      + 'hover:shadow-slate-200/50 dark:hover:shadow-slate-900/20 dark:text-white transition-all duration-300 group'} key={index}>
        <div className='flex items-center justify-between'>
            <div className='flex-1'>
                <p className='text-sm font-medium text-slate-600 dark:text-slate-400 mb-2'>
                    {stats.title}
                </p>
                <p className='text-3xl font-bold text-slate-800 dark:text-white mb-4'>
                    {stats.value}
                </p>
                <div className='flex items-center space-x-2'>
                    {stats.trend === "up" ? <ArrowUpRight className='w-4 h-4 text-emerald-500' /> : <ArrowDownRight className='w-4 h-4 text-red-500' />}                   
                    <span className={`text-xl font-semibold ${stats.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>{stats.change}</span>
                    <span className='text-sm text-slate-500 dark:text-slate-400'>
                        vs Last month
                    </span>
                </div>
            </div>
            {/* fixed the issue of icon placed at top-right */}
            <div className={`absolute top-4 right-4 p-3 rounded-xl group-hover:scale-110 transition-all duration-300 ${stats.bgColor}`}>
                {<stats.icon className={`w-6 h-6 ${stats.textColor}`} />}
            </div>
        </div>
           {/* Progressive bar */}
                     <div className='mt-2 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden'>
                <div
                    className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${stats.color}`}
                    style={{ width: `${stats.progress ?? 80}%` }}
                    aria-valuenow={stats.progress ?? 80}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
      </div>
      );
      })}
    </div>
  );
}
