import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Users, Settings, FileText, HelpCircle, Menu, X, ChevronDown, ChevronRight, Wallet } from 'lucide-react';
import { Route } from '../../types/index';
import { useAuth } from '../../utils/auth';

const routes: Route[] = [
  { path: "/home", label: "Home", icon: "Home" },
  { path: "/transactions", label: "Transactions", icon: "Wallet" },
  { path: "/reports", label: "Reports", icon: "FileText" },
  { path: "/reconcillation", label: "Bank Reconcillation", icon: "Search" },
  { path: "/settings", label: "Settings", icon: "PlusSquare" },
];

const iconComponents = {
  Home,
  Wallet,
  Search,
  PlusSquare,
  Users,
  Settings,
  FileText,
  HelpCircle,
};

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const { role } = useAuth();
  const location = useLocation();
  const isAdmin = role && role.toLowerCase() === 'admin';
  
  // Filter routes based on user role
  const filteredRoutes = routes.filter(route => {
    if (route.path === '/admin') {
      return isAdmin;
    }
    return true;
  });

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Check if current path matches a route or its children
  const isActiveRoute = (route: any) => {
    if (route.path && location.pathname === route.path) {
      return true;
    }
    if (route.children) {
      return route.children.some((child: any) => location.pathname === child.path);
    }
    return false;
  };

  // Check if current path matches a child item
  const isActiveChild = (childPath: string) => {
    return location.pathname === childPath;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:relative top-0 h-screen bg-[#0c1427] dark:bg-[#0c1427] shadow-lg z-30 transition-all duration-300 ease-in-out overflow-x-hidden
                    ${isMobile 
                      ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64` 
                      : isOpen 
                        ? 'w-70' 
                        : 'w-[72px]'}`}
        style={{ 
          minWidth: isMobile ? '256px' : isOpen ? '240px' : '72px',
          left: isMobile ? 0 : undefined
        }}
      >
        <div className="flex flex-col h-screen p-2 overflow-hidden">
          {/* Logo and toggle button */}
          <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <span className={`font-bold text-2xl ml-2 ${(isMobile || isOpen) ? 'block' : 'hidden'}`}>
                <div>
                  <img src="/Electronics Logo 2024.jpg" className='h-[52px] hidden dark:block' alt="" />
                  <img src="/image.png" className='h-[52px] dark:hidden' alt="" />
                </div>
              </span>
            </div>
            
            {isMobile ? (
              <button 
                onClick={onClose} 
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={24} />
              </button>
            ) : (
              <button 
                onClick={onToggle} 
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <ul className="text-sm p-1 space-y-1">
              {filteredRoutes.map((route) => {
                const IconComponent = route.icon ? iconComponents[route.icon as keyof typeof iconComponents] : Home;
                const isActive = isActiveRoute(route);
                
                return (
                  <li key={route.path} className="relative">
                    {/* Blue accent stick for active routes */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>
                    )}
                    
                    {route.children ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(route.label)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-150 relative
                            ${isActive 
                              ? 'text-blue-500 font-medium' 
                              : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                          <div className="flex items-center">
                            <IconComponent className="h-5 w-5" />
                            {(isMobile || isOpen) && (
                              <span className="ml-3 font-medium">{route.label}</span>
                            )}
                          </div>
                          
                          {/* Dots for items with children */}
                          {!isMobile && !isOpen && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                          )}
                          
                          {(isMobile || isOpen) && (
                            expandedItems[route.label] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                          )}
                        </button>
                        
                        {(isMobile || isOpen) && expandedItems[route.label] && (
                          <ul className="ml-8 mt-1 space-y-1">
                            {route.children.map((child: any) => {
                              const isChildActive = isActiveChild(child.path);
                              return (
                                <li key={child.path} className="relative">
                                  <NavLink
                                    to={child.path}
                                    className={`flex items-center p-2 pl-6 rounded-lg transition-colors duration-150 relative
                                      ${isChildActive 
                                        ? 'text-blue-500 font-medium' 
                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isMobile) {
                                        onClose();
                                      }
                                    }}
                                  >
                                    {/* Blue dot for active child items */}
                                    <div className={`absolute left-3 w-2 h-2 rounded-full ${isChildActive ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                    <span className="ml-2">{child.label}</span>
                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        
                        {!isMobile && !isOpen && (
                          <span className="absolute left-20 ml-2 bg-gray-900 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                            {route.label}
                          </span>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={route.path}
                        className={`flex items-center p-3 rounded-lg transition-colors duration-150 group relative
                          ${isActive 
                            ? 'text-blue-500 font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isMobile) {
                            onClose();
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5" />
                          {(isMobile || isOpen) && (
                            <span className="ml-3 font-medium">{route.label}</span>
                          )}
                        </div>
                        
                        {!isMobile && !isOpen && (
                          <span className="absolute left-20 ml-2 bg-gray-900 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                            {route.label}
                          </span>
                        )}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;