"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, className, children }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-sky-600 ${isActive ? "text-sky-600 font-semibold border-b-2 border-sky-500" : "text-gray-600"} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
