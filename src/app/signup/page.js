"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { MdEmail, MdLock, MdPerson, MdImage, MdErrorOutline } from "react-icons/md";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Use FormData to avoid e.target.name colliding with HTMLFormElement.name
    const fd = new FormData(e.target);
    const name = fd.get("fullname");
    const image = fd.get("image");
    const email = fd.get("email");
    const password = fd.get("password");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Sign up failed. Please try again.");
    } else {
      window.location.href = "/signin";
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
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 text-center text-white max-w-sm">
          <div className="text-5xl font-extrabold tracking-tight mb-3">Sunaura</div>
          <p className="text-purple-200 text-lg mb-10">Join thousands of happy shoppers</p>

          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { icon: "🛍️", title: "Curated Products", desc: "Hand-picked collections" },
              { icon: "🚚", title: "Fast Delivery", desc: "Get it at your door" },
              { icon: "🔒", title: "Secure Payments", desc: "100% safe checkout" },
              { icon: "🎁", title: "Member Rewards", desc: "Earn on every order" },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-white text-sm font-semibold">{item.title}</div>
                <div className="text-purple-200 text-xs mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative rings */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border border-white/20" />
        <div className="absolute bottom-16 right-12 w-14 h-14 rounded-full border border-white/20" />
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

          <h1 className="text-3xl font-bold text-gray-800 mb-1">Create account</h1>
          <p className="text-gray-500 text-sm mb-8">Sign up to start shopping with us</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              <MdErrorOutline className="text-lg shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <MdPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  name="fullname"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Photo URL <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MdImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  name="image"
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1.5 ml-1">
                Must be at least 8 characters with 1 uppercase letter and 1 number
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Registering...
                </>
              ) : (
                "Register"
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
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
