"use client";

import React from "react";
import { useRouter } from "next/navigation";

const JobsNotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m-9 5h18a2 2 0 002-2V5a2 
               2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 
               002 2z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No jobs available
      </h2>
      <p className="text-gray-500 max-w-md">
        We couldn’t find any job postings at the moment.  
        Please check back later or adjust your search filters.
      </p>

      <button
        onClick={() => router.push("/job/create")}
        className="mt-6 cursor-pointer rounded-md bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700 transition"
      >
        Got a new job opening  ?
      </button>
    </div>
  );
};

export default JobsNotFound;
