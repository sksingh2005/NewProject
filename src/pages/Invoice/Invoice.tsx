"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Upload, X, FileText, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { useNavigate } from "react-router-dom"

const paymentRequestSchema = z.object({
  payeeName: z.string().min(1, "Payee name is required"),
  recurringPayment: z.enum(["yes", "no"]),
  paymentType: z.enum(["instant", "scheduled"]),
  dueDate: z.date().optional(),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().default("INR"),
  description: z.string().optional(),
})

type FormData = z.infer<typeof paymentRequestSchema>

export default function InvoiceForm() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(paymentRequestSchema),
    defaultValues: {
      recurringPayment: "no",
      paymentType: "instant",
      currency: "INR",
    },
  })

  const recurringPayment = watch("recurringPayment")
  const paymentType = watch("paymentType")

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", { ...data, file: uploadedFile })
    alert("Payment request submitted successfully!")
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) setUploadedFile(files[0])
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-2">
          <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100" onClick={()=>{
            navigate('/transactions');
          }}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Payment Request</h1>
            <p className="text-slate-500 mt-1">Create and manage your payment transactions</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg shadow-slate-200/50">
              <CardContent className="p-4">
                <div className="space-y-7">
                  {/* Payee Name */}
                  <div className="space-y-2">
                    <Label htmlFor="payeeName" className="text-sm font-semibold text-slate-700">
                      Payee Name
                    </Label>
                    <Input
                      id="payeeName"
                      placeholder="Enter payee name"
                      {...register("payeeName")}
                      className={`h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${
                        errors.payeeName ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""
                      }`}
                    />
                    {errors.payeeName && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                        {errors.payeeName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-7 md:grid-cols-2">
                    {/* Recurring Payment */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">Recurring Payment</Label>
                      <RadioGroup
                        value={recurringPayment}
                        onValueChange={(value) => setValue("recurringPayment", value as "yes" | "no")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="relative flex items-center justify-center">
                            <RadioGroupItem value="yes" id="recurring-yes" className="border-2" />
                          </div>
                          <Label
                            htmlFor="recurring-yes"
                            className="cursor-pointer font-medium text-slate-700 text-sm"
                          >
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="relative flex items-center justify-center">
                            <RadioGroupItem value="no" id="recurring-no" className="border-2" />
                          </div>
                          <Label
                            htmlFor="recurring-no"
                            className="cursor-pointer font-medium text-slate-700 text-sm"
                          >
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Payment Type */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-slate-700">Payment Type</Label>
                      <RadioGroup
                        value={paymentType}
                        onValueChange={(value) => setValue("paymentType", value as "instant" | "scheduled")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="relative flex items-center justify-center">
                            <RadioGroupItem value="instant" id="payment-instant" className="border-2" />
                          </div>
                          <Label
                            htmlFor="payment-instant"
                            className="cursor-pointer font-medium text-slate-700 text-sm"
                          >
                            Instant
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 flex-1">
                          <div className="relative flex items-center justify-center">
                            <RadioGroupItem value="scheduled" id="payment-scheduled" className="border-2" />
                          </div>
                          <Label
                            htmlFor="payment-scheduled"
                            className="cursor-pointer font-medium text-slate-700 text-sm"
                          >
                            Scheduled
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Due Date - Animated entrance */}
                  {paymentType === "scheduled" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Due Date
                      </Label>
                      <DatePicker
                        value={watch("dueDate")}
                        onChange={(date) => setValue("dueDate", date)}
                        placeholder="Select a date"
                        className="w-full h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  )}

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-semibold text-slate-700">
                      Amount
                    </Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                          ₹
                        </span>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...register("amount")}
                          className={`h-11 pl-9 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg font-semibold transition-all ${
                            errors.amount ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""
                          }`}
                        />
                      </div>
                      <Select value={watch("currency")} onValueChange={(v) => setValue("currency", v)}>
                        <SelectTrigger className="w-28 h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200 shadow-xl">
                          <SelectItem value="INR">INR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.amount && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-600"></span>
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                      Description
                      <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Add any additional notes or details..."
                      {...register("description")}
                      className="min-h-[100px] bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none transition-all"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="flex-1 h-11 bg-gray-900 hover:bg-bg-gray-900 text-white shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all font-semibold"
                    >
                      Submit Request
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-11 border-slate-300 hover:bg-slate-50 font-semibold transition-all"
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-6 h-11 hover:bg-slate-100 font-semibold transition-all"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File Upload Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg shadow-slate-200/50 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">Attachments</CardTitle>
                <CardDescription className="text-slate-500">Upload supporting documents</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 scale-[1.02]"
                      : "border-slate-200 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`rounded-full p-3 transition-all ${
                      dragActive ? "bg-blue-100 scale-110" : "bg-slate-100"
                    }`}>
                      <Upload className={`h-6 w-6 transition-colors ${
                        dragActive ? "text-blue-600" : "text-slate-400"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-1">
                        {dragActive ? "Drop file here" : "Drag & drop file here"}
                      </p>
                      <p className="text-xs text-slate-500">or click to browse</p>
                    </div>
                    <p className="text-xs text-slate-400 pt-2 border-t border-slate-200 w-full">
                      PDF, DOC, DOCX, XLS, XLSX
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {uploadedFile && (
                  <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-slate-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex-shrink-0 rounded-lg bg-blue-100 p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{uploadedFile.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                        onClick={() => setUploadedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}