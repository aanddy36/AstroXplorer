import { motion } from "framer-motion";
import { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { FaChevronDown } from "react-icons/fa6";
import { openOrClose } from "../features/FilterSidebar/filterSidebarSlice";
import { sortingOptions } from "../utils/filterBtnsOptions";
import { changeCurrentSorting } from "../features/FilterAndSorting/filterSortingSlice";
import { ISorting } from "../moduls";

export const SortSidebarBtn = () => {
  const section = useRef<HTMLDivElement | null>(null);
  const { areTheyOpenSidebar } = useSelector(
    (store: RootState) => store.filterSidebar
  );
  const { currentSorting } = useSelector(
    (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();
  return (
    <motion.div
      className={`border-b border-[#7e7e7e3d] pt-2 pb-6 px-4 overflow-hidden`}
      animate={{
        height: areTheyOpenSidebar.sort
          ? section.current?.scrollHeight
          : "45px",
        backgroundColor: areTheyOpenSidebar.sort ? "#7e7e7e3d" : "#7e7e7e0",
      }}
      transition={{ duration: 0.2 }}
      ref={section}
    >
      <button
        className="flex w-full transiton duration-300 hover:pr-4 justify-between items-center"
        onClick={(e) => {
          dispatch(openOrClose((e.target as HTMLButtonElement).name));
        }}
        name="sort"
      >
        <FaChevronDown
          className={`scale-x-[0.7] scale-y-[0.9] transiton duration-300 ${
            areTheyOpenSidebar.sort ? "rotate-180" : "rotate-0"
          }`}
        />
        Sort
      </button>
      <ul className="text-base pr-3 transition-all duration-200 mt-5 grid gap-2">
        {sortingOptions.map((option) => (
          <label
            key={option.idSidebar}
            className="flex justify-start items-center gap-4 font-light cursor-pointer pl-4 relative"
            htmlFor={option.idSidebar}
          >
            <span className={`h-5 w-5 rounded-full border-2 absolute`}>
              <span
                className={`absolute inset-1 rounded-full ${
                  currentSorting === option.idShared ? "bg-white" : "bg-transparent"
                }`}
              ></span>
            </span>
            <input
              type="radio"
              id={option.idSidebar}
              value={option.idShared}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(changeCurrentSorting(e.target.value as ISorting))
              }
              checked={currentSorting === option.idShared}
              className="check-form cursor-pointer invisible"
            />
            {option.idShared}
          </label>
        ))}
      </ul>
    </motion.div>
  );
};
