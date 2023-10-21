import React from "react";
import { FaChevronDown } from "react-icons/fa6";

export const FilterBtnSidebar = ({
  isOpen,
  setIsOpen,
  handleClick,
  tag,
  options,
}: {
  isOpen: boolean;
  setIsOpen: (data: any) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  tag: string;
  options: { id: string }[];
}) => {
    //console.log(`${tag}:${isOpen}`);
    
  return (
    <div
      className={`border-b border-[#7e7e7e3d] py-2 px-[6%] transiton duration-200 overflow-hidden 
                  ${
                    isOpen
                      ? "bg-[#7e7e7e3d] h-[fit]"
                      : "bg-transparent h-[45px]"
                  }`}
    >
      <button
        className="flex w-full transiton duration-300 hover:pr-4 justify-between items-center"
        onClick={handleClick}
      >
        <FaChevronDown
          className={`scale-x-[0.7] scale-y-[0.9] transiton duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
        {tag}
      </button>
      <ul className="text-base pr-3 transition-all duration-200 mt-5 grid gap-2">
        {options.map((option) => (
          <label
            className="flex justify-start items-center gap-4 font-light cursor-pointer pl-4"
            htmlFor={option.id}
          >
            <input
            type="checkbox"
            id={option.id}
            onChange={() => alert("Changed")}
            checked={false}
            className="check-form cursor-pointer"
          />
          {option.id}
          </label>
        ))}
      </ul>
    </div>
  );
};
