"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod"

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

const TestSchema = z.object({
  name: z.string(),
  test: z.array(z.string()).nonempty({ message: "At least one test must be selected" }),
  doctor: z.string().optional(),
  date:z.date({ required_error: 'Date is required' }),
})


export function TestOrderForm() {
  const router = useRouter() 

  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      name: "",
      test: [],
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

const testData = [
    "Complete Blood Count (CBC)",
    "X-Ray Chest",
    "COVID-19 PCR"
];

 const [doctorList, setDoctorList] = useState(false);
 const [testList, setTestList] = useState(false);
 const [open, setOpen] = useState(false);

function onSubmit(data: z.infer<typeof TestSchema>) {
  console.log("Submitted Data:", data);

  const id = uuidv4();
  const TestData = { ...data, id };

  // Store data in localStorage (or send to DB and use server fetch)
  localStorage.setItem(`Test-${id}`, JSON.stringify(TestData));

  router.push(`/print/${id}`);
}

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 px-4 py-12">
        <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 transition-all">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Medical Test Order
          </h1> 
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter patient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              


            <FormField
                control={form.control}
                name="test"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Select Tests</FormLabel>
                    <Popover open={testList} onOpenChange={setTestList}>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                            >
                            {field.value.length > 0
                                ? field.value.join(", ")
                                : "Select test(s)"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search test..." />
                            <CommandEmpty>No test found.</CommandEmpty>
                            <CommandGroup>
                            {testData.map((tdata) => (
                                <CommandItem
                                key={tdata}
                                onSelect={() => {
                                    const newSelection = field.value.includes(tdata)
                                    ? field.value.filter((item) => item !== tdata)
                                    : [...field.value, tdata];
                                    field.onChange(newSelection);
                                }}
                                >
                                <span className="flex items-center">
                                    <input
                                    type="checkbox"
                                    checked={field.value.includes(tdata)}
                                    readOnly
                                    className="mr-2"
                                    />
                                    {tdata}
                                </span>
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
                name="doctor"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Referred Doctor</FormLabel>
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
            
  
              <Button type="submit" className="w-full">Submit Order</Button>
            </form>
          </Form>
        </div>
      </div>
    )
  }
  

