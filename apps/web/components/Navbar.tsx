/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/blogs/create"}>Write</Link>
            </li>
            <li>
              <Link href={"/blogs/drafts"}>Drafts</Link>
            </li>
          </ul>
        </div>
        <Link href={"/blogs"} className="btn btn-ghost text-xl">
          Dev Docs
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 gap-5">
          <li>
            <Link href={"/blogs/create"}>Write</Link>
          </li>
          <li>
            <Link href={"/blogs/drafts"}>Drafts</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/blogs/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href={"/blogs/your-blogs"}>Your blogs</Link>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
