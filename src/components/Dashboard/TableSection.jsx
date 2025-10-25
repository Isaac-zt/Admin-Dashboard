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
  const colors = {
    Delivered: 'bg-emerald-100 dark:bg-emerald-900/25 text-[var(--success)]',
    Pending: 'bg-amber-100 dark:bg-amber-900/25 text-[var(--warning)]',
    'On Hold': 'bg-red-100 dark:bg-red-900/25 text-[var(--danger)]'
  };
  return <span className={`${base} ${colors[status] || colors['On Hold']}`}>{status}</span>;
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
      <div className='theme-card backdrop-blur-xl rounded-2xl theme-border overflow-hidden'>
        <div className='p-6 border-b theme-border'>
         <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-bold theme-text'>Recent Orders</h3>
              <p className='text-sm theme-muted'>Latest Customer orders</p>
            </div>
            <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
             View All
            </button>
         </div>
        </div>

        {/* Top products (dynamic) */}
        <div className='p-3 xs:p-4 md:p-6'>
          <h4 className='text-sm font-semibold theme-text mb-2 xs:mb-3'>Top Products</h4>
          <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6'>
            {topProducts.map((p) => (
              <div key={p.name} className='theme-card p-4 rounded-xl theme-border hover:shadow-lg transition-all duration-300'>
                <div className='flex items-start justify-between space-x-4'>
                  <div className='flex items-start space-x-2 xs:space-x-3 sm:space-x-4'>
                    <div className='w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center theme-accent flex-shrink-0'>
                      <svg className='w-4 h-4 xs:w-5 xs:h-5 text-white' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z' fill='currentColor'/></svg>
                    </div>
                    <div className='flex-1 min-w-0 max-w-full'>
                      <div className='text-sm font-medium theme-text truncate mb-1 max-w-[180px] sm:max-w-[200px] lg:max-w-[160px] xl:max-w-[200px]'>{p.name}</div>
                      <div className='text-xs theme-muted truncate'>{p.units} units sold</div>
                      <div className='text-sm font-semibold theme-text mt-1 truncate'>${p.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='h-2 theme-card rounded-full overflow-hidden'>
                    <div className='h-full theme-accent transition-all duration-300' style={{ width: `${(p.units / maxUnits) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop table (md+) */}
  <div className='hidden md:block overflow-x-auto no-scrollbar'>
          <table className='w-full min-w-[720px]'>
            <thead>
              <tr>
                <th className='text-left p-4 text-sm font-semibold theme-muted'>Order ID</th>
                <th className='text-left p-4 text-sm font-semibold theme-muted'>Product</th>
                <th className='text-left p-4 text-sm font-semibold theme-muted'>Amount</th>
                <th className='text-left p-4 text-sm font-semibold theme-muted'>Status</th>
                <th className='text-left p-4 text-sm font-semibold theme-muted'>Date</th>
                <th className='p-4' />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className='border-b theme-border hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                  <td className='p-4'>
                    <div className='text-sm font-medium theme-text'>{o.id}</div>
                  </td>
                  <td className='p-4'>
                    <div className='text-sm theme-text'>{o.product}</div>
                  </td>
                  <td className='p-4'>
                    <div className='text-sm theme-text'>${o.amount.toFixed(2)}</div>
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
        <div className='md:hidden divide-y theme-border'>
          {orders.map((o) => (
            <div key={o.id} className='p-4 flex items-start justify-between'>
              <div>
                <div className='text-sm font-semibold theme-text'>{o.product}</div>
                <div className='text-xs theme-muted'>{o.id} • {o.date}</div>
              </div>
              <div className='flex flex-col items-end space-y-2'>
                <div className='text-sm font-medium theme-text'>${o.amount.toFixed(2)}</div>
                <StatusBadge status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
