import { useRef, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import { filterOptions } from "../../utils/filterBtnsOptions";
import { FilterBtnSidebar } from "../../ui/FilterBtnSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeThemAllSidebar, toggleFilterSidebar } from "./filterSidebarSlice";

export const TourSidebar = () => {
  const sidebar = useRef<null | HTMLDivElement>(null);
  const { isOpen } = useSelector((store: RootState) => store.filterSidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebar.current && !sidebar.current.contains(e.target as Node)) {
        dispatch(toggleFilterSidebar(false));
        dispatch(closeThemAllSidebar())
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <main
      className={`transition-all duration-300 overflow-hidden fixed ${
        isOpen ? "w-[80%] tablet:w-[50%]" : "w-0"
      }
      h-screen z-[3] right-0`}
    >
      <div
        className={` bg-[#1f1f1f] w-full min-w-[300px] tablet:min-w-[240px] absolute inset-0
           h-screen full:hidden text-[--main-font-color] pt-[30px] text-right `}
        ref={sidebar}
      >
        <section className="flex justify-between tablet:justify-end items-center px-[7%] tablet:px-[10%]">
          <button
            onClick={() => dispatch(toggleFilterSidebar(false))}
            className="scale-[1.5] transition duration-300 hover:rotate-90"
          >
            <FaX />
          </button>
        </section>
        <ul className=" text-xl pt-10 text-right">
          {filterOptions.map((btn) => {
            return (
              <FilterBtnSidebar
                key={btn.name}
                {...btn}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
};
