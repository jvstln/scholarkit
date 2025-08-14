"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useFormFieldComponent,
} from "@/components/ui/form";
import { BookOpen, Coffee, Users } from "lucide-react";
import type { LoginFormValues } from "@/features/auth/auth.type";
import { loginSchema } from "@/features/auth/auth.schema";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, GoogleIcon } from "@hugeicons/core-free-icons";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const FormField = useFormFieldComponent(form.control);

  const onSubmit = async (values: LoginFormValues) => {
    const response = await authClient.signIn.email({
      callbackURL: "/dashboard/chat",
      ...values,
    });

    if (response.error) {
      return toast.error(response.error.message);
    }
    toast.success("Login successful");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      <DecorativeElements />

      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Let's pick up where you left off. Your campus life, resources, and
            connections are just one step away.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      placeholder="your.email@university.edu"
                      {...field}
                      formControl
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      formControl
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <FormField
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex gap-2 items-center">
                      <Checkbox
                        formControl
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel>Remember me</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Link href="/forgot-password" className="text-sm">
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={form.formState.isSubmitting}
                loadingText="Logging in..."
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-2 text-xs text-gray-400 [&_hr]:grow">
            <hr /> OR SIGN IN WITH <hr />
          </div>

          <div className="flex gap-3 *:flex-1">
            <Button variant="outline" className="h-12 hover-lift">
              <HugeiconsIcon icon={GoogleIcon} className="size-8" />
            </Button>
            <Button variant="outline" className="h-12 hover-lift">
              <HugeiconsIcon icon={Github01Icon} className="size-8" />
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link href="/register">Join the campus community</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const DecorativeElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 opacity-10">
      <BookOpen size={120} className="text-primary rotate-12" />
    </div>
    <div className="absolute bottom-32 right-16 opacity-10">
      <Coffee size={100} className="text-primary -rotate-12" />
    </div>
    <div className="absolute top-1/2 right-1/4 opacity-10">
      <Users size={80} className="text-primary rotate-45" />
    </div>
    {/* Soft abstract shapes */}
    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-primary/15 rounded-full blur-2xl"></div>
  </div>
);
