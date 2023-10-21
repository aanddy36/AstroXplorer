import { useRef, useEffect, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { NavlinkSidebar } from "../../ui/NavlinkSidebar";
import { closeSidebar, toggleLogIn } from "./navbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, isLoggedIn } = useSelector((store: RootState) => store.navbar);
  const sidebar = useRef<null | HTMLDivElement>(null);
  const [isProfileToggleOpen, setIsProfileToggleOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebar.current && !sidebar.current.contains(e.target as Node)) {
        dispatch(closeSidebar());
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      dispatch(closeSidebar());
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <div
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? "w-[80%] tablet:w-[50%]" : "w-0"
      }
      h-screen absolute z-[3] right-0`}
    >
      <div
        className={` bg-[--third-color] w-full min-w-[300px] tablet:min-w-[240px] absolute right-0
           h-screen laptop:hidden text-[--main-font-color] pt-[30px] text-right`}
        ref={sidebar}
      >
        <div className="flex justify-between tablet:justify-end items-center px-[7%] tablet:px-[10%]">
          <div className="text-xl font-spacex tablet:hidden">
            <Link to="/">astroX</Link>
          </div>
          <button
            onClick={() => dispatch(closeSidebar())}
            className="scale-[1.5] transition duration-300 hover:rotate-90"
          >
            <FaX />
          </button>
        </div>
        <ul className=" text-xl pt-10 text-right">
          <NavlinkSidebar route="/">Home</NavlinkSidebar>
          <NavlinkSidebar route="tours">Tours</NavlinkSidebar>
          <NavlinkSidebar route="about">About</NavlinkSidebar>
          <li className="flex flex-col">
            {!isLoggedIn ? (
              <ul>
                <NavlinkSidebar route="login">Log In</NavlinkSidebar>
                <NavlinkSidebar route="signup">Sign Up</NavlinkSidebar>
              </ul>
            ) : (
              <div
                className={`border-b border-[#7e7e7e3d] py-2  px-[6%] transiton duration-200 overflow-hidden 
                  ${
                    isProfileToggleOpen
                      ? "bg-[#7e7e7e3d] h-[150px]"
                      : "bg-transparent h-[60px]"
                  }`}
              >
                <button
                  className="flex w-full transiton duration-300 hover:pr-4 justify-between items-center"
                  onClick={() => setIsProfileToggleOpen((prev) => !prev)}
                >
                  <div className="flex items-center gap-3">
                    <FaChevronDown
                      className={`scale-x-[0.7] scale-y-[0.9] transiton duration-300 ${
                        isProfileToggleOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                    <span className="text-base bg-[#7e7e7e3d] py-2 px-3 rounded-full">
                      AD
                    </span>
                  </div>
                  My Account
                </button>
                <ul className="text-base pr-3 transition-all duration-200">
                  <li className="py-3">
                    <Link
                      to="profile"
                      className="hover:underline"
                      onClick={() => {
                        setIsProfileToggleOpen(false);
                        dispatch(closeSidebar());
                      }}
                    >
                      My Profile
                    </Link>
                  </li>
                  <li className="py-3">
                    <button
                      className="hover:underline"
                      onClick={() => {
                        setIsProfileToggleOpen(false);
                        dispatch(toggleLogIn(false));
                        dispatch(closeSidebar());
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
