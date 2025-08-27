import DashboardSkeleton from '@/components/job/dashboardSkeleton';
import DashboardWrapper from '@/components/job/dashboardWrapper';
import React from 'react'
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWrapper />
    </Suspense>
  )
}

export default DashboardPage