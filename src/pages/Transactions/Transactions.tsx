import Dropdown from '@/components/Dropdown';
import { SearchBar } from '@/components/Searchbar';
import { Plus, SlidersHorizontal, Settings } from 'lucide-react';
import  { useState } from 'react';
import ProcessTable, { Payment as ProcessPayment } from './Process';
import QueueTable from './Queue';
import { useNavigate } from 'react-router-dom';

// reuse same enum/styles if needed here or keep strings
enum PaymentStatus {
  PENDING = 'Pending',
  DUE_SOON = 'Due Soon',
  OVERDUE = 'Overdue',
  COMPLETED = 'Completed'
}

function Transactions() {
  const [activeTab, setActiveTab] = useState<'inProgress' | 'inQueue'>('inProgress');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 135;
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Sample data for In Progress
  const inProgressData: ProcessPayment[] = [
    { id: "123", payeeName: "Okta Support", status: PaymentStatus.PENDING, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "124", payeeName: "BSA Motors", status: PaymentStatus.PENDING, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "125", payeeName: "Ekta Hardwares pvt", status: PaymentStatus.PENDING, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "126", payeeName: "J&J Associate", status: PaymentStatus.PENDING, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "127", payeeName: "Macro PLC LLW", status: PaymentStatus.DUE_SOON, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "128", payeeName: "Worx Enterprise", status: PaymentStatus.OVERDUE, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "129", payeeName: "JWS Steel Manufactures", status: PaymentStatus.COMPLETED, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "130", payeeName: "Hotjar", status: PaymentStatus.COMPLETED, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
    { id: "131", payeeName: "Milton pvt ltd", status: PaymentStatus.COMPLETED, initiator: "Kamran Nobari", dueDate: "30 Apr 2025", amount: "$1,000,000" },
  ];

  const inQueueData: ProcessPayment[] = [
    { id: "132", payeeName: "Tech Corp", status: PaymentStatus.PENDING, initiator: "John Doe", dueDate: "05 May 2025", amount: "$500,000" },
    { id: "133", payeeName: "Global Solutions", status: PaymentStatus.PENDING, initiator: "Jane Smith", dueDate: "10 May 2025", amount: "$750,000" },
  ];

  // const currentData = activeTab === 'inProgress' ? inProgressData : inQueueData;

  const handleMenuAction = (action: string, paymentId: string) => {
    console.log(`${action} for payment ${paymentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mr-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>

        <Dropdown
          className="h-11"
          buttonLabel="New Payment"
          buttonIcon={Plus}
          options={[
            { label: "Add an Invoice", onClick: () => {
              navigate('/invoice');
            } },
            { label: "Upload Bulk Invoice", onClick: () => console.log("Upload Bulk Invoice clicked") },
            { label: "Download Template", onClick: () => console.log("Download Template clicked") },
          ]}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('inProgress')}
          className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'inProgress' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
        >
          In Process (9)
          {activeTab === 'inProgress' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />}
        </button>
        <button
          onClick={() => setActiveTab('inQueue')}
          className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'inQueue' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
        >
          In Queue (5)
          {activeTab === 'inQueue' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" />}
        </button>
      </div>
      
      {activeTab === 'inQueue' && (
        <div className="mb-4 flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <span className="text-yellow-600 dark:text-yellow-500 text-xl">⚠️</span>
          <p className="text-sm text-gray-700 dark:text-gray-300 pt-1">
            There are certain entries with incomplete information. please complete them before submitting.
          </p>
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
        <div className="flex min-w-0">
          <SearchBar placeholder="Search" value={search} onChange={(e: any) => setSearch(e.target.value)} />
        </div>
        
        <div className='pb-4'>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors "
          >
            <SlidersHorizontal size={16} />
            <span className="font-semibold">More Filters</span>
          </button>
        </div>
      </div>

      

      {/* Table container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr className="bg-gray-50 dark:bg-gray-800/50">
              {activeTab === 'inProgress' ? (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                ) : (<></>)
              }
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Initiator</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"><Settings size={20} /></th>
              </tr>
            </thead>

            {/* render the sectioned tbody from separate files */}
            {activeTab === 'inProgress' ? (
              <ProcessTable payments={inProgressData} onAction={handleMenuAction} />
            ) : (
              <QueueTable payments={inQueueData} onAction={handleMenuAction} />
            )}
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {itemsPerPage} of {totalItems}
        </div>
      </div>
    </div>
  );
}

export default Transactions;