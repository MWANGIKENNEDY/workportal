import JobForm from '@/components/job/jobCreate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const JobCreatePage = () => {
  return (
     <main className="py-0">
      <div className=" max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className=" text-3xl font-bold">
              Create A New Job
            </CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
            {/* <CardAction>Card Action</CardAction> */}
          </CardHeader>
          <CardContent>
            <JobForm/>
          </CardContent>
          {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
        </Card>
      </div>
    </main>
  )
}

export default JobCreatePage