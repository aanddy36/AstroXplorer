import React, { ChangeEvent } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { sortingOptions } from "../utils/filterBtnsOptions";

export const SortBtn = ({
  isOpen,
  handleClick,
  currentSorting,
  setCurrentSorting,
}: {
  isOpen: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentSorting: string;
  setCurrentSorting: (id: string) => void;
}) => {
  return (
    <div
      className={`relative h-[60px] w-full bg-transparent ${
        isOpen ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <button
        className="flex items-center justify-between text-left border border-[#ffffff34] h-[100%]
              transition-all duration-300 hover:underline px-[20px] bg-black w-full"
        onClick={handleClick}
        name="sort"
      >
        Sort
        <FaChevronDown className={`text-[#fff] scale-x-[0.6] scale-y-[0.8] transition-all duration-300
        ${isOpen ? ' rotate-0' : ' rotate-180'}`} 
        style={{ pointerEvents: 'none' }}/>
      </button>
      <ul className="border border-[#ffffff34] mt-3 bg-black absolute w-full p-3 z-[2] flex flex-col gap-2">
        {sortingOptions.map((option) => {
          return (
            <label key={option.id}
              className="flex justify-start items-center gap-4 font-light cursor-pointer"
              htmlFor={option.id}
            >
              <input
                type="radio"
                id={option.id}
                name="sort"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCurrentSorting(e.target.id)
                }
                checked={currentSorting === option.id}
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
