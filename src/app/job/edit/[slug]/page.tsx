import JobForm from "@/components/job/jobCreate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOneJob } from "@/lib/db/query";
import { JobWithRelations } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

const JobEditPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const job: JobWithRelations | null = await getOneJob(slug);



  if (!job) {
    return notFound();
  }

  return (
    <main className="py-0">
      <div className=" max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className=" text-3xl font-bold">
              Edit job details
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <JobForm
              isEditing={true}
              job={{
                id: job.id.toString(),
                title: job.title,
                company: job.company,
                location: job.location,
                jobType: job.type,
                salary: job.salary!,
                description: job.description,
                content: job.description,
              }}
            />
          </CardContent>
          {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
        </Card>
      </div>
    </main>
  );
};

export default JobEditPage;
