"use client";
import { applyForJob } from "@/app/job/actions";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

const ApplyForJob = ({ jobId }: { jobId: string }) => {


  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const applyForJobHandler = () => {
    startTransition(async () => {
      try {
        const res = await applyForJob(jobId);

        if (res.success) {
          toast.success("Application sent!");
          //router.push("/");
          router.refresh();
        } else {
          toast.error(res.message || "Failed to submit application.");
        }
      } catch (error) {
        console.log(error);
        toast.error("There was an error applying for the job!");
      }
    });
  };

  return (
    <button 
    
    disabled={isPending}
  
        onClick={applyForJobHandler}
    
    className="w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      {isPending ? "Submitting Application..." : "Apply Now "}
    </button>
  );
};

export default ApplyForJob;
