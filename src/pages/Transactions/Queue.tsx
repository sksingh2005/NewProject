import React from "react";
import { EllipsisVerticalIcon } from "lucide-react";
import type { Payment as ProcessPayment } from "./Process";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
  payments: ProcessPayment[];
  onAction: (action: string, paymentId: string) => void;
}

export default function QueueTable({ payments, onAction }: Props) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {payments.map((payment) => (
        <tr
          key={payment.id}
          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
            {payment.payeeName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm">
            <span className="text-gray-600 dark:text-gray-400">
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
          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md"
              >
                <DropdownMenuItem onClick={() => onAction("submit", payment.id)}>
                  Submit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("delete", payment.id)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction("edit", payment.id)}>
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
