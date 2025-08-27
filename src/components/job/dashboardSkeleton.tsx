// components/dashboard/DashboardSkeleton.tsx
import React from "react";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export default function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8" /> {/* Dashboard title */}

        <div className="grid gap-8 md:grid-cols-2">
          {/* Posted Jobs Skeleton */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>

            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <SkeletonBox className="h-5 w-40 mb-2" />
                      <SkeletonBox className="h-4 w-28 mb-2" />
                      <div className="flex space-x-2">
                        <SkeletonBox className="h-3 w-16" />
                        <SkeletonBox className="h-3 w-16" />
                        <SkeletonBox className="h-3 w-20" />
                      </div>
                    </div>
                    <SkeletonBox className="h-5 w-24 rounded-full" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <SkeletonBox className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Skeleton */}
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <SkeletonBox className="h-5 w-40 mb-2" />
                      <SkeletonBox className="h-4 w-28 mb-2" />
                      <div className="flex space-x-2">
                        <SkeletonBox className="h-3 w-16" />
                        <SkeletonBox className="h-3 w-16" />
                        <SkeletonBox className="h-3 w-20" />
                      </div>
                    </div>
                    <SkeletonBox className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <SkeletonBox className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
