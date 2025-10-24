import { MoreHorizontal } from 'lucide-react'
import React, { useMemo } from 'react'

const orders = [
  { id: 'ORD-1001', product: 'Wireless Headphones', amount: 129.99, status: 'Delivered', date: '2025-10-20' },
  { id: 'ORD-1002', product: 'Smartwatch', amount: 199.0, status: 'Pending', date: '2025-10-21' },
  { id: 'ORD-1003', product: 'Gaming Chair', amount: 349.5, status: 'On Hold', date: '2025-10-22' },
  { id: 'ORD-1004', product: '4K Monitor', amount: 429.99, status: 'Delivered', date: '2025-10-22' },
  { id: 'ORD-1005', product: 'Mechanical Keyboard', amount: 89.0, status: 'Pending', date: '2025-10-23' },
  { id: 'ORD-1006', product: 'USB-C Hub', amount: 49.99, status: 'Delivered', date: '2025-10-24' },
  { id: 'ORD-1007', product: 'Desk Lamp', amount: 29.99, status: 'On Hold', date: '2025-10-24' },
];

function StatusBadge({ status }) {
  const base = 'inline-block text-xs px-3 py-1 rounded-full font-medium';
  if (status === 'Delivered') return <span className={`${base} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/25 dark:text-emerald-300`}>Delivered</span>;
  if (status === 'Pending') return <span className={`${base} bg-amber-100 text-amber-700 dark:bg-amber-900/25 dark:text-amber-300`}>Pending</span>;
  return <span className={`${base} bg-red-100 text-red-700 dark:bg-red-900/25 dark:text-red-300`}>On Hold</span>;
}

export default function TableSection() {
  const topProducts = useMemo(() => {
    const map = {};
    orders.forEach(o => {
      if (!map[o.product]) map[o.product] = { name: o.product, units: 0, revenue: 0 };
      map[o.product].units += 1;
      map[o.product].revenue += o.amount;
    });
    return Object.values(map).sort((a,b) => b.units - a.units).slice(0,4);
  }, []);

  const maxUnits = topProducts.length ? Math.max(...topProducts.map(p => p.units)) : 1;

  return (
    <div className='space-y-6'>
      {/* Recent orders */}
      <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden'>
        <div className='p-6 border-b border-slate-200/50 dark:border-slate-700/50'>
         <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-bold text-slate-800 dark:text-white'>Recent Orders</h3>
              <p className='text-sm text-slate-500 dark:text-slate-400'>Latest Customer orders</p>
            </div>
            <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
             View All
            </button>
         </div>
        </div>

        {/* Top products (dynamic) */}
        <div className='p-4 md:p-6'>
          <h4 className='text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3'>Top Products</h4>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {topProducts.map((p) => (
              <div key={p.name} className='bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100/50 dark:border-slate-700/50'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600'>
                      <svg className='w-5 h-5 text-slate-700 dark:text-slate-100' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z' fill='currentColor'/></svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium text-slate-800 dark:text-white'>{p.name}</div>
                      <div className='text-xs text-slate-500 dark:text-slate-400'>{p.units} sold</div>
                    </div>
                  </div>
                  <div className='text-sm font-semibold text-slate-800 dark:text-white'>${p.revenue.toFixed(2)}</div>
                </div>
                <div className='mt-3'>
                  <div className='h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden'>
                    <div className='h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all' style={{ width: `${(p.units / maxUnits) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop table (md+) */}
        <div className='hidden md:block overflow-x-auto'>
          <table className='w-full min-w-[720px]'>
            <thead>
              <tr>
                <th className='text-left p-4 text-sm font-semibold text-slate-500'>Order ID</th>
                <th className='text-left p-4 text-sm font-semibold text-slate-500'>Product</th>
                <th className='text-left p-4 text-sm font-semibold text-slate-500'>Amount</th>
                <th className='text-left p-4 text-sm font-semibold text-slate-500'>Status</th>
                <th className='text-left p-4 text-sm font-semibold text-slate-500'>Date</th>
                <th className='p-4' />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className='border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                  <td className='p-4'>
                    <div className='text-sm font-medium text-slate-900 dark:text-white'>{o.id}</div>
                  </td>
                  <td className='p-4'>
                    <div className='text-sm text-slate-700 dark:text-slate-200'>{o.product}</div>
                  </td>
                  <td className='p-4'>
                    <div className='text-sm text-slate-700 dark:text-slate-200'>${o.amount.toFixed(2)}</div>
                  </td>
                  <td className='p-4'>
                    <StatusBadge status={o.status} />
                  </td>
                  <td className='p-4'>
                    <div className='text-sm text-slate-500 dark:text-slate-400'>{o.date}</div>
                  </td>
                  <td className='p-4'>
                    <MoreHorizontal className='w-4 h-4 text-slate-400' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className='md:hidden divide-y divide-slate-200/50 dark:divide-slate-700/50'>
          {orders.map((o) => (
            <div key={o.id} className='p-4 flex items-start justify-between'>
              <div>
                <div className='text-sm font-semibold text-slate-900 dark:text-white'>{o.product}</div>
                <div className='text-xs text-slate-500 dark:text-slate-400'>{o.id} • {o.date}</div>
              </div>
              <div className='flex flex-col items-end space-y-2'>
                <div className='text-sm font-medium text-slate-700 dark:text-slate-200'>${o.amount.toFixed(2)}</div>
                <StatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
