import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div className=' min-h-screen flex flex-col items-center justify-start pt-60 text-center'>

        <h1 className=' font-extrabold text-6xl mb-8'>404</h1>

        <h2 className=' text-2xl font-semibold mb-10'>Page Not Found!</h2>

        <p className="text-muted-foreground max-w-md mb-8">

            The page you are looking for doesn&apos;t exist or has been moved!
        </p>

        <Button asChild>

            <Link href="/">Navigate to home</Link>
        </Button>
      
    </div>
  )
}

export default Notfound