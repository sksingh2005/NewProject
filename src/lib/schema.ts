import { z } from "zod";

export const paymentFormSchema = z.object({
  payeeName: z.string().min(2, { message: "Payee name is required" }),
  recurringPayment: z.enum(["yes", "no"] as const, { required_error: "Select an option" }),
  paymentType: z.enum(["instant", "scheduled"] as const, { required_error: "Select a payment type" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  amount: z.string().min(1, { message: "Amount is required" }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  currency: z.string().default("INR"),
  description: z.string().min(2, { message: "Description is required" }),
});
export type PaymentFormValues = z.infer<typeof paymentFormSchema>;