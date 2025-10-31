import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Card, StatsCard, BalanceCard } from './Card';
import Dropdown from './Dropdown';

export default function HomeDashboard() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome John Smith,
        </h1>

        {/* New Payment Card */}
        <div className="bg-gradient-to-br from-cyan-100 via-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:via-cyan-800/20 dark:to-blue-900/20 rounded-2xl p-8 mb-6 shadow-sm border border-cyan-200 dark:border-cyan-800/50 relative overflow-visible min-h-[280px]">
          {/* Large Decorative Triangle - Top Right */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[200px] border-l-transparent border-t-[200px] border-t-white/40 dark:border-t-white/10 pointer-events-none"></div>
          
          {/* Small Decorative Triangle - Bottom Left */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[120px] border-r-transparent border-b-[120px] border-b-white/50 dark:border-b-white/10 pointer-events-none"></div>
          
          {/* Medium Triangle - Top Right (layered) */}
          <div className="absolute top-12 right-8 w-0 h-0 border-l-[100px] border-l-transparent border-t-[100px] border-t-white/30 dark:border-t-white/5 pointer-events-none"></div>
          
          
          <div className="relative z-20 flex flex-col justify-between h-full min-h-[230px]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Initiate New<br />Payment
            </h2>
            
            {/* Dropdown at bottom */}
            <div className="mt-auto">            
              <Dropdown

                buttonLabel="New Payment"
                buttonIcon={Plus}
                options={[
                  {
                    label: "Add an Invoice",
                    onClick: () => console.log("Add an Invoice clicked"),
                  },
                  {
                    label: "Upload Bulk Invoice",
                    onClick: () => console.log("Upload Bulk Invoice clicked"),
                  },
                  {
                    label: "Download Template",
                    onClick: () => console.log("Download Template clicked"),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <BalanceCard 
          balance="$ 1,000,000.00"
          lastUpdated="Now"
          onSwitchAccount={() => console.log('Switch account clicked')}
        />

        <div className="grid grid-cols-2 gap-4">
          <StatsCard 
            title="Information Requested"
            value="15"
          />
          <StatsCard 
            title="Recently Completed"
            value="4"
          />
          <StatsCard 
            title="Upcoming Payments"
            value="12"
          />
          <StatsCard 
            title="Under Review"
            value="5"
          />
        </div>
      </div>
    </div>
  );
}