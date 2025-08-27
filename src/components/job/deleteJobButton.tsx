"use client";

import React, {  useTransition } from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteJob } from "@/app/job/actions";

const DeleteJobButton = ({ jobId }: { jobId: string }) => {


  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const deleteHandler = () => {
    startTransition(async () => {
      try {
        const res = await deleteJob(jobId);

        if (res.success) {
          toast.success("Post deleted!");
          router.push("/");
          router.refresh();
        } else {
          toast.error(res.message || "Failed to delete post.");
        }
      } catch (error) {
        console.log(error)
        toast.error("There was an error deleting that post");
      } 
    });
  };
  return (
    <>
      <Button
      disabled={isPending}
        variant="destructive"
        size="sm"
        className=" cursor-pointer"
        onClick={deleteHandler}
      >
        <TrashIcon />
        { isPending ? "Deleting..." : "Delete" }
      </Button>
    </>
  );
};

export default DeleteJobButton;