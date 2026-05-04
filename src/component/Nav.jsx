"use client";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";

const Nav = () => {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const links = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
      <NavLink href="/profile">My Profile</NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent shrink-0"
        >
          Sunaura
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {links}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <img
                src={
                  session.user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "U")}&background=0ea5e9&color=fff`
                }
                alt={session.user?.name || "User"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-300"
              />
              <button
                onClick={handleSignOut}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden md:inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-sky-600 border border-sky-200 hover:bg-sky-50 transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden md:inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 transition-all shadow-sm"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <div className="md:hidden dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-2xl shadow-lg border border-gray-100 z-50 mt-3 w-48 p-2 gap-1">
              <li><NavLink href="/">Home</NavLink></li>
              <li><NavLink href="/products">Products</NavLink></li>
              <li><NavLink href="/profile">My Profile</NavLink></li>
              <div className="divider my-1" />
              {session ? (
                <li>
                  <button onClick={handleSignOut} className="text-red-500 font-semibold">
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li><Link href="/signin" className="font-semibold">Login</Link></li>
                  <li><Link href="/signup" className="font-semibold text-sky-600">Register</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Nav;
