import * as React from "react"
import { useState } from "react"
import { z } from "zod"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { contactFormSchema } from "@/lib/schema"

// Define the form state type
interface ContactFormState {
  defaultValues: {
    name: string
    email: string
    message: string
  }
  success: boolean
  errors: Record<string, string> | null
}

export function ContactForm({ className }: React.ComponentProps<typeof Card>) {
  const [state, setState] = useState<ContactFormState>({
    defaultValues: { name: "", email: "", message: "" },
    success: false,
    errors: null,
  })

  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)

    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries()) as Record<string, string>

    try {
      // ✅ Validate input
      const data = contactFormSchema.parse(values)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("✅ Submitted:", data)

      // Reset form + success state
      setState({
        defaultValues: { name: "", email: "", message: "" },
        success: true,
        errors: null,
      })

      e.currentTarget.reset()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
            key,
            value?.join(", "),
          ])
        )

        setState((prev) => ({
          ...prev,
          success: false,
          errors,
        }))
      } else {
        setState((prev) => ({ ...prev, success: false, errors: null }))
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>How can we help?</CardTitle>
        <CardDescription>Need help with your project? We&apos;re here to assist you.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-6">
          {state.success && (
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Check className="size-4" />
              Your message has been sent. Thank you.
            </p>
          )}

          {/* Name */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.name}>
            <Label htmlFor="name" className="group-data-[invalid=true]/field:text-destructive">
              Name <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Lee Robinson"
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              disabled={pending}
              defaultValue={state.defaultValues.name}
            />
            {state.errors?.name && (
              <p className="text-destructive text-sm">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.email}>
            <Label htmlFor="email" className="group-data-[invalid=true]/field:text-destructive">
              Email <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="leerob@acme.com"
              disabled={pending}
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              defaultValue={state.defaultValues.email}
            />
            {state.errors?.email && (
              <p className="text-destructive text-sm">{state.errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div className="group/field grid gap-2" data-invalid={!!state.errors?.message}>
            <Label htmlFor="message" className="group-data-[invalid=true]/field:text-destructive">
              Message <span aria-hidden="true">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              disabled={pending}
              className="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
              defaultValue={state.defaultValues.message}
            />
            {state.errors?.message && (
              <p className="text-destructive text-sm">{state.errors.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
