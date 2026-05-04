"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdArrowBack, MdPerson, MdImage, MdCheckCircle } from "react-icons/md";

const UpdateProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?callbackUrl=/profile/update");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    );
  }

  if (!session) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error: updateError } = await authClient.updateUser({ name, image });

    setLoading(false);
    if (updateError) {
      setError(updateError.message || "Failed to update profile.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/profile"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-600 transition-colors mb-6"
        >
          <MdArrowBack className="text-lg" />
          Back to Profile
        </Link>

        <div className="animate__animated animate__fadeInDown bg-gradient-to-br from-sky-500 via-teal-500 to-cyan-600 rounded-3xl p-6 text-white text-center relative overflow-hidden shadow-xl mb-6">
          <div className="absolute top-[-40px] right-[-40px] w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h1 className="text-xl sm:text-2xl font-extrabold relative z-10">Update Information</h1>
          <p className="text-sky-100 text-sm mt-1 relative z-10">Edit your name and profile photo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate__animated animate__fadeInUp bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-sky-400 transition-colors">
              <MdPerson className="text-sky-400 text-xl shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                required
                className="flex-1 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Profile Image URL
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-sky-400 transition-colors">
              <MdImage className="text-sky-400 text-xl shrink-0" />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
              />
            </div>
          </div>

          {image && (
            <div className="flex justify-center">
              <img
                src={image}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-sky-100"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center bg-red-50 rounded-xl px-4 py-3">{error}</p>
          )}

          {success && (
            <div className="animate__animated animate__bounceIn flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-3">
              <MdCheckCircle className="text-xl" />
              <span className="text-sm font-semibold">Profile updated! Redirecting...</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Update Information"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
