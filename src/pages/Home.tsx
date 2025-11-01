import  { useState } from 'react';

import { WandSparkles, MessageCircle } from 'lucide-react';
import { TableDemo } from '@/components/HomeTable';
import HomeDashboard from '@/components/HomeCards';
import { Button } from '@/components/ui/button'; // ✅ shadcn button
import ChatbotUI from '@/components/Chatbot';

type TableSection = 'action' | 'completed' | 'upcoming';

interface PaymentData {
  id: string;
  payeeName: string;
  dueDate: string;
  amount: string;
}

function Home() {
  const [activeSection, setActiveSection] = useState<TableSection>('action');
  const [isChatOpen, setIsChatOpen] = useState(false); // ✅ chatbot state

  // Dummy payment data
  const actionRequestedData: PaymentData[] = [
    { id: '1', payeeName: 'John Doe', dueDate: '2025-11-01', amount: '$1,200.00' },
    { id: '2', payeeName: 'Jane Smith', dueDate: '2025-11-05', amount: '$850.00' },
  ];

  const recentlyCompletedData: PaymentData[] = [
    { id: '3', payeeName: 'Bob Johnson', dueDate: '2025-11-10', amount: '$2,300.00' },
    { id: '4', payeeName: 'Alice Brown', dueDate: '2025-11-15', amount: '$750.00' },
  ];

  const upcomingPaymentsData: PaymentData[] = [
    { id: '5', payeeName: 'Mike Wilson', dueDate: '2025-12-01', amount: '$1,500.00' },
    { id: '6', payeeName: 'Sarah Davis', dueDate: '2025-12-05', amount: '$900.00' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 p-2 relative">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 max-w-7xl mx-auto mt-2">
        {/* Left Column */}
        <div className="space-y-4">
          <HomeDashboard />
        </div>

        {/* Right Column */}
        <div className="pt-6 w-full">
          {/* Table Navigation */}
          <div className="flex items-center space-x-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'action', label: 'Action Requested' },
              { id: 'completed', label: 'Recently Completed' },
              { id: 'upcoming', label: 'Upcoming Payments' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as TableSection)}
                className={`cursor-pointer px-2 py-2 text-sm font-medium relative transition-colors duration-200 ${
                  activeSection === id
                    ? 'text-black dark:text-white after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-black dark:after:bg-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Active Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 dark:border-gray-700">
            {activeSection === 'action' && <TableDemo payments={actionRequestedData} caption="" />}
            {activeSection === 'completed' && <TableDemo payments={recentlyCompletedData} caption="" />}
            {activeSection === 'upcoming' && <TableDemo payments={upcomingPaymentsData} caption="" />}
          </div>
        </div>
      </div>

      {/* ✨ Floating Chat Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center"
      >
        <WandSparkles className="h-6 w-6" />
      </Button>

      {/* ChatBot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-gray-500/10 backdrop-blur-[1px] transition-opacity duration-300" >
          

          {/* Floating Chat Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
          >
            <MessageCircle size={24} />
          </button>

          {/* Chatbot */}
          <ChatbotUI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default Home;
