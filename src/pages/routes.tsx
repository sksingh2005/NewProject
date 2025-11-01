import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import MainLayout from '../components/layout/MainLayout';
import Transactions from './Transactions/Transactions';
import InvoiceForm from './Invoice/Invoice';
import Bank from './Bank Reconcillation/page';
import Reports from './Reports/page';
import Settings from './Settings/page';



// Loader for Suspense fallback
// const PageLoader = () => (
//   <div className="flex items-center justify-center h-full min-h-[400px]">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
//   </div>
// );

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainLayout/>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path='invoice' element={<InvoiceForm />} />
        <Route path='reconcillation' element={<Bank />} />
        <Route path='reports' element={<Reports />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;