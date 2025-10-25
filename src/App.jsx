import React, {useState, useEffect} from 'react'
import SideBar from './components/Layout/SideBar.jsx'
import Header from './components/Layout/Header.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx';
export default function App() {
   
   const [sideBarCollapsed, setSideBarCollapsed] = useState(false);      
   const [currentPage, setCurrentPage] = useState("dashboard");
  
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (err) {
      console.debug && console.debug('read theme failed', err);
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    } catch (err) {
      console.debug && console.debug('theme persist failed', err);
    }
  }, [theme]);

  


  return (
  <div className='min-h-screen theme-bg transition-all duration-500'>
      <div className='flex h-screen overflow-hidden'>
        <SideBar collapsed = {sideBarCollapsed} onToggle={()=> setSideBarCollapsed(!sideBarCollapsed)}
         currentPage={currentPage}
         onPageChange={setCurrentPage}
        />
        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header sideBarCollapsed={sideBarCollapsed} onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)} theme={theme} setTheme={setTheme} />

            <main className='flex-1 overflow-y-auto no-scrollbar bg-transparent'>
              <div className='p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full'>
                {currentPage === "dashboard" && <Dashboard />}
              </div>
            </main>
        </div>
      </div>
    </div>
  );
}
