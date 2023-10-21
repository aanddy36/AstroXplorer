import { useRef, useEffect, useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";
import { filterOptions } from "../../utils/filterBtnsOptions";
import { FilterBtnSidebar } from "../../ui/FilterBtnSidebar";
import { FilterButtons } from "../../moduls";

export const TourSidebar = ({
  isOpen,
  setIsOpen,
  handleClick,
  areTheyOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  areTheyOpen:FilterButtons,
}) => {
  const sidebar = useRef<null | HTMLDivElement>(null);
  const [isProfileToggleOpen, setIsProfileToggleOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebar.current && !sidebar.current.contains(e.target as Node)) {
        setIsOpen(false);
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
           h-screen full:hidden text-[--main-font-color] pt-[30px] text-right`}
        ref={sidebar}
      >
        <section className="flex justify-between tablet:justify-end items-center px-[7%] tablet:px-[10%]">
          <button
            onClick={() => setIsOpen(false)}
            className="scale-[1.5] transition duration-300 hover:rotate-90"
          >
            <FaX />
          </button>
        </section>
        <ul className=" text-xl pt-10 text-right px-4">
          {filterOptions.map((btn) => {
            console.log(areTheyOpen[btn.name]);
            
            return (
              <FilterBtnSidebar
                key={btn.name}
                isOpen={areTheyOpen[btn.name]}
                setIsOpen={setIsProfileToggleOpen}
                handleClick={handleClick}
                {...btn}
              />
            );
          })}
          <div
            className={`border-b border-[#7e7e7e3d] py-2  px-[6%] transiton duration-200 overflow-hidden 
                  ${
                    isProfileToggleOpen
                      ? "bg-[#7e7e7e3d] h-[150px]"
                      : "bg-transparent h-[45px]"
                  }`}
          >
            <button
              className="flex w-full transiton duration-300 hover:pr-4 justify-between items-center"
              onClick={() => setIsProfileToggleOpen((prev) => !prev)}
            >
              <FaChevronDown
                className={`scale-x-[0.7] scale-y-[0.9] transiton duration-300 ${
                  isProfileToggleOpen ? "rotate-180" : "rotate-0"
                }`}
              />
              Price
            </button>
          </div>
        </ul>
      </div>
    </main>
  );
};
