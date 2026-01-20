"use client";

import Container from "@components/Container";
import H1 from "@components/typography/h1";
import H2 from "@components/typography/h2";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Separator } from "@components/ui/separator";
import { useToast } from "@components/ui/use-toast";
import type { StudentAthleteProfile } from "@db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type StudentAthleteProfileFormValues,
  studentAthleteProfileFormSchema,
} from "@lib/schemas";
import { UploadDropzone } from "@lib/uploadthing";
import { cn } from "@lib/utils";
import { FileCheck, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function AddStudentAthleteProfileForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [filesUploaded, setFilesUploaded] = useState(false);
  const [numFilesUploaded, setNumFilesUploaded] = useState(0);

  const form = useForm<StudentAthleteProfileFormValues>({
    resolver: zodResolver(studentAthleteProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      title: "",
      graduationYear: new Date().getFullYear().toString(),
      resumeItems: [{ text: "" }],
      displayImage: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "resumeItems",
    rules: {
      required: "Add some resume items",
    },
  });

  async function onSubmit(values: StudentAthleteProfileFormValues) {
    setIsSubmitting(true);
    setSubmitDisabled(true);

    try {
      toast({
        title: "Creating profile...",
        description: "This may take a few moments",
      });

      const addProfileResponse = await fetch("/api/student-athletes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!addProfileResponse.ok) {
        throw new Error();
      }

      const addProfileResponseBody: StudentAthleteProfile =
        await addProfileResponse.json();

      toast({
        title: "Profile successfully added!",
        description: `Added profile for ${addProfileResponseBody.name}`,
        variant: "success",
      });

      router.push("/who");
      router.refresh();
    } catch (_error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
    setSubmitDisabled(false);
  }

  return (
    <Container className="flex size-full min-h-screen flex-col justify-center gap-4 pb-20 pt-32 sm:max-w-screen-md md:items-center lg:max-w-[960px]">
      <H1 className="w-full text-left">Add Profile</H1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <H2>Profile Info</H2>
            <div className="flex flex-col gap-8">
              <div className="xs:flex-row flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        First name <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Last name <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="xs:flex-row flex w-full flex-col justify-between gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Title <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        (Co-owner, CFO, Team Member, etc.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="graduationYear"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Graduation year <span className="text-primary">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-80">
                          {Array.from(
                            { length: 5 },
                            (_, index) => new Date().getFullYear() + index
                          ).map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormLabel>
                  Resume items<span className="text-primary">*</span>
                </FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`resumeItems.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="flex flex-1 flex-col">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="size-10"
                      onClick={() => remove(index)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="accent"
                  className="flex items-center gap-1"
                  onClick={() => {
                    append({ text: "" });
                  }}
                >
                  <Plus />
                  Add item
                </Button>
                {form.formState.errors.resumeItems?.root?.message && (
                  <span className="text-primary">
                    {form.formState.errors.resumeItems?.root?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <H2>Images</H2>
            <div className="flex flex-col gap-2">
              <UploadDropzone
                endpoint={"studentAthleteProfileImage"}
                className="border-border ut-label:xs:text-lg ut-label:w-full ut-label:text-primary ut-allowed-content:text-muted-foreground ut-upload-icon:text-muted ut-button:bg-primary ut-button:after:bg-tertiary hover:ut-button:opacity-80 ut-button:transition-all hover:cursor-pointer"
                onUploadBegin={() => {
                  setSubmitDisabled(true);
                }}
                onClientUploadComplete={(res) => {
                  setSubmitDisabled(false);
                  const imageUrls = res.map((r) => r.url);
                  setNumFilesUploaded(imageUrls.length);
                  setFilesUploaded(true);
                  form.setValue("displayImage", imageUrls[0]);
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: `Uh oh! ${error.message}.`,
                    description: "Please try again.",
                    variant: "destructive",
                  });
                }}
                content={{
                  uploadIcon() {
                    if (filesUploaded) {
                      return <FileCheck className="text-muted size-14" />;
                    }
                    return <ImagePlus className="text-muted size-14" />;
                  },
                  label() {
                    if (filesUploaded) {
                      return (
                        <span>
                          {numFilesUploaded} file
                          {numFilesUploaded === 1 ? "" : "s"} uploaded
                        </span>
                      );
                    }
                    return <span>Click to choose or drag and drop here</span>;
                  },
                }}
              />
              <FormDescription>
                Upload the image for the student-athlete profile here
              </FormDescription>
            </div>
          </div>
          <Button
            type="submit"
            disabled={submitDisabled}
            className={cn("mt-2", isSubmitting ? "opacity-80" : "")}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Adding profile...
              </div>
            ) : (
              "Add profile"
            )}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
