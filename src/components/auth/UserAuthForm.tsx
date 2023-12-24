"use client";

import { HTMLAttributes, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { EmailLoginFormValues, emailLoginSchema } from "@lib/schemas";
import { cn } from "@lib/utils";
import { FacebookLogo, GoogleLogo } from "@components/icons";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Separator } from "@components/ui/separator";
import { toast } from "@components/ui/use-toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginFormValues>({
    resolver: zodResolver(emailLoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  async function onSubmit(data: EmailLoginFormValues) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
    });

    setIsLoading(false);

    if (signInResult && signInResult.error) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <Button
          variant="traced"
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google");
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleLogo className="mr-2 h-5 w-5" />
          )}
          Google
        </Button>
        <Button
          variant="traced"
          onClick={() => {
            setIsFacebookLoading(true);
            signIn("facebook");
          }}
          disabled={isLoading || isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FacebookLogo className="mr-2 h-5 w-5" />
          )}
          Facebook
        </Button>
      </div>
      <div className="flex w-full items-center gap-1">
        <Separator className="flex flex-1" />
        <div className="flex justify-center text-xs uppercase">
          <span className="text-muted-foreground px-2">or continue with</span>
        </div>
        <Separator className="flex flex-1" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-destructive px-3 py-1 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
