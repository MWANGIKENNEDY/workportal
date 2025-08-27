"use client"

import React from "react"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathName = usePathname()
  console.log(pathName)

  // Hide header on sign-in or sign-up pages
  if (pathName === "/sign-in" || pathName === "/sign-up") {
    return null
  }

  return (
    <header className="bg-white shadow-sm sticky top-0">
      <div className="container mx-auto bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center">
            <div className="size-8 rounded-full bg-teal-400" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Jobs</span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-2">
            {/* Always visible */}
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Browse jobs
            </Link>

            {/* Only signed in */}
            <SignedIn>
              <Link
                href="/job/create"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Post a job
              </Link>
           
              <Link
                href="/job/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>

              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Only signed out */}
            <SignedOut>
              <SignInButton>
                <span className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  Sign in
                </span>
              </SignInButton>

            </SignedOut>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
