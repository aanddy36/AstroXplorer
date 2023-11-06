import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeThemAll } from "../FilterAndSorting/filterSortingSlice";
import { FilterBtn } from "../../ui/FilterBtn";
import { SortBtn } from "../../ui/SortBtn";
import { FaSliders } from "react-icons/fa6";
import { Spinner } from "../../ui/Spinner";
import { filterOptions } from "../../utils/filterBtnsOptions";
import { toggleFilterSidebar } from "../FilterSidebar/filterSidebarSlice";
import { RootState } from "../../store";
import { ToursFoundText } from "../../ui/ToursFoundText";
import { ITours } from "../../moduls";
import { TourCard } from "./TourCard";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ToursTagsContainer } from "../../ui/ToursTagsContainer";
import { NextAndPreviousBtn } from "../../ui/NextAndPreviousBtn";

export const TourCatalog = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isOpen } = useSelector((store: RootState) => store.filterSidebar);
  const { page, filteredTours, isLoading } = useSelector(
    (store: RootState) => store.filterSorting
  );

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
  return (
    <div className="pt-24 px-[8%]">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white shadow-md shadow-black/30 grid grid-cols-5
          h-[60px] text-lg text-[--third-color] bg-white/20 border-[#ffffff34] mb-4 
          relative z-[2]"
            ref={filterNSort}
          >
            {filterOptions.map((btn) => (
              <FilterBtn key={btn.name} {...btn} />
            ))}
            <SortBtn />
            <button
              className="w-full bg-black text-[#fff] flex full:hidden border border-[#ffffff34]
          items-center transition-all duration-300 hover:underline absolute inset-0 justify-center gap-5
          hover:border-[#ffffffc2]"
              onClick={() => dispatch(toggleFilterSidebar(!isOpen))}
            >
              <FaSliders />
              Filter & Sort
            </button>
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 flex-wrap"
            >
              <ToursFoundText />
              <ToursTagsContainer />
            </motion.div>
            {filteredTours?.length ? (
              <div className="pb-10 relative">
                <div className="grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8 pt-12">
                  {filteredTours
                    ?.slice((page - 1) * 9, page * 9)
                    .map((tour: ITours) => (
                      <TourCard
                        key={tour.id}
                        {...tour}
                      />
                    ))}
                </div>
                <NextAndPreviousBtn />
              </div>
            ) : (
              <div className="text-center py-16 tablet:py-24 mx-5 text-white text-xl tablet:text-2xl">
                Sorry, we couldn't find any exact matches. Please try removing
                some filters.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
