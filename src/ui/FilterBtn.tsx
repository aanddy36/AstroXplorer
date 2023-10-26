import { ChangeEvent } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrDeleteFilter,
  openOneOfThem,
} from "../features/FilterAndSorting/filterSortingSlice";
import { Filters, OptionsFilter } from "../moduls";

export const FilterBtn = ({
  tag,
  name,
  options,
}: {
  tag: string;
  name: string;
  options: OptionsFilter[];
}) => {
  const { areTheyOpen, addedFilters } = useSelector(
    (store: RootState) => store.filterSorting
  );
  const dispatch = useDispatch();
  return (
    <div
      className={`relative h-[60px] w-full bg-transparent hidden full:block z-[10] ${
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
              key={option.idFull}
              className="flex justify-start items-center gap-4 font-light cursor-pointer"
              htmlFor={option.idFull}
            >
              <input
                type="checkbox"
                id={option.idFull}
                value={option.idShared}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addOrDeleteFilter(e.target.value as Filters))
                }
                checked={addedFilters.includes(option.idShared)}                                                                                          
                className="check-form cursor-pointer border"
              />
              {option.idShared}
            </label>
          );
        })}
      </ul>
    </div>
  );
};
