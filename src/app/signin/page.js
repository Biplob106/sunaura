"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { MdEmail, MdLock, MdErrorOutline } from "react-icons/md";

export default function SignInPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message || "Invalid email or password. Please try again.");
    } else {
      window.location.href = "/";
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-500 via-teal-500 to-cyan-600 px-4 py-12">
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative rings */}
      <div className="absolute top-10 right-16 w-20 h-20 rounded-full border border-white/20 pointer-events-none" />
      <div className="absolute bottom-16 left-12 w-14 h-14 rounded-full border border-white/20 pointer-events-none" />

      {/* Form card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 py-10">
        <div className="text-center mb-8">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
            Sunaura
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
            <MdErrorOutline className="text-lg shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
            <div className="relative">
              <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <GrGoogle className="text-lg" />
          Continue with Google
        </button>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-sky-600 hover:text-sky-700 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
