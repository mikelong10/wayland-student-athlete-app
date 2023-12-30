"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobReview } from "@prisma/client";
import _ from "lodash";
import { FileCheck, ImagePlus, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { reviewFormSchema, ReviewFormValues } from "@lib/schemas";
import { UploadDropzone } from "@lib/uploadthing";
import { cn } from "@lib/utils";
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
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@components/ui/use-toast";
import { JobReviewWithImages } from "../../page";

export default function EditReviewForm({
  review,
  groupedReviewsArray,
}: {
  review: JobReviewWithImages;
  groupedReviewsArray: JobReviewWithImages[][];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [filesUploaded, setFilesUploaded] = useState(
    !!review.reviewImages.length
  );
  const [numFilesUploaded, setNumFilesUploaded] = useState(
    review.reviewImages.length
  );

  const defaultValues = {
    reviewerName: review.reviewerName,
    reviewBlurb: review.reviewBlurb,
    reviewText: review.reviewText,
    order: review.order.toString(),
    reviewImages: review.reviewImages.map((img) => img.src),
  };

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: ReviewFormValues) {
    if (_.isEqual(values, defaultValues)) {
      toast({
        title: "No changes detected",
        description: "No changes were made to this review.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitDisabled(true);

    try {
      toast({
        title: "Updating review...",
        description: "This may take a moment",
      });

      const updatedReviewResponse = await fetch(`/api/reviews/${review.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const updatedReviewResponseBody: JobReview =
        await updatedReviewResponse.json();

      toast({
        title: "Review successfully updated!",
        description: `Updated ${updatedReviewResponseBody.reviewerName}'s review.`,
        variant: "success",
      });

      router.push("/reviews");
      router.refresh();
    } catch {
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
    <Container className="flex h-full min-h-screen w-full flex-col justify-center gap-4 pb-12 pt-32 sm:max-w-[768px] md:items-center lg:max-w-[960px]">
      <H1 className="w-full text-left">Edit Review</H1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <H2>Review Info</H2>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="reviewerName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Reviewer name <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Person who left the review
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviewBlurb"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Job blurb <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Brief description of what kind of job it was (Snow
                        Removal, Moving Furniture, etc.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reviewText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Review content <span className="text-primary">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea className="min-h-[160px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        {"The client's review!"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Group <span className="text-primary">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="New review group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-80">
                          {groupedReviewsArray.map((reviews) => (
                            <SelectItem
                              key={reviews[0].order}
                              value={reviews[0].order.toString()}
                            >
                              {`${reviews[0].order} - ${
                                reviews[0].reviewBlurb
                              } (${reviews
                                .map((r) => r.reviewerName)
                                .join(", ")})`}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">New review group</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="flex flex-col">
                        <span>
                          Choose a review group to move this review to.
                        </span>
                        <span>
                          - &quot;
                          <span className="font-semibold">
                            New review group
                          </span>
                          &quot; will create a new review section at the bottom
                          of the reviews page.
                        </span>
                        <span>
                          - Moving this review to an existing review group will
                          append this review to the multi-review carousel or
                          turn it into a multi-review carousel if it isn&apos;t
                          already one.
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <H2>Images</H2>
            <div className="flex flex-col gap-2">
              <UploadDropzone
                endpoint={"jobReviewImage"}
                className="border-border ut-label:xs:text-lg ut-label:w-full ut-label:text-primary ut-allowed-content:text-muted-foreground ut-upload-icon:text-muted ut-button:bg-primary ut-button:after:bg-tertiary hover:ut-button:opacity-80 ut-button:transition-all hover:cursor-pointer"
                onUploadBegin={() => {
                  setSubmitDisabled(true);
                }}
                onClientUploadComplete={(res) => {
                  setSubmitDisabled(false);
                  const imageUrls = res.map((r) => r.url);
                  setNumFilesUploaded(imageUrls.length);
                  setFilesUploaded(true);
                  form.setValue("reviewImages", imageUrls);
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
                      return <FileCheck className="text-muted h-14 w-14" />;
                    }
                    return <ImagePlus className="text-muted h-14 w-14" />;
                  },
                  label() {
                    if (filesUploaded) {
                      return (
                        <span>
                          {numFilesUploaded} image
                          {numFilesUploaded === 1 ? "" : "s"} uploaded
                        </span>
                      );
                    }
                    return <span>Click to choose or drag and drop here</span>;
                  },
                }}
              />
              <FormDescription>
                Upload images for the review here. You can upload 0, 1, or more
                images—just make sure to choose or drag+drop all of them in one
                go.{" "}
                <span className="font-semibold">
                  Images you upload will replace any previously uploaded images.
                </span>
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving changes...
              </div>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </Form>
    </Container>
  );
}
