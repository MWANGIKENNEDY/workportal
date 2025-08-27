"use client";

import React from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const EditJobButton = ({ jobId }: { jobId: string }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/job/edit/${jobId}`);
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="cursor-pointer"
      onClick={handleEdit}
    >
      <Pencil className="h-4 w-4" />
      Edit
    </Button>
  );
};

export default EditJobButton;
