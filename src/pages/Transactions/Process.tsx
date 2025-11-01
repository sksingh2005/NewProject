import React from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Payment = {
  id: string;
  payeeName: string;
  status: string;
  initiator: string;
  dueDate: string;
  amount: string;
};

const statusStyles: Record<string, string> = {
  Pending: "text-gray-600 dark:text-gray-400",
  "Due Soon": "text-yellow-600 dark:text-yellow-500",
  Overdue: "text-red-600 dark:text-red-500",
  Completed: "text-green-600 dark:text-green-500",
  completed: "text-green-600 dark:text-green-500",
};

interface Props {
  payments: Payment[];
  onAction: (action: string, paymentId: string) => void;
}

export default function ProcessTable({ payments, onAction }: Props) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {payments.map((payment) => (
        <tr
          key={payment.id}
          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {payment.id}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
            {payment.payeeName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <span
              className={
                statusStyles[payment.status] ||
                "text-gray-600 dark:text-gray-400"
              }
            >
              {payment.status}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {payment.initiator}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {payment.dueDate}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {payment.amount}
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  <MoreVertical size={18} className="text-gray-600 dark:text-gray-300" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <DropdownMenuItem
                  onClick={() => onAction("revoke", payment.id)}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Revoke Payment
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction("notify", payment.id)}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Notify Approver
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onAction("edit", payment.id)}
                  className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Edit Request
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
