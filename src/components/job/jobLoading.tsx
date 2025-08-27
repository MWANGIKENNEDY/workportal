import React from 'react'

const JobLoading = () => {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm transition-all animate-pulse mb-4">
 
      <div className="flex items-start justify-between">
        <div>
          <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
        </div>

        <div className="h-5 w-20 bg-gray-300 rounded"></div>
      </div>

   
      <div className="mt-4 flex gap-2 text-xs">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
      </div>

   
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-3 w-4/6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default JobLoading