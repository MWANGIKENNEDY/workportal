"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function createJob(formData: FormData) {
  try {
    const { userId } = await auth();

    console.log("form data is ", formData);

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to post a job.",
      };
    }

    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const type = formData.get("jobType") as string;
    const description = formData.get("description") as string;
    const salary = formData.get("salary") as string | null;

    if (!title || !company || !location || !type || !description) {
      return {
        success: false,
        message: "All required fields must be filled in.",
      };
    }

    // Create the job in Prisma
    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        description,
        salary,
        postedById: userId, // Clerk ID
      },
    });

    // Revalidate pages
    revalidatePath("/");
    revalidatePath(`/job/${job.id}`);

    return {
      success: true,
      message: "Job posted successfully!",
      jobId: job.id,
    };
  } catch (error) {
    console.error("createJob error:", error);
    return {
      success: false,
      message: "Failed to post job.",
    };
  }
}

export async function editJob(id: string, formData: FormData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to edit a job.",
      };
    }

    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;
    const type = formData.get("jobType") as string;
    const description = formData.get("description") as string;
    const salary = formData.get("salary") as string | null;

    if (!title || !company || !location || !type || !description) {
      return {
        success: false,
        message: "All required fields must be filled in.",
      };
    }

    // Ensure user owns the job
    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return {
        success: false,
        message: "Job not found.",
      };
    }

    if (existingJob.postedById !== userId) {
      return {
        success: false,
        message: "You are not authorized to edit this job.",
      };
    }

    // Update the job
    const job = await prisma.job.update({
      where: { id },
      data: {
        title,
        company,
        location,
        type,
        description,
        salary,
      },
    });

    // Revalidate paths
    revalidatePath("/");
    revalidatePath(`/job/${job.id}`);

    return {
      success: true,
      message: "Job updated successfully!",
      jobId: job.id,
    };
  } catch (error) {
    console.error("editJob error:", error);
    return {
      success: false,
      message: "Failed to update job.",
    };
  }
}

export async function deleteJob(jobId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to delete a job.",
      };
    }

    // Find the job first
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return {
        success: false,
        message: "Job not found.",
      };
    }

    // Ensure only the owner can delete
    if (job.postedById !== userId) {
      return {
        success: false,
        message: "You are not authorized to delete this job.",
      };
    }

    // Delete the job
    await prisma.job.delete({
      where: { id: jobId },
    });

    // Revalidate relevant pages
    revalidatePath("/");
    revalidatePath(`/job/${jobId}`);

    return {
      success: true,
      message: "Job deleted successfully!",
    };
  } catch (error) {
    console.error("deleteJob error:", error);
    return {
      success: false,
      message: "Failed to delete job.",
    };
  }
}

export async function applyForJob(jobId: string) {

    //apply for a job action
    //first check if that job exists
    // then check if application exists , else add the application to the db ::

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be logged to apply for a job.",
      };
    }

    // Find the job first
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return {
        success: false,
        message: "Job not found.",
      };
    }

    // Ensure only the owner can delete
    if (job.postedById === userId) {
      return {
        success: false,
        message: "You cannot apply for your own job posting.",
      };
    }

    const existingApplication = await prisma.application.findFirst({
      where: { jobId: jobId, userId: userId },
    });

    if (existingApplication) {
      return {
        success: false,
        message: "You have already applied for this job.",
      };
    }

    // Delete the job
    await prisma.application.create({
      data: {
        jobId: jobId,
        userId: userId,
        status: "PENDING",
      },
    });

    // Revalidate relevant pages
    revalidatePath("/");
    revalidatePath(`/job/${jobId}`);

    return {
      success: true,
      message: "Your application was submitted successfully!",
    };
  } catch (error) {
    console.error("applyJobError", error);
    return {
      success: false,
      message: "Failed to apply for this job.",
    };
  }
}
