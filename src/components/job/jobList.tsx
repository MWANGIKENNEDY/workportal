import { JobArrayWithRelations } from "@/lib/types";
import Link from "next/link";
import React from "react";



const JobListContent = ({ jobs }: { jobs: JobArrayWithRelations }) => {
  return (
    <>
      {jobs.map((job) => (
        <Link
          href={`/job/${job.id}`}
          key={job.id}
          className="rounded-md border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all mb-4 block"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h2>
              <p className="text-gray-600">{job.company}</p>
            </div>

            <p className="flex items-center gap-2 text-gray-700 font-medium">
              💰 ${job.salary}
            </p>
          </div>

          <div className="mt-4 flex gap-2 text-xs text-gray-500">
            <p className="flex items-center gap-2">📍 {job.location}</p>

            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 font-medium text-green-800">
              {job.type}
            </span>
          </div>

          <div className="text-sm text-gray-400 mt-1 bg-white">
            {job.description}
          </div>
        </Link>
      ))}
    </>
  );
};

const JobList = ({ jobs }: { jobs: JobArrayWithRelations }) => {
  return (
  
   
<>

 <JobListContent jobs={jobs} />


 
</>
    
       

    
  
  );
};

export default JobList;
