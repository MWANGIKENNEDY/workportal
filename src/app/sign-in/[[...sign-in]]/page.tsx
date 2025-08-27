import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <SignIn signUpUrl="/sign-up" />
        
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Continue to sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
