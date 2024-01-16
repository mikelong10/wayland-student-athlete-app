"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Loader2, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

import { EditUserNameFormValues, editUserNameSchema } from "@lib/schemas";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useToast } from "@components/ui/use-toast";

export default function EditUserNameForm({ user }: { user: User }) {
  const { toast } = useToast();

  const [activeUser, setActiveUser] = useState<User>(user);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const form = useForm<EditUserNameFormValues>({
    resolver: zodResolver(editUserNameSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: EditUserNameFormValues) {
    setIsSavingEdit(true);

    toast({
      title: "Updating your name...",
      description: "Hope you're having a great day today!",
    });

    try {
      const editProfileResponse = await fetch(`/api/users/${activeUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!editProfileResponse?.ok) {
        throw new Error();
      }

      const updatedUser: User = await editProfileResponse.json();

      toast({
        title: "Looking good!",
        description: "Your name was successfully updated",
        variant: "success",
      });

      setActiveUser(updatedUser);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your name update. Please try again.",
        variant: "destructive",
      });
    }
    setIsSavingEdit(false);
  }

  return (
    <div className="flex items-center gap-4">
      <p className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {activeUser.name ?? "Your Name"}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="xs:max-w-[400px] max-w-full rounded-xl sm:max-w-[480px] md:max-w-[576px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done!
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="edit-profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="col-span-3 h-fit items-center"
                      />
                    </FormControl>
                    <FormMessage className="col-span-full text-right" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="xs:grid-cols-4 grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel className="xs:col-span-1 col-span-2 whitespace-nowrap text-right">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage className="col-span-full text-right" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button type="submit" form="edit-profile-form">
              {isSavingEdit ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </div>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
