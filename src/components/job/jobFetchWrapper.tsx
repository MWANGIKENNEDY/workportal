import { getAllJobs } from "@/lib/db/query";
import JobsNotFound from "./jobsNotFound";
import JobList from "./jobList";
import Paginate from "../paginate";

const JobFetchWrapper = async ({
  pageNum,
  limitNum,
  query,
  type,
  location,
}: {
  pageNum: number;
  limitNum: number;
  query?: string;
  type?: string;
  location?: string;
}) => {
  try {
    const { jobs, total } = await getAllJobs({
      page: pageNum,
      limit: limitNum,
      query,
      type,
      location,
    });

    if (jobs.length === 0) return <JobsNotFound />;

    // 👇 calculate page count correctly
    const pageCount = Math.ceil(total / limitNum);

    return (
      <div className="space-y-8">
        <JobList jobs={jobs} />
        <Paginate pageCount={pageCount} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return <JobsNotFound />;
  }
};

export default JobFetchWrapper;
