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

export default function SideBar({ collapsed, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleSubmenu = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className={`${collapsed ? "w-16 xs:w-20" : "w-56 xs:w-64 sm:w-72"} transition-all duration-300 ease-in-out theme-card
    backdrop-blur-xl border-r theme-border flex flex-col h-screen relative z-10`}>
        {/*Logo*/}
        <div className='p-3 xs:p-4 sm:p-6 border-b theme-border'>
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2 xs:space-x-3'}`}>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0'>
                    <Zap className='w-6 h-6 text-white' />
                </div>

                {/* Conditional Rendering */}
                {!collapsed && (
                    <div>
                        <h1 className='text-xl font-bold theme-text'>
                            Elevate
                        </h1>
                        <p className='text-xs theme-muted'>
                            Admin Dashboard
                        </p>
                    </div>
                )}
            </div>
        </div>
        {/* Main content area */}
        <div className='flex-1 flex flex-col'>
            {/*Navigation*/}
            <nav className='flex-1 p-2 xs:p-3 sm:p-4 space-y-1.5 xs:space-y-2 overflow-y-auto no-scrollbar'>
                {menuItems.map((item) => {
                    return (
                    <div key={item.id}>
                        <button 
                          onClick={() => item.submenu && !collapsed ? toggleSubmenu(item.id) : null}
                          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-2 xs:p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                            currentPage === item.id || item.active 
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                              : "hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                         <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
                            <item.icon className={`w-5 h-5 ${currentPage === item.id || item.active ? 'text-white' : 'theme-text'}`} />
                            {!collapsed && (
                              <>
                                <span className='font-medium theme-text'>{item.label}</span>
                                {item.badge && (
                                  <span className='px-2 py-1 text-xs bg-red-500 text-white rounded-full'>{item.badge}</span>
                                )}
                                {item.count && (
                                  <span className='px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-full'>{item.count}</span>
                                )}
                              </>
                            )}
                         </div>

                         {!collapsed && item.submenu && (
                           <ChevronDown 
                             className={`w-4 h-4 transition-transform duration-200 theme-text ${
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
                                     : 'theme-text hover:bg-slate-100 dark:hover:bg-slate-800/50'
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
        <div className='p-2 xs:p-3 sm:p-4 border-t theme-border mt-auto'>
            <div
              className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-2 xs:space-x-3'}
                p-1.5 xs:p-2 rounded-xl theme-card hover:shadow-sm transition-colors cursor-pointer
                flex-row w-full`}>
            
                <img
                  src="user-prof.png"
                  alt="user"
                  className='w-11 h-11 sm:w-8 sm:h-8 rounded-full ring-2 ring-blue-500 object-cover mb-2 sm:mb-0'
                />
                {!collapsed && (
                  <div className='flex-1 min-w-0 text-center sm:text-left'>
                      <p className='text-base sm:text-sm font-medium theme-text truncate'>Isaac Ekaro</p>
                      <p className='text-xs theme-muted truncate'>Administrator</p>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}
