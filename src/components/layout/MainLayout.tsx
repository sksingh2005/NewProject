import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // open on desktop, closed on mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // separate state for mobile menu
  const location = useLocation();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      
      // Only adjust sidebar state when transitioning between mobile/desktop
      if (newIsMobile !== isMobile) {
        if (newIsMobile) {
          // Switching to mobile - close desktop sidebar, reset mobile menu
          setIsSidebarOpen(false);
          setIsMobileMenuOpen(false);
        } else {
          // Switching to desktop - open desktop sidebar, close mobile menu
          setIsSidebarOpen(true);
          setIsMobileMenuOpen(false);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Auto-close sidebar on profile page
  useEffect(() => {
    if (location.pathname === '/profile') {
      setIsSidebarOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isMobileMenuOpen) {
        const target = event.target as Element;
        const sidebar = document.querySelector('aside');
        
        // Close if clicking outside the sidebar
        if (sidebar && !sidebar.contains(target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileMenuOpen]);

  const toggleSidebar = () => {
    console.log('Toggle sidebar called', { isMobile, isSidebarOpen, isMobileMenuOpen }); // Debug log
    
    if (isMobile) {
      // On mobile, toggle the mobile menu
      setIsMobileMenuOpen(prev => !prev);
    } else {
      // On desktop, toggle the sidebar
      setIsSidebarOpen(prev => !prev);
    }
  };

  const closeSidebar = () => {
    console.log('Close sidebar called'); // Debug log
    if (isMobile) {
      setIsMobileMenuOpen(false);
    } else {
      setIsSidebarOpen(false);
    }
  };

  // Handle click on main content to close sidebar
  const handleMainContentClick = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const sidebar = document.querySelector('aside');
    
    // Don't close if clicking on sidebar elements
    if (sidebar && sidebar.contains(target)) {
      return;
    }
    
    console.log('Main content clicked', { isMobile, isSidebarOpen, isMobileMenuOpen }); // Debug log
    
    if (isMobile && isMobileMenuOpen) {
      console.log('Closing mobile menu'); // Debug log
      setIsMobileMenuOpen(false);
    } else if (!isMobile && isSidebarOpen) {
      console.log('Closing desktop sidebar'); // Debug log
      setIsSidebarOpen(true);
    }
  };

  // Redirect to login if not authenticated
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0c1427] text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile} 
        isOpen={isMobile ? isMobileMenuOpen : isSidebarOpen} 
        onClose={closeSidebar} 
        onToggle={toggleSidebar}
      />
      
      {/* Main content */}
      <div 
        ref={mainContentRef}
        className="flex-1 flex flex-col overflow-hidden"
        onClick={handleMainContentClick}
      >
        
        <main className="flex-1 overflow-auto p-4 md:p-2 dark:bg-black">
          <div className="container mx-auto max-w-[100vw]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;