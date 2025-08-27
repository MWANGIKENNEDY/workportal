import React from 'react'

const SinglePageLoading = () => {
  return (
   <main className="mx-auto font-sans bg-gray-50 min-h-screen">
  <div className="bg-white shadow-lg rounded-xl p-8 md:p-10 border border-gray-100 animate-pulse">

    {/* Title & Company */}
    <div className="border-b pb-6 mb-8">
      <div className="h-8 w-2/3 bg-gray-200 rounded mb-3"></div>
      <div className="h-5 w-1/3 bg-gray-200 rounded"></div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="h-5 w-28 bg-gray-200 rounded"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-5 w-32 bg-gray-200 rounded"></div>
      </div>

      <div className="mt-3 h-4 w-1/2 bg-gray-200 rounded"></div>
    </div>

    {/* Job Description */}
    <div className="space-y-4">
      <div className="h-6 w-40 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
      </div>
    </div>

    {/* Responsibilities */}
    <div className="mt-8 space-y-2">
      <div className="h-5 w-32 bg-gray-200 rounded"></div>
      <ul className="space-y-2 pl-5">
        <li className="h-4 w-5/6 bg-gray-200 rounded"></li>
        <li className="h-4 w-2/3 bg-gray-200 rounded"></li>
        <li className="h-4 w-3/4 bg-gray-200 rounded"></li>
      </ul>
    </div>

    {/* Skills */}
    <div className="mt-8">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3"></div>
      <div className="flex flex-wrap gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    {/* Apply Button */}
    <div className="mt-10">
      <div className="h-12 w-full sm:w-40 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
</main>

  )
}

export default SinglePageLoading