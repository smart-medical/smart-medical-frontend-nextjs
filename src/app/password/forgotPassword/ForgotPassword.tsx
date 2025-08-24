"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export function ForgotPassword() {
  const router = useRouter()    

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })


 function onSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
  
  console.log("Submitted Data:", data);
  
  toast.success("Reset instructions sent to your email");
  router.push("/login")
}


  
  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"> 
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Forgot Your Password</h1>
          <p className="text-gray-600 mb-8">Enter your email to receive reset instructions</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  
  
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>

          <p className="text-center text-gray-600 mt-8">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Back to Login</a>
          </p>
        </div>
      </div>
    )
  }
  

