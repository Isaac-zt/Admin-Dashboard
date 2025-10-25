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
    <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4'>
      {stats.map((stats, index) => {
          return (
          <div className={'relative theme-card backdrop-blur-xl rounded-xl xs:rounded-2xl p-3 xs:p-4 sm:p-5 md:p-6 '
      + 'theme-border hover:shadow-xl transition-all duration-300 group'} key={index}>
        <div className='flex items-start xs:items-center justify-between'>
            <div className='flex-1 min-w-0'>
                <p className='text-xs xs:text-sm font-medium theme-muted mb-1 xs:mb-1.5 sm:mb-2'>
                    {stats.title}
                </p>
                <p className='text-xl xs:text-2xl sm:text-3xl font-bold theme-text mb-2 xs:mb-3 sm:mb-4 truncate'>
                    {stats.value}
                </p>
                <div className='flex flex-wrap items-center gap-1.5 xs:gap-2'>
                    {stats.trend === "up" ? 
                      <ArrowUpRight className='w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-emerald-500' /> : 
                      <ArrowDownRight className='w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-red-500' />
                    }                   
                    <span className={`text-sm xs:text-base sm:text-xl font-semibold ${stats.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                      {stats.change}
                    </span>
                    <span className='text-xs xs:text-sm theme-muted whitespace-nowrap'>
                        vs Last month
                    </span>
                </div>
            </div>
            {/* Icon at top-right with hover effect */}
            <div className={`absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 
              p-2 xs:p-2.5 sm:p-3 rounded-lg xs:rounded-xl 
              group-hover:scale-110 transition-all duration-300 ${stats.bgColor}`}
            >
                {<stats.icon className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 ${stats.textColor}`} />}
            </div>
        </div>
           {/* Progress bar with gradient */}
                     <div className='mt-2 xs:mt-3 h-1.5 xs:h-2 theme-card rounded-full overflow-hidden'>
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
