import Link from "next/link";
import NavLink from "./NavLink";

const Nav = () => {
  return (
    <div className="">
      <div className="navbar bg-base-100 shadow-sm ">
        <div className="navbar-start">

          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink href={"/"}>Home</NavLink></li>
            <li>
              <NavLink href={"/products"}>Products</NavLink>
            </li>
            <li><NavLink href={"/profile"}> Profile</NavLink></li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 my-4">
            <h2>signin</h2>
            <h2>signup</h2>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav