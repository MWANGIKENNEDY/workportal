import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getAllJobs = async ({
  page,
  limit,
  query,
  type,
  location,
}: {
  page: number;
  limit: number;
  query?: string;
  type?: string;
  location?: string;
}) => {
  const where: Prisma.JobWhereInput = {
    AND: [
      query ? { title: { contains: query, mode: "insensitive" } } : {},
      type ? { type } : {},
      location ? { location } : {},
    ],
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { postedAt: "desc" },
      include: {
        postedBy: true,
        applications: true,
      },
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total };
};


// ✅ Get one job by id (or slug if you add a slug field)
export const getOneJob = async (id: string) => {

    console.log("id is",id);
  try {
    const job = await prisma.job.findUnique({
      where: { id }, // or { slug } if you have a slug field
      include: {
        postedBy: true, 
        applications: true,
      },
    })

    return job
  } catch (error) {
    console.error("Error fetching job:", error)
    return null
  }
}

