import { Prisma } from "@prisma/client"

// One job with relations
export type JobWithRelations = Prisma.JobGetPayload<{
  include: { postedBy: true; applications: true }
}>

// Array of jobs
export type JobArrayWithRelations = JobWithRelations[]