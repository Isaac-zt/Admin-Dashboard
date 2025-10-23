import {BarChart3, Calendar, ChevronDown, CreditCard, FileText, LayoutDashboard, MessageSquare, Package, Settings, ShoppingBag, Users, Zap } from 'lucide-react';
import React, { useState } from 'react'

const menuItems = [
    {
        id: "Dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        active: true,
        badge: "New",
    },
    {
        id: "analytics",
        icon: BarChart3,
        label: "Analytics",
        submenu: [
            { id: "overview", label: "Overview" },
            { id: "reports", label: "Reports" },
            { id: "insights", label: "Insights" },
        ],
    },
    {
        id: "users",
        icon: Users,
        label: "Users",
        count: "2.4k",
        submenu: [
            {id: "all-users", label: "All Users" },
            {id: "roles", label: "Roles & Permissions" },
            {id: "activity", label: "User Activity" },
        ],
    },
    {
        id: "ecommerce",
        icon: ShoppingBag,
        label: "E-Commerce",
        submenu: [
            { id: "products", label: "Products" },
            { id: "orders", label: "Orders" },
            { id: "customers", label: "Customers" },
        ],
    },
    {
        id: "inventory",
        icon: Package,
        label: "Inventory",
        count: "847",
    },
    {
        id: "transactions",
        icon: CreditCard,
        label: "Transactions",
    },
    {
        id: "messages",
        icon: MessageSquare,
        label: "Messages",
        badge: "12",
    },
    {
        id: "calendar",
        icon: Calendar,
        label: "Calendar",
    },
    {
        id: "reports",
        icon: FileText,
        label: "Reports",
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
    },
];

export default function SideBar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleSubmenu = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
    backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col h-screen relative z-10`}>
        {/*Logo*/}
        <div className='p-6 border-b border-slate-200/50 dark:border-slate-700/50'>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0'>
                    <Zap className='w-6 h-6 text-white' />
                </div>

                {/* Conditional Rendering */}
                {!collapsed && (
                    <div>
                        <h1 className='text-xl font-bold text-slate-800 dark:text-white'>
                            Elevate
                        </h1>
                        <p className='text-xs text-slate-500 dark:text-slate-400'>
                            Admin Dashboard
                        </p>
                    </div>
                )}
            </div>
        </div>
        {/* Main content area */}
        <div className='flex-1 flex flex-col'>
            {/*Navigation*/}
            <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
                {menuItems.map((item) => {
                    return (
                    <div key={item.id}>
                        <button 
                          onClick={() => item.submenu && !collapsed ? toggleSubmenu(item.id) : null}
                          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                            currentPage === item.id || item.active 
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                         <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                            <item.icon className={`w-5 h-5 ${currentPage === item.id || item.active ? 'text-white' : 'dark:text-white'}`} />
                            {!collapsed && (
                              <>
                                <span className='font-medium dark:text-white'>{item.label}</span>
                                {item.badge && (
                                  <span className='px-2 py-1 text-xs bg-red-500 dark:text-white rounded-full'>{item.badge}</span>
                                )}
                                {item.count && (
                                  <span className='px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full'>{item.count}</span>
                                )}
                              </>
                            )}
                         </div>

                         {!collapsed && item.submenu && (
                           <ChevronDown 
                             className={`w-4 h-4 transition-transform duration-200 dark:text-white ${
                               expandedItems[item.id] ? 'transform rotate-180' : ''
                             }`}
                           />
                         )}
                        </button>

                         {/* Sub Menus */}
                         {!collapsed && item.submenu && (
                           <div className={`ml-8 mt-2 space-y-1 overflow-hidden transition-all duration-200 ${
                             expandedItems[item.id] ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                           }`}>
                             {item.submenu.map((subitem) => (
                               <button
                                 key={subitem.id}
                                 onClick={() => onPageChange && onPageChange(subitem.id)}
                                 className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors duration-200 cursor-pointer ${
                                   currentPage === subitem.id
                                     ? 'text-blue-500 bg-blue-50 dark:bg-slate-800'
                                     : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                 }`}
                               >
                                 {subitem.label}
                               </button>
                             ))}
                           </div>
                         )} 
                    </div>
                    );
                })}
            </nav>
        </div>

        {/*user profile */}
        <div className='p-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-auto'>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-xl bg-slate-50
            dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer`}>
                <img src="user-prof.png" alt="user" className='w-10 h-10 rounded-full ring-2 ring-blue-500' />
                {!collapsed && (
                  <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-slate-800 dark:text-white truncate'>Isaac Ekaro</p>
                      <p className='text-xs text-slate-500 dark:text-slate-400 truncate'>Administrator</p>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}
