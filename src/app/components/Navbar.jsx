"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";
import { IoCloseSharp, IoLogInOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { GrContact } from "react-icons/gr";
import { TbLogs } from "react-icons/tb";
import { MdAdminPanelSettings } from "react-icons/md";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const navLinks = [
    { page: "Home", path: "/", icon: <FaHome /> },
    { page: "About", path: "/about", icon: <FcAbout /> },
    { page: "Contact", path: "/contact", icon: <GrContact /> },
    { page: "Blog", path: "/blog", icon: <TbLogs /> },
  ]
  const pathname = usePathname();
  const { data: session } = useSession()
  const [dispMobileLinks, setDispMobileLinks] = useState(false);

  return (
    <>

      <div className="z-50 flex justify-between sticky top-0 bg-[#0d0c22] bg-blur px-3 py-3">
        <div>
          <Link href="/" className="text-4xl font-bold">
            Leo
          </Link >
        </div>
        {/* Desktop Nav */}
        <div className="flex space-x-2 items-center max-md:hidden ">
          {
            navLinks.map((item) => {
              const isActive = pathname === item.path;
              return (<Link
                key={item.path}
                href={item.path}
                className={isActive ? "text-lg px-4 bg-white text-black rounded-xl py-2 items-center flex gap-1 hover:border-2 hover:border-white hover:rounded-lg  " : "text-lg px-4 hover:border-2 hover:border-white hover:rounded-lg py-2 items-center flex gap-1"}
              >
                {item.icon}{item.page}
              </Link>)
            })

          }
          {
            session ?
              (<>
                {session?.isAdmin &&
                  <Link href="/admin" className={pathname === "/admin" ? "text-lg px-4 bg-white text-black rounded-xl py-2" : "text-lg px-4 hover:border-2 hover:border-white hover:rounded-lg py-2"}>
                    Admin
                  </Link>}
                <button onClick={() => signOut()} className=" bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white ">
                  Logout
                </button>
              </>
              ) : (
                <Link href="/login" className="bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white">
                  Log In
                </Link>
              )
          }
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <button onClick={() => setDispMobileLinks((prev) => prev = !prev)}>
            <GiHamburgerMenu size={35} />
          </button>
        </div>
        {
          dispMobileLinks &&
          <div className="fixed md:hidden backdrop-blur-xl px-3 py-6 w-[50%] h-screen top-0 right-0">

            <div className="flex justify-end items-center" >
              <button onClick={() => setDispMobileLinks((prev) => prev = !prev)}>
                <IoCloseSharp size={40} />
              </button>
            </div>

            <div className="flex flex-col p-4 items-center mt-10 space-y-4 justify-center">
              {
                navLinks.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={isActive ? "px-2 py-2 text-lg bg-white text-black rounded-xl flex items-center gap-1 hover:border-2 hover:border-white hover:rounded-lg" : "px-2 py-2 text-lg hover:border-2 hover:border-white hover:rounded-lg flex items-center gap-1"}
                      onClick={() => setDispMobileLinks((prev) => prev = !prev)}
                    >
                      {item.icon}{item.page}
                    </Link>)
                })
              }
              {
                session ?
                  (<>
                    {session?.isAdmin &&
                      <Link href="/admin" className={pathname === "/admin" ? "px-2 py-2 text-lg bg-white text-black rounded-xl flex items-center gap-1" : "px-2 py-2 text-lg hover:border-2 hover:border-white hover:rounded-lg flex items-center gap-1"}>
                        <MdAdminPanelSettings size={20} /> Admin
                      </Link>}
                    <button className=" bg-white text-black rounded-md p-3 font-bold hover:bg-transparent hover:border hover:text-white">
                      Logout
                    </button>
                  </>
                  ) : (
                    <Link href="/login" className="bg-white text-black rounded-md px-3 py-3 font-bold hover:bg-transparent hover:border hover:text-white flex items-center gap-1 group">
                      Log In <IoLogInOutline size={25} className="group-hover:translate-x-1 transition" />
                    </Link>
                  )
              }
            </div>
          </div>
        }
      </div>


    </>
  )
}

export default Navbar