"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, ChevronDownIcon } from "lucide-react";
import { useState } from "react"

const AppointmentSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  phone: z.string()
      .min(11, "Mobile Number must be at least 11 digits")
      .max(15, "Mobile Number must be at most 15 digits")
      .regex(/^\d+$/, "Mobile number must contain only digits"),
  age:z.coerce.number().min(1, { message: "Age must be a positive number" }),
  unit: z.enum(["years", "months"]),
 
  specialization: z.string()
  .refine((val) => [
    "Cardiology", "Dermatology", "Gastroenterology", "Surgery",
    "Pathology", "Orthopedics", "Neurology", "Psychiatry", "Internal medicine"
  ].includes(val), {
    message: "Please select a valid category",
  }),
  doctor: z.string().optional(),
  date:z.date({ required_error: 'Date is required' }),
})
 .refine(
  (data) => data.unit === "months" ? data.age <= 12 : true,
  {
    message: "If unit is months, age must not exceed 12",
    path: ["age"], // show error under the age field
  }
);

export function AppointmentForm() {
  const router = useRouter() 

  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      age: 18,
      unit: "years",
      specialization: "",
      doctor: "",
      date: new Date(),
    },
  })

 const doctors = [
  "Dr. Ahmed Hossain",
  "Dr. Farhana Rahman",
  "Dr. Mahmudul Hasan",
  "Dr. Nusrat Jahan",
  "Dr. Khalid Karim",
];

 const [doctorList, setDoctorList] = useState(false);
 const [open, setOpen] = useState(false);

 function onSubmit(data: z.infer<typeof AppointmentSchema>) {
  
  console.log("Submitted Data:", data);
  
 // localStorage.setItem("userEmail", data.email);
  toast.success("Login successful");
  router.push("/dashboard")
}


  
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 px-4 py-12">
        <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 transition-all">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Doctor Appointment
          </h1> 
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="Enter age"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                            <select {...field} className="input">
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                            </select>
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Specialization</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Gastroenterology">Gastroenterology</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Pathology">Pathology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Psychiatry">Psychiatry</option>
                          <option value="Internal medicine">Internal medicine</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctor"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Doctor</FormLabel>
                    <Popover open={doctorList} onOpenChange={setDoctorList}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                          >
                            {field.value || "Select a doctor"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Search doctor..." />
                          <CommandEmpty>No doctor found.</CommandEmpty>
                          <CommandGroup>
                            {doctors.map((doc) => (
                              <CommandItem
                                key={doc}
                                onSelect={() => {
                                  field.onChange(doc);
                                  setDoctorList(false);
                                }}
                              >
                                {doc}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select date</FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date"
                              className="w-full justify-between font-normal"
                            >
                              {field.value
                                ? field.value.toLocaleDateString()
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(val) => {
                                field.onChange(val); 
                                setOpen(false);
                              }}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
  
              <Button type="submit" className="w-full">Schedule Appointment</Button>
            </form>
          </Form>
        </div>
      </div>
    )
  }
  

