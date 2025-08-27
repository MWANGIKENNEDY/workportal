import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const DashboardWrapper = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-6 text-center">Please log in to view your dashboard.</div>;
  }

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: { userId },
      include: {
        job: { include: { postedBy: true } },
      },
      orderBy: { appliedAt: "desc" },
    }),

    prisma.job.findMany({
      where: { postedById: userId },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { postedAt: "desc" },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Posted Jobs Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Posted Jobs</h2>
            <Link href="/job/create" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Post New Job
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {postedJobs.length === 0 && (
              <div className="p-6 text-gray-500 text-sm">You haven’t posted any jobs yet.</div>
            )}

            {postedJobs.map((job) => (
              <div key={job.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <span>{job.type}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Posted{" "}
                        {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {job._count.applications} applications
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <Link
                    href={`/job/${job.id}`}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Applications</h2>

          <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
            {applications.length === 0 && (
              <div className="p-6 text-gray-500 text-sm">You haven’t applied to any jobs yet.</div>
            )}

            {applications.map((app) => (
              <div key={app.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{app.job.title}</h3>
                    <p className="text-gray-600 mb-2">{app.job.company}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{app.job.location}</span>
                      <span className="mx-2">•</span>
                      <span>{app.job.type}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Applied{" "}
                        {formatDistanceToNow(new Date(app.appliedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        app.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : app.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link
                    href={`/job/${app.job.id}`}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
