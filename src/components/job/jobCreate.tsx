"use client";

import React, { useTransition } from "react";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createJob, editJob } from "@/app/job/actions";

export const JobFormSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters long").max(100),
  company: z.string().min(2, "Company name must be at least 2 characters long").max(100),
  location: z.string().min(2, "Location must be at least 2 characters long").max(100),
  jobType: z.string().min(2, "Job type must be at least 2 characters long").max(100),
  salary: z.string().min(2, "Salary must be at least 2 characters long").max(100),
  description: z.string().min(10, "Description must be at least 10 characters long").max(500),
  content: z.string().min(20, "Job content must be at least 20 characters long").max(5000),
});



type JobFormData = z.infer<typeof JobFormSchema>;

const JobForm = ({
  isEditing,
  job,
}: {
  isEditing?: boolean;
  job?: JobFormData & { id: string };
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(JobFormSchema),
    defaultValues:
      isEditing && job
        ? {
            title: job.title,
            company: job.company,
            location: job.location,
            jobType: job.jobType,
            salary: job.salary,
            description: job.description,
            content: job.content,
          }
        : {
            title: "",
            company: "",
            location: "",
            jobType: "",
            salary: "",
            description: "",
            content: "",
          },
  });

  const [isPending, startTransition] = useTransition();

  const onFormSubmit = async (data: JobFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        let res;
        if (isEditing && job) {
          res = await editJob(job.id,formData);
        } else {
          res = await createJob(formData);
        }

        if (res.success) {
          toast(`Job ${isEditing ? "edited" : "created"} successfully`);
          router.refresh();
          router.push("/");
        } else {
          toast(res.message);
        }
      } catch (error) {
        console.log(error);
        toast("Failed to create job. Kindly try again!");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
   {/* Job Title */}
<div className="space-y-2">
  <Label htmlFor="title">Job Title</Label>
  <Input
    disabled={isPending}
    id="title"
    placeholder="Enter job title"
    {...register("title")}
  />
  {errors?.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
</div>

{/* Company */}
<div className="space-y-2">
  <Label htmlFor="company">Company</Label>
  <Input
    disabled={isPending}
    id="company"
    placeholder="Enter company name"
    {...register("company")}
  />
  {errors?.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
</div>

{/* Location */}
<div className="space-y-2">
  <Label htmlFor="location">Location</Label>
  <Input
  className=" placeholder-gray-100"
    disabled={isPending}
    id="location"
    placeholder="City, Country or Remote"
    {...register("location")}
  />
  {errors?.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
</div>

{/* Job Type */}
<div className="space-y-2">
  <Label htmlFor="jobType">Job Type</Label>
  <Input
    disabled={isPending}
    id="jobType"
    placeholder="e.g. Full-time, Part-time"
    {...register("jobType")}
  />
  {errors?.jobType && <p className="text-xs text-red-500">{errors.jobType.message}</p>}
</div>

{/* Salary */}
<div className="space-y-2">
  <Label htmlFor="salary">Salary</Label>
  <Input
    disabled={isPending}
    id="salary"
    placeholder="Optional (e.g. $80,000 per year)"
    {...register("salary")}
  />
  {errors?.salary && <p className="text-xs text-red-500">{errors.salary.message}</p>}
</div>

{/* Description */}
<div className="space-y-2">
  <Label htmlFor="description">Short Description</Label>
  <Input
    disabled={isPending}
    id="description"
    placeholder="Write a short summary of the role"
    {...register("description")}
  />
  {errors?.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
</div>

{/* Content */}
<div className="space-y-2">
  <Label htmlFor="content">Full Job Details</Label>
  <Textarea
    disabled={isPending}
    id="content"
    placeholder="Provide detailed job requirements, responsibilities, and benefits..."
    {...register("content")}
    className="min-h-[250px] resize-none"
  />
  {errors?.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
</div>


      {/* Submit */}
      <Button disabled={isPending} type="submit">
        {isPending ? "Submitting..." : isEditing ? "Update Job" : "Create Job"}
      </Button>
    </form>
  );
};

export default JobForm;
