import { Clock, Settings, UserPlus, ShoppingCart, CreditCard, AlertTriangle } from 'lucide-react';
import React, { useMemo } from 'react'

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff/60)} minutes ago`;
  if (diff < 86400) {
    const hours = Math.floor(diff/3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  const days = Math.floor(diff/86400);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
}

export default function ActivityFeed() {
  const activities = useMemo(() => {
    const now = Date.now();
    return [
      {
        id: 1,
        title: 'System Update',
        description: 'Platform updated to v2.4.1 — performance improvements and bug fixes.',
        icon: Settings,
        bg: 'theme-accent',
        color: 'text-white',
        ts: new Date(now - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: 2,
        title: 'New Account',
        description: 'A new user account was created: isaac@example.com',
        icon: UserPlus,
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        color: 'text-[var(--success)]',
        ts: new Date(now - 1000 * 60 * 45).toISOString(),
      },
      {
        id: 3,
        title: 'Order Placed',
        description: 'Order ORD-1008 has been placed by Jane Doe',
        icon: ShoppingCart,
        bg: 'bg-[var(--accent-from)]/10',
        color: 'text-[var(--accent-from)]',
        ts: new Date(now - 1000 * 60 * 20).toISOString(),
      },
      {
        id: 4,
        title: 'Payment Processing',
        description: 'Payment for ORD-1007 is being processed',
        icon: CreditCard,
        bg: 'bg-amber-100 dark:bg-amber-900/20',
        color: 'text-[var(--warning)]',
        ts: new Date(now - 1000 * 60 * 5).toISOString(),
      },
      {
        id: 5,
        title: 'Low Stock Alert',
        description: 'Low stock: AirPods Max (only 3 left).',
        icon: AlertTriangle,
        bg: 'bg-red-100 dark:bg-red-900/20',
        color: 'text-[var(--danger)]',
        ts: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
      },
    ];
  }, []);

  return (
    <div className='theme-card backdrop-blur-xl rounded-2xl theme-border'>
     <div className='p-6 border-b theme-border flex items-start justify-between'>
      <div>
        <h3 className='text-lg font-bold theme-text'>Activity Feed</h3>
        <p className='text-sm theme-muted'>Recent activity updates</p>
      </div>
      <button className='text-[var(--accent-from)] hover:opacity-80 text-sm font-medium'>View All</button>
     </div>

     <div className='p-3 xs:p-4 md:p-6'>
       <ul role='list' className='space-y-2 xs:space-y-3 sm:space-y-4'>
         {activities.map(a => {
           const Icon = a.icon;
           return (
             <li key={a.id} className='group flex items-start space-x-2 xs:space-x-3 sm:space-x-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 p-2 xs:p-3 sm:p-4'>
               <div className={`${a.bg} p-2 xs:p-2.5 sm:p-3 rounded-lg xs:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}> 
                 <Icon className={`w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 ${a.color}`} />
               </div>
               <div className='flex-1 min-w-0'>
                 <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1'>
                   <h4 className='text-sm font-semibold theme-text'>{a.title}</h4>
                   <div className='text-xs theme-muted sm:ml-4 whitespace-nowrap tracking-wide font-medium'>{timeAgo(a.ts)}</div>
                 </div>
                 <p className='text-sm theme-muted leading-relaxed'>{a.description}</p>
               </div>
             </li>
           );
         })}
       </ul>
     </div>
    </div>
  );
}
