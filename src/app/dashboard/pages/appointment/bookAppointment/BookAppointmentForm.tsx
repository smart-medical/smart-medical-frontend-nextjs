"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const BookAppointmentSchema = z.object({
  fullName: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email(),
  mobileNumber: z.string()
    .min(11, "Mobile Number must be at least 11 digits")
    .max(15, "Mobile Number must be at most 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.string().refine((val) =>
    ["male", "female", "other"].includes(val), { message: "Please select a gender" }),
  age: z.string(),
  date: z.date({ required_error: "Date is required" }),
  department: z.string()
  .refine((val) => [
    "Cardiology", "Dermatology", "Gastroenterology", "Surgery",
    "Pathology", "Orthopedics", "Neurology", "Psychiatry", "Internal medicine"
  ].includes(val), {
    message: "Please select a valid department",
  })
  .optional(),
  doctor: z.string(),
  timeSlot: z.string(),
  problem: z.string().optional(),

});

export function BookAppointmentForm() {
  
  const router = useRouter() 

  const form = useForm<z.infer<typeof BookAppointmentSchema>>({
    resolver: zodResolver(BookAppointmentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      gender: "",
      age: "",
      date: new Date(),
      department: "",
      doctor: "",
      timeSlot: "",
      problem: "",
    },
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const [events, setEvents] = useState<any[]>([])
const [open, setOpen] = useState(false);
 function onSubmit(data: z.infer<typeof BookAppointmentSchema>) {
  const startDateTime = new Date(data.date)
    const [hours, minutes] = data.timeSlot.split(":").map(Number)
    startDateTime.setHours(hours, minutes)

    const endDateTime = new Date(startDateTime)
    endDateTime.setMinutes(startDateTime.getMinutes() + 30) // 30min slot

    const newEvent = {
      id: String(events.length + 1),
      title: `${data.fullName} - ${data.doctor}`,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    }

    setEvents([...events, newEvent])
    form.reset()
  
  
 // localStorage.setItem("userEmail", data.email);
  toast.success("Appointment booked successfully");
  router.push("/dashboard/pages/appointment/appointmentList")
}
  
  return (
  <div className="w-full px-6 py-10 bg-white rounded-xl shadow border">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Enter full name" {...field} />
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
                    <FormLabel>Patient Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
             />

             <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                        <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex items-center gap-6 mt-2"
                        >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="male" id="gender-male" />
                            <Label htmlFor="gender-male" className="text-sm">Male</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="female" id="gender-female" />
                            <Label htmlFor="gender-female" className="text-sm">Female</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="other" id="gender-other" />
                            <Label htmlFor="gender-other" className="text-sm">Other</Label>
                        </div>
                        </RadioGroup>
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
                       <Input type="text" placeholder="Enter age " {...field} />
                    </FormControl>
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
                              
             <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Time Slot</FormLabel>
                    <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                            <SelectValue placeholder="Select slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="08:00">08:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="04:00">04:00 PM</SelectItem>
                          <SelectItem value="07:00">07:00 PM</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent  className="w-full">
                            <SelectItem value="Cardiology">Cardiology</SelectItem>
                            <SelectItem value="Dermatology">Dermatology</SelectItem>
                            <SelectItem value="Gastroenterology">Gastroenterology</SelectItem>
                            <SelectItem value="Surgery">Surgery</SelectItem>
                            <SelectItem value="Pathology">Pathology</SelectItem>
                            <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                            <SelectItem value="Neurology">Neurology</SelectItem>
                            <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                            <SelectItem value="Internal medicine">Internal medicine</SelectItem>
                        </SelectContent>                   
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="doctor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="Anika Sharmin">Anika Sharmin</SelectItem>
                      <SelectItem value="Hasibul Islam">Hasibul Islam</SelectItem>
                      <SelectItem value="Jibon Ahmed">Jibon Ahmed</SelectItem>
                    </SelectContent>
                  </Select>
                    <FormMessage />
                  </FormItem>
                )}
            />

              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                    <FormLabel>Problem</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the problem" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-end gap-4 mt-6">
                    <Button type="button" variant="outline">
                    Cancel
                    </Button>
                    <Button type="submit">Book Appointment</Button>
                 </div>
            </form>
   </Form>
</div>
    )
  }
  

