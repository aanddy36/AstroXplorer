import { useState, useRef, useEffect } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { NavlinkTopbar } from "../../ui/NavlinkTopbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./navbarSlice";
import { RootState } from "../../store";
import { toggleLogIn } from "./navbarSlice";

export const Topbar = () => {
  const dispatch = useDispatch()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {isLoggedIn} = useSelector((store:RootState)=>store.navbar)
  const dropdown = useRef<null | HTMLUListElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdown.current && !dropdown.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <div className="bg-transparent absolute text-[--main-font-color] z-[2] w-full">
      <ul className="flex w-full justify-between px-[10%] h-32 items-center">
        <li className="flex tablet:w-[60%] full:w-[50%] justify-between items-center">
          <div className="text-2xl font-spacex">
            <Link to="/">astroX</Link>
          </div>
          <div className="hidden laptop:flex gap-4 full:gap-8 text-lg">
            <NavlinkTopbar route="/">Home</NavlinkTopbar>
            <NavlinkTopbar route="tours">Tours</NavlinkTopbar>
            <NavlinkTopbar route="about">About</NavlinkTopbar>
          </div>
        </li>
        <li className="hidden laptop:flex gap-4 full:gap-8 text-lg items-center">
          {!isLoggedIn ? (
            <>
              <NavlinkTopbar route="login">Log In</NavlinkTopbar>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold border-2 border-[--main-font-color] py-1 px-6 bg-[--main-font-color] text-[--third-color]"
                    : `transition duration-200 border-2 py-1 px-6 hover:bg-[--main-font-color]
              border-[--secundary-color] hover:text-[--third-color]`
                }
              >
                Sing Up
              </NavLink>
            </>
          ) : (
            <div className={` relative bottom-[35%] translate-y-[35%]`}>
              <button
                className="flex items-center gap-3 group"
                onClick={() => setIsProfileOpen((prev) => !prev)}
              >
                <span className="px-3 py-2 rounded-full bg-[--bg-icons]">
                  AD
                </span>
                <span
                  className={`transition duration-200 group-hover:text-[--main-font-color]
              ${isProfileOpen ? "text-[--main-font-color]" : "text-[--secundary-color]"}`}
                >
                  My Account
                </span>
                <FaChevronDown
                  className={` transition-all duration-200 group-hover:text-[--main-font-color] scale-x-[0.8]
              ${
                isProfileOpen ? "rotate-180 text-[--main-font-color]" : "rotate-0 text-[--secundary-color]"
              }`}
                />
              </button>
              <ul
                ref={dropdown}
                className={`bg-[--main-font-color] text-[--third-color] mt-3 transition-all duration-200 
            ${isProfileOpen ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <li className="border-b py-2">
                  <Link
                    to="profile"
                    className="block text-center transition-all duration-200 hover:font-bold"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li className="border-b py-2">
                  <button
                    className="block w-full text-center transition-all duration-200 hover:font-bold"
                    onClick={() => {
                      setIsProfileOpen(false);
                      dispatch(toggleLogIn(false));
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="block laptop:hidden scale-x-[2] scale-y-[1.5] cursor-pointer">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className=" transition duration-300
      hover:rotate-90"
          >
            <FaBars />
          </button>
        </li>
      </ul>
    </div>
  );
};
