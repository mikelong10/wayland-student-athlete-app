"use client";

import { HTMLAttributes, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { toast } from "@components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { FacebookLogo, GoogleLogo } from "@components/icons";
import { Separator } from "@components/ui/separator";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export const userAuthSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email")
    .nonempty("Please enter your email"),
});

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
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
    <div className={cn("flex flex-col w-full gap-6", className)} {...props}>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google", { callbackUrl: "/" });
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
          variant="outline"
          onClick={() => {
            setIsFacebookLoading(true);
            signIn("facebook", { callbackUrl: "/" });
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
      <div className="flex items-center gap-1 w-full">
        <Separator className="flex flex-1" />
        <div className="flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">Or continue with</span>
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
              <p className="px-3 py-1 text-xs text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
