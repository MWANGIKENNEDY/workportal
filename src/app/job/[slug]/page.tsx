import { getOneJob } from "@/lib/db/query";
import { auth } from "@clerk/nextjs/server";
import { JobWithRelations } from "@/lib/types";
import { notFound } from "next/navigation";
import React from "react";
import EditJobButton from "@/components/job/editJobButton";
import DeleteJobButton from "@/components/job/deleteJobButton";
import ApplyForJob from "@/components/job/applyForJob";

const SingleJobPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const job: JobWithRelations | null = await getOneJob(slug);

  const { userId } = await auth();

  if (!job) {
    return notFound();
  }

  // The creator of a job should not be able to apply for their own jobs
  const isAuthor = job?.postedBy.clerkId === userId;

  return (
    <main className="mx-auto font-sans bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-8 md:p-10 border border-gray-100">
        <div className="border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {job.title}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{job.company}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {job.location}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 font-medium text-green-800">
              {job.type}
            </span>
            <span className="flex items-center gap-2 text-gray-700 font-medium">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {job.salary}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            Posted by
            <span className="font-medium text-gray-700">
              {" "}
              {job.postedBy.firstName + " " + job.postedBy.lastName}
            </span>
            <span className="text-gray-400"> • August 18, 2025</span>
          </p>
        </div>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
          <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">
            Responsibilities
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Develop new features and maintain existing web applications</li>
            <li>Write clean, maintainable, and reusable code</li>
            <li>
              Collaborate with designers and backend developers to deliver
              high-quality products
            </li>
            <li>
              Participate in code reviews and technical discussions to ensure
              best practices
            </li>
            <li>Optimize applications for performance and scalability</li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              React
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Next.js
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              TailwindCSS
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              JavaScript
            </span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              HTML/CSS
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {isAuthor && (
          

<ApplyForJob jobId = {job.id}/>

          )}
          {isAuthor && (
            <>

            <EditJobButton jobId={job.id}/>
             
             <DeleteJobButton jobId={job.id}/>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default SingleJobPage;