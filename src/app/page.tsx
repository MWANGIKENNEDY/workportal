import JobFetchWrapper from "@/components/job/jobFetchWrapper";
import JobSearchCard from "@/components/job/jobFilter";

import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({
  searchParams,
  // params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  // params: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { page, limit, query, type, location } = await searchParams;

  // Ensure string values
  const currentPage = typeof page === "string" ? page : undefined;
  const currentLimit = typeof limit === "string" ? limit : undefined;
  const pageNum = currentPage ? parseInt(currentPage, 10) : 1;
  const limitNum = currentLimit ? parseInt(currentLimit, 10) : 5;


  // Redirect if params missing/invalid
  if (!currentPage || !currentLimit || pageNum < 1 || limitNum < 1) {
    redirect(`/?page=1&limit=5`);
  }

  return (
    <div className="font-sans">
         <JobSearchCard />
   
      
        <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        }
      >  <JobFetchWrapper
          pageNum={pageNum}
          limitNum={limitNum}
          query={query as string}
          type={type as string}
          location={location as string}
        /> </Suspense>
      
    
    </div>
  );
}
