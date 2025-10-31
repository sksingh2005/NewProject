import React from 'react';
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gradient';
}

interface StatsCardProps {
  title: string;
  value: string | number;
  className?: string;
}

interface BalanceCardProps {
  balance: string;
  lastUpdated: string;
  onSwitchAccount?: () => void;
}

export function Card({ 
  children, 
  variant = 'default',
  className,
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn(
        "rounded-2xl p-6 shadow-sm",
        variant === 'default' 
          ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" 
          : "bg-gradient-to-br from-cyan-100 via-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:via-cyan-800/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatsCard({ title, value, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {title}
      </p>
      <p className="text-4xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </Card>
  );
}

export function BalanceCard({ balance, lastUpdated, onSwitchAccount }: BalanceCardProps) {
  return (
    <Card className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Amount in UBS Savings Bank
        </p>
        <button 
          onClick={onSwitchAccount}
          className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Switch Account
        </button>
      </div>
      
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {balance}
      </p>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Last Updated on: {lastUpdated}
      </p>
    </Card>
  );
}