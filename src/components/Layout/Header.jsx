import { Filter, Menu, Plus, Search, Settings, Sun, Moon, Bell, ChevronDown, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'

export default function Header({ sideBarCollapsed, onToggleSidebar, theme, setTheme }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileSearchRef = useRef(null);

  // close mobile search when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (showMobileSearch && mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setShowMobileSearch(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [showMobileSearch]);
  return (
  <div className='relative theme-bg backdrop-blur-xl border-b theme-border px-2 xs:px-3 sm:px-4 md:px-6 py-1.5 xs:py-2 sm:py-3 md:py-4'>
      <div className='flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-3 md:gap-4'>
        {/*left section */}
        <div className='flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4'>
          <button 
            className='p-1 xs:p-1.5 sm:p-2 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200 hidden sm:block' 
            onClick={onToggleSidebar}
          >
            <Menu className='w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 theme-text' />
          </button>

          <div className={`${!sideBarCollapsed ? 'hidden md:block' : 'hidden'}`}>
            <h1 className='text-xl sm:text-2xl font-black theme-text'>Dashboard</h1>
            <p className='text-xs sm:text-sm theme-muted'>Welcome back, Isaac!</p>
          </div>
        </div>

        {/*Center*/}
        <div className='flex-1 max-w-[160px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-1 xs:mx-2 sm:mx-4 md:mx-6 lg:mx-8'>
          <div className='relative group border theme-border hover:border-slate-400 dark:hover:border-slate-500 rounded-xl theme-card shadow-sm transition-all duration-200'>
            <Search className='w-3 h-3 xs:w-4 xs:h-4 absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 theme-muted hidden sm:block 
              transition-opacity duration-200 group-hover:text-[var(--accent-from)]' />
            <input 
              type="text" 
              placeholder='Search Anything' 
              className='hidden sm:block w-full pl-10 pr-12 py-2 sm:py-2.5 bg-transparent rounded-xl theme-text placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 ease-in-out text-sm backdrop-blur-xl hover:shadow-md'
            />
            <button 
              className='absolute top-1/2 right-2 transform -translate-y-1/2 p-1.5 
                theme-muted hover:text-[var(--accent-from)] transition-colors duration-200 hidden sm:block'
            >
              <Filter className='w-3.5 h-3.5 sm:w-4 sm:h-4'/>
            </button>
          </div>
        </div>

        {/*RIGHT*/}
        <div className='flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3'>
          {/*Mobile menu button*/}
          <button 
            onClick={onToggleSidebar}
            className='sm:hidden p-1 xs:p-1.5 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200'
          >
            <Menu className='w-3 h-3 xs:w-4 xs:h-4 theme-text' />
          </button>
          {/*Quick action*/}
          <button className='hidden lg:flex items-center space-x-1.5 xs:space-x-2 py-1.5 xs:py-2 px-3 xs:px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all text-xs xs:text-sm'>
              <Plus className='w-4 h-4' />
              <span className='text-sm font-medium'>New</span>
          </button>
          {/*Mobile search button*/}
          <button 
            onClick={() => setShowMobileSearch(s => !s)} 
            className='sm:hidden p-1.5 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200'
          >
            {showMobileSearch ? 
              <X className='w-4 h-4 theme-text' /> : 
              <Search className='w-4 h-4 theme-text' />
            }
          </button>

          {/*TOGGLE theme*/}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            aria-pressed={theme === 'dark'}
            aria-label='Toggle theme'
            className='p-1.5 sm:p-2 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200'
          >
            {theme === 'dark' ? 
              <Sun className='w-4 h-4 sm:w-5 sm:h-5 theme-text' /> : 
              <Moon className='w-4 h-4 sm:w-5 sm:h-5 theme-text' />
            }
          </button>

          {/*Notification*/}
          <button className='relative p-1.5 sm:p-2 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200'>
            <Bell className='w-4 h-4 sm:w-5 sm:h-5 theme-text' />
            <span className='absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs 
              rounded-full flex items-center justify-center font-medium'>3</span>
          </button>

          {/*SETTINGS*/}
          <button className='relative p-1.5 sm:p-2 rounded-lg theme-card theme-border hover:shadow-lg transition-all duration-200'>
            <Settings className='w-4 h-4 sm:w-5 sm:h-5 theme-text' />
          </button>

           {/*User Profile*/}
           <div className='flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700'>
            <img src="user-prof.png" alt="User" className='w-8 h-8 rounded-full ring-2 ring-blue-500' />
            <div className='hidden md:block'>
              <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>Isaac Ekaro</p>
              <p className='text-xs text-slate-500 dark:text-slate-400'>Administrator</p>
            </div>
            <ChevronDown className='w-4 h-4 text-slate-400' />
          </div> 
        </div>
      </div>
      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className='fixed inset-x-0 top-[57px] p-4 z-50 animate-fadeIn' ref={mobileSearchRef}>
          <div className='max-w-lg mx-auto'>
            <div className='flex items-center gap-2 theme-card theme-border rounded-xl p-2 
              shadow-lg backdrop-blur-xl'>
              <Search className='w-4 h-4 theme-muted ml-2' />
              <input 
                autoFocus 
                type='text' 
                placeholder='Search Anything' 
                className='w-full bg-transparent outline-none theme-text placeholder-[var(--muted)] 
                  text-sm py-1.5 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400'
              />
              <button 
                onClick={() => setShowMobileSearch(false)} 
                className='p-1.5 rounded-lg theme-card hover:shadow-md transition-all duration-200'
              >
                <X className='w-4 h-4 theme-text' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
