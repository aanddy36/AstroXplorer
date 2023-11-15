import { Link, Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleModal } from "./Modal/modalSlice";
import { useEffect } from "react";

export const Layout = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((store: RootState) => store.modal);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <main className="relative">
      {isModalOpen && (
        <div className="bg-black/70 h-screen w-screen overflow-hidden fixed top-0 left-0 z-[999]">
          <div
            className="bg-[#1f1f1f] h-[340px] w-[350px] tablet:w-[400px] laptop:w-[500px] absolute left-[50%] 
          translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col gap-12 text-white items-center p-5
           shadow-xl shadow-black"
          >
            <div className="w-full flex justify-end">
              <FaXmark
                className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer"
                onClick={() => dispatch(toggleModal(false))}
              />
            </div>
            <h1 className="text-2xl font-semibold text-center">
              Before you can proceed, log in or register
            </h1>
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/signup"
                className="px-3 py-2 transiton duration-200 hover:bg-yellow-200 font-semibold
             text-black w-[150px] text-lg bg-yellow-500 text-center"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 border-2 transiton duration-200 hover:bg-white font-semibold
             w-[150px] text-lg hover:text-black text-center"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
      <main className="bg-[url('/src/images/bgImages/starred-bg.jpg')] bg-black">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </main>
  );
};
