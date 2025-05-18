"use client";

import type React from "react";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/auth";
import { Loader2 } from "lucide-react";

type AuthDetails = {
  errorMsg?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const initialAuthState: AuthDetails = {};

  const handleSubmit = async (
    prevState: AuthDetails,
    formData: FormData
  ): Promise<AuthDetails> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return { errorMsg: "Please fill in all fields" };
    }

    const res = await loginAction(email, password);
    
    if (res?.errorMsg) {
      return { errorMsg: res.errorMsg };
    } else {
      toast.success("Logged In successfully");
      router.replace("/");
      return {};
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialAuthState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2c5032] to-[#e08a42]"></div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#2c5032] to-[#2c5032]/90 px-6 py-8 text-white">
            <h2 className="text-3xl font-bold tracking-tight text-center">
              Log In
            </h2>
          </div>

          <form className="px-6 py-8 space-y-6" action={formAction}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5032] focus:border-[#2c5032] transition-all duration-200 text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5032] focus:border-[#2c5032] transition-all duration-200 text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {state?.errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{state.errorMsg}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#2c5032] hover:bg-[#2c5032]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c5032] disabled:bg-[#2c5032]/70 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
