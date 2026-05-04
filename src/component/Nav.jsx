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

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            Sunaura
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/products">Products</NavLink>
            </li>
            {session && (
              <li>
                <NavLink href="/profile">Profile</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt={session.user?.name || "User"}
                    src={
                      session.user?.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li className="px-3 py-1 text-sm font-semibold text-gray-700">
                  {session.user?.name}
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="text-red-500">
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
