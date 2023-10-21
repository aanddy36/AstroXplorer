import { FaChevronLeft, FaChevronRight, FaSliders } from "react-icons/fa6";
import { TourCard2 } from "../features/Tours/TourCard2";
import { ITours } from "../moduls";
import { Spinner } from "../ui/Spinner";
import { useEffect, useState, useRef } from "react";
import { filterOptions } from "../utils/filterBtnsOptions";
import { FilterBtn } from "../ui/FilterBtn";
import { SortBtn } from "../ui/SortBtn";
import { FilterTag } from "../ui/FilterTag";
import { TourSearchBar } from "../features/FilterAndSorting/TourSearchBar";
import { ToursFoundText } from "../ui/ToursFoundText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  changePage,
  clearAllFilters,
  closeThemAll,
  getAllTours,
} from "../features/FilterAndSorting/filterSortingSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const Tours = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { page, addedFilters, filteredTours, isLoading } = useSelector(
    (store: RootState) => store.filterSorting
  );
  const filterNSort = useRef<null | HTMLDivElement>(null);
  const [_, setIsOpenSidebar] = useState(false);

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
    <main className="relative">
      <div
        className="h-[400px] relative z-[1] w-full bg-[url('src/images/bgImages/titan-bg.jpg')] bg-cover bg-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
      >
        <h1
          className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center
        font-bold text-5xl tablet:text-6xl font-serif tracking-wide"
        >
          Tours
        </h1>
        <TourSearchBar />
      </div>
      <div className="bg-[url('src/images/starred-bg2.jpg')] pt-24 px-[8%]">
        <div
          className="text-white shadow-md shadow-black/30 grid grid-cols-5
          h-[60px] text-lg text-[--third-color] bg-white/20 border-[#ffffff34] mb-4 
          relative"
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
            onClick={() => setIsOpenSidebar((prev) => !prev)}
          >
            <FaSliders />
            Filter & Sort
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex items-center gap-5 flex-wrap">
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
            </div>
            {filteredTours?.length ? (
              <div className="pb-10">
                <div className="grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8 pt-12">
                  {filteredTours
                    ?.slice((page - 1) * 9, page * 9)
                    .map((tour: ITours) => (
                      <TourCard2 key={tour.id} {...tour} />
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
    </main>
  );
};
