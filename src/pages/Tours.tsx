import { useEffect, useRef } from "react";
import { TourSearchBar } from "../features/FilterAndSorting/TourSearchBar";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  closeThemAll,
  getAllTours,
} from "../features/FilterAndSorting/filterSortingSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TourSidebar } from "../features/FilterSidebar/TourSidebar";
import { Services } from "../features/Services";
import { motion } from "framer-motion";
import { ReviewsHome } from "../features/ReviewsHome";
import { FAQ } from "../features/FAQ";
import { TourCatalog } from "../features/Tours/TourCatalog";

export const Tours = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const filterNSort = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        filterNSort.current &&
        !filterNSort.current.contains(e.target as Node)
      ) {
        dispatch(closeThemAll());
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    const handleDropdownMenuMov = () => {
      dispatch(closeThemAll());
    };
    document.addEventListener("scroll", handleDropdownMenuMov);
    return () => document.removeEventListener("scroll", handleDropdownMenuMov);
  }, []);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  return (
    <main className="relative bg-[url('src/images/bgImages/starred-bg.jpg')] ">
      <TourSidebar />
      <div
        className="h-[400px] relative z-[1] w-full bg-[url('src/images/bgImages/titan-bg.jpg')] bg-cover bg-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
      >
        <motion.h1
          initial={{ opacity: 0, translateY: "-200%" }}
          animate={{ opacity: 1, translateY: "-50%" }}
          transition={{ duration: 1.0 }}
          className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center
        font-bold text-5xl tablet:text-6xl font-serif tracking-wide"
        >
          Tours
        </motion.h1>
        <TourSearchBar />
      </div>
      <TourCatalog />
      <Services />
      <div className="px-[10%] full:px-[3%] min-[1200px]:px-[10%] grid grid-cols-1 full:grid-cols-2 gap-14 full:gap-0 mt-20">
        <ReviewsHome />
        <FAQ />
      </div>
    </main>
  );
};
