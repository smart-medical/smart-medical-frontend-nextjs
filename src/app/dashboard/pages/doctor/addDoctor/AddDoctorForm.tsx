"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
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
import { ChevronsUpDown } from "lucide-react";

const AddDoctorSchema = z.object({
  firstName: z.string().min(2, { message: "First Name must be at least 2 characters" }),
  lastName: z.string().min(4, { message: "Last Name must be at least 4 characters" }),
  email: z.string().email(),
  uniqueId: z.string().min(6, "ID must be at least 6 characters"),
  mobileNumber: z.string()
    .min(11, "Mobile Number must be at least 11 digits")
    .max(15, "Mobile Number must be at most 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.string().refine((val) =>
    ["male", "female", "other"].includes(val), { message: "Please select a gender" }),
  maritalState: z.string().refine((val) =>
    ["married", "unmarried"].includes(val), { message: "Please select a valid marital status" }),

  license: z.string().optional(),
  bloodGroup: z.string().optional(),
  address: z.string(),
  postalCode: z.string().optional(),
  department: z.string()
  .refine((val) => [
    "Cardiology", "Dermatology", "Gastroenterology", "Surgery",
    "Pathology", "Orthopedics", "Neurology", "Psychiatry", "Internal medicine"
  ].includes(val), {
    message: "Please select a valid department",
  })
  .optional(),
  designation: z.string().optional(),
  clinic: z.string().optional(),
});

export function AddDoctorForm() {
  
  const router = useRouter() 

  const form = useForm<z.infer<typeof AddDoctorSchema>>({
    resolver: zodResolver(AddDoctorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      uniqueId: "",
      mobileNumber: "",
      gender: "",
      maritalState: "",
      license: "",
      bloodGroup: "",
      address: "",
      postalCode: "",
      department: "",
      designation: "",
      clinic: "",
    },
  })

  const clinics = [
  "Green Life Hospital",
  "United Hospital",
  "Square Hospitals Ltd.",
  "Apollo Hospitals Dhaka",
  "Popular Diagnostic Center",
];


const [open, setOpen] = useState(false);

 function onSubmit(data: z.infer<typeof AddDoctorSchema>) {
  console.log("Submitted Data:", data);
  
 // localStorage.setItem("userEmail", data.email);
  toast.success("Doctor Added successfully");
  router.push("/dashboard/pages/doctor/doctorlist")
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Enter last name" {...field} />
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
                      <Input type="email" placeholder="Enter email" {...field} />
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
                name="uniqueId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create ID</FormLabel>
                    <FormControl>
                      <Input type="uniqueId" placeholder="Enter Id" {...field} />
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
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical License Number</FormLabel>
                    <FormControl>
                    <Input type="text" placeholder="Enter license number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maritalState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select marital status</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                      </select>
                    </FormControl>
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
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a department</option>
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
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <FormControl>
                         <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select blood group</option>
                        <option value="a+">A+</option>
                        <option value="a-">A-</option>
                        <option value="b+">B+</option>
                        <option value="b-">B-</option>
                        <option value="o+">O+</option>
                        <option value="o-">O-</option>
                        <option value="ab+">AB+</option>
                        <option value="ab-">AB-</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a designation</option>
                        <option value="intern">Intern</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="consultant">Consultant</option>
                        <option value="specialist">Specialist</option>
                        <option value="head_of_department">Head of Department</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                    <Input type="text" placeholder="Enter address details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
              control={form.control}
              name="clinic"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Hospital / Clinic</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="justify-between"
                        >
                          {field.value || "Select a clinic"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search clinic..." />
                        <CommandEmpty>No clinic found.</CommandEmpty>
                        <CommandGroup>
                          {clinics.map((clinic) => (
                            <CommandItem
                              key={clinic}
                              onSelect={() => {
                                field.onChange(clinic);
                                setOpen(false);
                              }}
                            >
                              {clinic}
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
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-end gap-4 mt-6">
                    <Button type="button" variant="outline">
                    Cancel
                    </Button>
                    <Button type="submit">Create Doctor Profile</Button>
                 </div>
            </form>
          </Form>
        </div>
    )
  }
  

