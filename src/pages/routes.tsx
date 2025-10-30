import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';




// Loader for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Home/>
        }
      >
        
      </Route>
    </Routes>
  );
};

export default AppRoutes;