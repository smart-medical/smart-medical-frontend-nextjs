"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { useState, useEffect } from "react";
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

const SignUpSchema = z.object({
  fullname: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  mobileNumber: z.string()
    .min(11, "Mobile Number must be at least 11 digits")
    .max(15, "Mobile Number must be at most 15 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.string().refine((val) =>
    ["male", "female", "other"].includes(val), { message: "Please select a gender" }),
  user: z.string().refine((val) =>
    ["admin", "doctor", "nurse", "reception", "lab-technician"].includes(val), { message: "Please select a valid user" }),

  license: z.string().optional(),
  registration_id: z.string().optional(),
  passcode: z.string().optional(),
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
  agreement_terms: z.literal(true, {
    errorMap: () => ({message: "You must agree to the terms and conditions"})
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password does not match",
})
.superRefine((data, ctx) => {
  if (data.user === "admin" && data.passcode !== "SMART-MEDICAL") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passcode"],
      message: "Invalid admin passcode",
    });
  }

  if (data.user === "doctor" && !data.license) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["license"],
      message: "License number is required for doctors",
    });
  }

  if (
    ["nurse", "reception", "lab-technician"].includes(data.user) &&
    !data.registration_id
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["registration_id"],
      message: "Registration/ID number is required",
    });
  }

  if (["doctor", "nurse", "reception", "lab-technician"].includes(data.user) && !data.designation) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["designation"],
      message: "Designation is required",
    });
  }

  if (!data.clinic) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["clinic"],
      message: "Clinic is required",
    });
  }
});

export function SignUpForm() {
  
  const router = useRouter() 

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
      gender: "",
      user: "",
      license: "",
      registration_id: "",
      passcode: "",
      department: "",
      designation: "",
      clinic: "",
      agreement_terms: true,
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
const [selectedRole, setSelectedRole] = useState("");

useEffect(() => {
  const subscription = form.watch((value) => {
    if (value && typeof value.user === "string") {
      setSelectedRole(value.user);
    }
  });
  return () => subscription.unsubscribe();
}, [form]); 

 function onSubmit(data: z.infer<typeof SignUpSchema>) {
  console.log("Submitted Data:", data);
  
 // localStorage.setItem("userEmail", data.email);
  toast.success("Registration successful");
  router.push("/login")
}
  
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200 px-4 py-12">
        <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 transition-all">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Registration for Medical Professional
          </h1>    

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("Form submission errors:", errors); 
                  })} className="space-y-4"
                  >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Enter your full name" {...field} />
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Re-enter your password" {...field} />
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
                      <Input type="tel" placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="male" id="r1" />
                          <Label htmlFor="r1">Male</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="female" id="r2" />
                          <Label htmlFor="r2">Female</Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="other" id="r3" />
                          <Label htmlFor="r3">Other</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select user type</option>
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="reception">Receptionist</option>
                        <option value="lab-technician">Lab Technician</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {selectedRole === "admin" && (
              <FormField
                control={form.control}
                name="passcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Passcode</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter admin passcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedRole === "doctor" && (
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
            )}


            {selectedRole === "doctor" && (
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
            )}

            {["nurse", "reception", "lab-technician"].includes(selectedRole) && (
              <FormField
                control={form.control}
                name="registration_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration/ID Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter registration/id number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedRole === "doctor" && (
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
            )}

           {["nurse", "reception", "lab-technician"].includes(selectedRole) && (
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
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
              name="agreement_terms"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={field.value ?? false}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="terms">
                      I agree to the terms and conditions
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

              <Button type="submit" className="w-full">Submit</Button>

            </form>
          </Form>
  
        </div>
      </div>
    )
  }
  

