import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Payment {
  id: string;
  payeeName: string;
  dueDate: string;
  amount: string;
}

interface TableDemoProps {
  payments: Payment[];
  caption?: string;
}

export function TableDemo({ payments, caption = "Payment Schedule" }: TableDemoProps) {
  // Calculate total amount
  const total = payments.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount.replace('$', ''));
    return sum + amount;
  }, 0);

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-gray-600">Payee Name</TableHead>
          <TableHead className="text-gray-600">Due Date</TableHead>
          <TableHead className="text-right text-gray-600">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.payeeName}</TableCell>
            <TableCell className="text-gray-500">{payment.dueDate}</TableCell>
            <TableCell className="text-right text-gray-500">{payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${total.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
