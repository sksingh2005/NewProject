import React from "react";
import Dropdown from '@/components/Dropdown';
import { EllipsisVerticalIcon } from 'lucide-react';
import type { Payment as ProcessPayment } from './Process';

interface Props {
  payments: ProcessPayment[];
  onAction: (action: string, paymentId: string) => void;
}

export default function QueueTable({ payments, onAction }: Props) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {payments.map((payment) => (
        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{payment.payeeName}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className="text-gray-600 dark:text-gray-400">{payment.status}</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.initiator}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.dueDate}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{payment.amount}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            <Dropdown
              className="h-9 p-0"
              buttonIcon={EllipsisVerticalIcon}
              options={[
                { label: 'View Details', onClick: () => onAction('view', payment.id) },
                { label: 'Approve', onClick: () => onAction('approve', payment.id) },
              ]}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}