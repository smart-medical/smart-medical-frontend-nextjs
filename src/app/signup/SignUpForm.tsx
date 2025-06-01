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


const SignUpSchema = z.object({
  fullname:z.string().min(4,{
    message:"Name must be at least 4 characters"
  }),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  mobileNumber:z.string()
  .min(11,"Mobile Number must be at least 11 digits")
  .max(15,"Mobile Number must be at most 15 digits")
  .regex(/^\d+$/, "Mobile number must contain only digits"),
  gender:z.string()
  .refine((val) => ["male", "female", "other",].includes(val), {
    message: "Please select a gender",
  }),
  role: z.string()
  .refine((val) => ["admin", "doctor", "nurse", "reception", "lab-technician"].includes(val), {
    message: "Please select a valid role",
  }),
  license:z.string()
  .min(8, "License number must be at least 8 characters")
  .max(12, "License number must be at most 12 characters")
  .regex(/^[a-zA-Z0-9]+$/, "License number must be alphanumeric"),
  registration_id:z.string()
  .min(8,"Registration/ID Number must be at least 8 digits")
  .max(14,"Registration/ID Number must be at most 14 digits")
  .regex(/^\d+$/, "Registration/ID number must contain only digits"),
  passcode:z.string().optional(),
  department: z.string()
  .refine((val) => ["Cardiology", "Dermatology", "Gastroenterology", "Surgery", "Pathology", "Orthopedics", "Neurology", "Psychiatry","Internal medicine"].includes(val), {
    message: "Please select a valid category",
  }),

})
.refine((data)=> data.password === data.confirmPassword, {
  path:["confirmPassword"],
  message:"Password does not match",
})
.superRefine((data, ctx) => {
   if (data.role === "admin" && data.passcode !== "SMART-MEDICAL") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["passcode"],
      message: "Invalid admin passcode",
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
      role: "",
      license: "",
      passcode: "",
      department: "",
    },
  })

 const selectedRole = form.watch("role");

 function onSubmit(data: z.infer<typeof SignUpSchema>) {
  console.log("Submitted Data:", data);
  
 // localStorage.setItem("userEmail", data.email);
  toast.success("Login successful");
  router.push("/login")
}
  
  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Registration for Medical Professional</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select role</option>
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
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select department</option>
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

  
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
  
        </div>
      </div>
    )
  }
  

