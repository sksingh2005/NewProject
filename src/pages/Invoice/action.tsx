import { paymentFormSchema } from "@/lib/schema";
import React, { useState } from "react";
import { z } from "zod";

// Define the return type similar to your original server action
interface ContactFormState {
  defaultValues: Record<string, string>;
  success: boolean;
  errors: Record<string, string> | null;
}

export default function ContactForm() {
  const [state, setState] = useState<ContactFormState>({
    defaultValues: { name: "", email: "", message: "" },
    success: false,
    errors: null,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const defaultValues = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      // Validate form fields with Zod schema
      const data = paymentFormSchema.parse(defaultValues);

      // Simulate a slow API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("✅ Submitted data:", data);

      // Reset form and show success message
      setState({
        defaultValues: { name: "", email: "", message: "" },
        success: true,
        errors: null,
      });

      // Optionally reset form inputs in the DOM
      e.currentTarget.reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            (Array.isArray(value) ? value : []).join(", "),
          ])
        );

        setState({
          defaultValues,
          success: false,
          errors,
        });
      } else {
        setState({
          defaultValues,
          success: false,
          errors: null,
        });
      }
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-4 border rounded-xl">
      <input
        name="name"
        placeholder="Name"
        defaultValue={state.defaultValues.name}
        className="border p-2 rounded-md"
      />
      {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        type="email"
        defaultValue={state.defaultValues.email}
        className="border p-2 rounded-md"
      />
      {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}

      <textarea
        name="message"
        placeholder="Message"
        defaultValue={state.defaultValues.message}
        className="border p-2 rounded-md"
      />
      {state.errors?.message && <p className="text-red-500 text-sm">{state.errors.message}</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>

      {state.success && <p className="text-green-600 mt-2">✅ Message sent successfully!</p>}
    </form>
  );
}
