import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  clearAllFilters,
  closeThemAll,
} from "../FilterAndSorting/filterSortingSlice";
import { FilterBtn } from "../../ui/FilterBtn";
import { SortBtn } from "../../ui/SortBtn";
import { FaChevronLeft, FaChevronRight, FaSliders } from "react-icons/fa6";
import { Spinner } from "../../ui/Spinner";
import { filterOptions } from "../../utils/filterBtnsOptions";
import { toggleFilterSidebar } from "../FilterSidebar/filterSidebarSlice";
import { RootState } from "../../store";
import { ToursFoundText } from "../../ui/ToursFoundText";
import { FilterTag } from "../../ui/FilterTag";
import { ITours } from "../../moduls";
import { TourCard } from "./TourCard";

export const TourCatalog = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store: RootState) => store.filterSidebar);
  const { page, addedFilters, filteredTours, isLoading } = useSelector(
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
      <motion.div
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-white shadow-md shadow-black/30 grid grid-cols-5
          h-[60px] text-lg text-[--third-color] bg-white/20 border-[#ffffff34] mb-4 
          relative z-[10]"
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 flex-wrap"
          >
            <ToursFoundText filteredTours={filteredTours} page={page} />
            {addedFilters.map((filter) => (
              <FilterTag key={filter} text={filter} />
            ))}
            {addedFilters.length && (
              <button
                className="text-white font-light transition-all duration-300 underline tracking-wider
              hover:text-[18px]"
                onClick={() => dispatch(clearAllFilters())}
              >
                Clear all
              </button>
            )}
          </motion.div>
          {filteredTours?.length ? (
            <div className="pb-10 relative">
              <div className="grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8 pt-12">
                {filteredTours
                  ?.slice((page - 1) * 9, page * 9)
                  .map((tour: ITours) => (
                    <TourCard key={tour.id} {...tour} />
                  ))}
              </div>
              {filteredTours?.length > 8 && (
                <div className="flex text-white items-center justify-between w-fit gap-10 mx-auto text-xl">
                  <button
                    className="transition-all duration-200 hover:enabled:bg-white py-3 px-3
                   hover:enabled:text-black border-2 border-white/60 disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => {
                      dispatch(changePage("previous"));
                      window.scrollTo(0, 370);
                    }}
                  >
                    <FaChevronLeft />
                  </button>
                  <span>{page}</span>
                  <button
                    className="transition-all duration-200 hover:enabled:bg-white py-3 px-3
                   hover:enabled:text-black border-2 border-white/60 disabled:opacity-50"
                    disabled={page === Math.ceil(filteredTours?.length / 9)}
                    onClick={() => {
                      dispatch(changePage("next"));
                      window.scrollTo(0, 370);
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 tablet:py-24 mx-5 text-white text-xl tablet:text-2xl">
              Sorry, we couldn't find any exact matches. Please try removing
              some filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
