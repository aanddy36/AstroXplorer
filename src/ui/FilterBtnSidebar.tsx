import { ChangeEvent } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addOrDeleteFilter } from "../features/FilterAndSorting/filterSortingSlice";
import { openOrClose } from "../features/FilterSidebar/filterSidebarSlice";
import { Filters, OptionsFilter } from "../moduls";

export const FilterBtnSidebar = ({
  tag,
  name,
  options,
}: {
  tag: string;
  name: string;
  options: OptionsFilter[];
}) => {
  const { areTheyOpenSidebar } = useSelector(
    (store: RootState) => store.filterSidebar
  );
  const { addedFilters } = useSelector(
    (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();
  return (
    <div
      className={`border-b border-[#7e7e7e3d] py-2 px-4 transiton-all duration-200 overflow-hidden 
                  ${
                    areTheyOpenSidebar[name]
                      ? "bg-[#7e7e7e3d] h-[200px]"
                      : "bg-transparent h-[45px]"
                  }`}
    >
      <button
        className="flex w-full transiton duration-300 hover:pr-4 justify-between items-center"
        onClick={(e) => {
          dispatch(openOrClose((e.target as HTMLButtonElement).name));
        }}
        name={name}
      >
        <FaChevronDown
          className={`scale-x-[0.7] scale-y-[0.9] transiton duration-300 ${
            areTheyOpenSidebar[name] ? "rotate-180" : "rotate-0"
          }`}
        />
        {tag}
      </button>
      <ul className="text-base pr-3 transition-all duration-200 mt-5 grid gap-2">
        {options.map((option) => (
          <label
            key={option.idSidebar}
            className="flex justify-start items-center gap-4 font-light cursor-pointer pl-4"
            htmlFor={option.idSidebar}
          >
            <input
              type="checkbox"
              id={option.idSidebar}
              value={option.idShared}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(addOrDeleteFilter(e.target.value as Filters))
              }
              checked={addedFilters.includes(option.idShared)}
              className="check-form cursor-pointer"
            />
            {option.idShared}
          </label>
        ))}
      </ul>
    </div>
  );
};
