import { useEffect, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaBars,
  FaChevronDown,
  FaUser,
} from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { NavlinkTopbar } from "../../ui/NavlinkTopbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "./navbarSlice";
import { RootState } from "../../store";
import { LogoLink } from "../../ui/LogoLink";
import { getCurrentUser, logout } from "../Auth/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ClipLoader } from "react-spinners";

export const Topbar = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isLoggedIn, name, surname, isLoading } = useSelector(
    (store: RootState) => store.auth
  );
  {
    useEffect(() => {
      dispatch(getCurrentUser());
    }, []);
  }

  return (
    <div className="bg-transparent absolute text-[--main-font-color] z-[2] w-full">
      <ul className="flex w-full justify-between px-[10%] h-32 items-center">
        <li className="flex tablet:w-[60%] full:w-[50%] justify-between items-center">
          <LogoLink />
          <div className="hidden laptop:flex gap-4 full:gap-8 text-lg">
            <NavlinkTopbar route="/">Home</NavlinkTopbar>
            <NavlinkTopbar route="tours">Tours</NavlinkTopbar>
            <NavlinkTopbar route="about">About</NavlinkTopbar>
          </div>
        </li>
        <li className="hidden laptop:flex gap-4 full:gap-8 text-lg items-center">
          {!isLoggedIn ? (
            <div className=" laptop:flex gap-4 full:gap-8 items-center">
              {!isLoading ? (
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
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <div className="w-full grid place-content-center">
                  <ClipLoader size={45} loading={true} color={"#ffffff"} />
                </div>
              )}
            </div>
          ) : (
            <div className="relative h-12">
              <button
                className="flex items-center gap-3 group mb-4 cursor-auto "
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <span className="px-3 py-2 rounded-full bg-[--bg-icons]">
                  {name.slice(0, 1).toLocaleUpperCase()}
                  {surname.slice(0, 1).toLocaleUpperCase()}
                </span>
                <span
                  className={`transition duration-200 group-hover:text-[--main-font-color]
              ${
                isProfileOpen
                  ? "text-[--main-font-color]"
                  : "text-[--secundary-color]"
              }`}
                >
                  My Account
                </span>
                <FaChevronDown
                  className={` transition-all duration-200 group-hover:text-[--main-font-color] scale-x-[0.8]
              ${
                isProfileOpen
                  ? "rotate-180 text-[--main-font-color]"
                  : "rotate-0 text-[--secundary-color]"
              }`}
                />
              </button>
              <ul
                className={` bg-[#1f1f1f] text-white mt-0 transition-all duration-200 shadow-lg shadow-black
            ${isProfileOpen ? "visible opacity-100" : "invisible opacity-0"}`}
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <li className="border-b border-[#7e7e7e3d]">
                  <Link
                    to="profile"
                    className="flex items-center justify-center gap-8 transition-all duration-200 hover:bg-[#646464] py-3"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaUser />
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="flex w-full items-center justify-center gap-8 transition-all duration-200 hover:bg-[#646464] py-3"
                    onClick={() => {
                      setIsProfileOpen(false);
                      dispatch(logout());
                    }}
                  >
                    <FaArrowRightFromBracket />
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
