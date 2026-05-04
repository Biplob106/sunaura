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
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="text-5xl font-extrabold tracking-tight mb-3">Sunaura</div>
          <p className="text-purple-200 text-lg mb-10">Your premium shopping destination</p>

          <div className="space-y-4 text-left">
            {[
              "Access exclusive deals & offers",
              "Track your orders in real-time",
              "Seamless & secure checkout",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                <span className="text-white/90 text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-white/20" />
        <div className="absolute top-16 right-10 w-16 h-16 rounded-full border border-white/20" />
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Sunaura
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              <MdErrorOutline className="text-lg shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <Link
              href="/signup"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
