"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail, MdPerson, MdCalendarToday, MdVerified, MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin?callbackUrl=/profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-sky-500" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="animate__animated animate__fadeInDown bg-gradient-to-br from-sky-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white text-center relative overflow-hidden shadow-xl mb-6">
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <img
              src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "U")}&background=0ea5e9&color=fff&size=128`}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white/40 mx-auto mb-4"
            />
            <h1 className="text-xl sm:text-2xl font-extrabold">{user.name}</h1>
            <p className="text-sky-100 text-sm mt-1">{user.email}</p>
          </div>
        </div>

        <div className="animate__animated animate__fadeInUp bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-100 mb-6">
          <InfoRow icon={<MdPerson className="text-sky-500 text-xl" />} label="Full Name" value={user.name} />
          <InfoRow icon={<MdEmail className="text-sky-500 text-xl" />} label="Email Address" value={user.email} />
          <InfoRow
            icon={<MdVerified className="text-sky-500 text-xl" />}
            label="Verified"
            value={
              user.emailVerified
                ? <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Verified</span>
                : <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Not Verified</span>
            }
          />
          <InfoRow icon={<MdCalendarToday className="text-sky-500 text-xl" />} label="Joined" value={joinedDate} />
        </div>

        <div className="animate__animated animate__fadeInUp text-center">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-md"
          >
            <MdEdit className="text-lg" />
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5">
    <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
      <div className="text-sm font-semibold text-gray-800 truncate">{value}</div>
    </div>
  </div>
);

export default ProfilePage;
