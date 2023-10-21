import { ChangeEvent, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { addOrDeleteFilter, cleanSearchBar, openOneOfThem } from "../features/FilterAndSorting/filterSortingSlice";
import { Filters } from "../moduls";

export const FilterBtn = ({
  tag,
  name,
  options,
}: {
  tag: string;
  name: string;
  options: {
    id: Filters;
  }[];
}) => {
  const { areTheyOpen, addedFilters } = useSelector(
    (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();
  const handleNewFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    
    dispatch(cleanSearchBar());
    dispatch(addOrDeleteFilter(id as Filters));
  };
  useEffect(()=>console.log(addedFilters)
  ,[addedFilters])
  return (
    <div
      className={`relative h-[60px] w-full bg-transparent hidden full:block ${
        areTheyOpen[name] ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <button
        className="flex items-center justify-between text-left border border-[#ffffff34] h-[100%]
           transition-all duration-300 hover:underline px-[20px] bg-black w-full"
        onClick={(e) =>
          dispatch(openOneOfThem((e.target as HTMLButtonElement).name))
        }
        name={name}
      >
        {tag}
        <FaChevronDown
          className={`text-[#fff] scale-x-[0.6] scale-y-[0.8] transition-all duration-300
        ${areTheyOpen[name] ? " rotate-0" : " rotate-180"}`}
          style={{ pointerEvents: "none" }}
        />
      </button>
      <ul className="border border-[#ffffff34] mt-3 bg-black absolute w-full p-3 z-[2] flex flex-col gap-2">
        {options.map((option) => {
          return (
            <label
              key={option.id}
              className="flex justify-start items-center gap-4 font-light cursor-pointer"
              htmlFor={option.id}
            >
              <input
                type="checkbox"
                id={option.id}
                onChange={handleNewFilter}
                checked={addedFilters.includes(option.id)}
                className="check-form cursor-pointer"
              />
              {option.id}
            </label>
          );
        })}
      </ul>
    </div>
  );
};
