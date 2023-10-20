import {
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";
import { TourCard2 } from "../features/TourCard2";
import { useQuery } from "@tanstack/react-query";
import { getTours } from "../services/apiTours";
import { FilterButtons, ITours } from "../moduls";
import { Spinner } from "../ui/Spinner";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { filterOptions } from "../utils/filterBtnsOptions";
import { FilterBtn } from "../ui/FilterBtn";
import { SortBtn } from "../ui/SortBtn";
import { FilterTag } from "../ui/FilterTag";
import { useFilters } from "../services/useFilters";

const intialFilterBtnState = {
  price: false,
  groupSize: false,
  duration: false,
  bodyType: false,
  sort: false,
};

export const Tours = () => {
  const { isLoading, data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });
  //console.log(tours);

  const [filteredTours, setFilteredTours] = useState<ITours[]>(
    tours as ITours[]
  );
  useEffect(() => setFilteredTours(tours as ITours[]), [isLoading]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isFixedBar, setIsFixedBar] = useState(false);
  const [isOpen, setIsOpen] = useState<FilterButtons>(intialFilterBtnState);
  const [addedFilters, setAddedFilters] = useState<string[]>([]);
  const [currentSorting, setCurrentSorting] = useState("Featured");
  const filterNSort = useRef<null | HTMLDivElement>(null);

  const {finalTours} = useFilters(addedFilters)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    console.log("CAMBIO");
    setSearchText(value);

    let newArray = tours?.filter((tour: ITours) =>
      tour.title?.toLocaleLowerCase().includes(value.toLowerCase())
    );
    setFilteredTours(newArray as ITours[]);
    setPage(1);
  };

  const handleXClick = () => {
    setSearchText("");
    setFilteredTours(tours as ITours[]);
    setPage(1);
  };

  const handleNewFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setAddedFilters((prev) => {
      if (prev.includes(id)) {
        return prev.filter((option) => option !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleToggleFilterBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    setIsOpen((prev) => {
      return { ...intialFilterBtnState, [name]: !prev[name] };
    });
  };

  useEffect(() => {
    const handleSearchBarMovement = () => {
      if (window.scrollY > 360) {
        setIsFixedBar(true);
      } else {
        setIsFixedBar(false);
      }
    };
    window.addEventListener("scroll", handleSearchBarMovement);
    return () => removeEventListener("scroll", handleSearchBarMovement);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        filterNSort.current &&
        !filterNSort.current.contains(e.target as Node)
      ) {
        setIsOpen(intialFilterBtnState);
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    const handleDropdownMenuMov = () => {
      setIsOpen(intialFilterBtnState);
    };
    document.addEventListener("scroll", handleDropdownMenuMov);
    return () => document.removeEventListener("scroll", handleDropdownMenuMov);
  }, []);

  useEffect(()=>{
  //  console.log(finalTours);
    
    setFilteredTours(finalTours)
  },[finalTours])

  useEffect(()=>{
  //  console.log(filteredTours);
    
  },[filteredTours])

  //useEffect(() => console.log(addedFilters), [addedFilters]);

  return (
    <main>
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
        <div
          className={`bg-[#dbdbdb96] w-[90%] tablet:w-[75%] full:w-[60%] left-[50%] translate-x-[-50%]
          h-[50px] laptop:h-[60px] p-[3px] ${
            isFixedBar
              ? `fixed top-[10px] z-[4]`
              : ` absolute z-[2] bottom-[-25px] laptop:bottom-[-30px]`
          }`}
        >
          <input
            type="text"
            placeholder="Search tour"
            onChange={handleChange}
            value={searchText}
            className="bg-[#1d1d1d]  py-1 px-12 text-white inline-block focus:bg-[#3b3b3b] 
          text-xl w-full focus:outline-none h-full font-light"
          />

          <div className="text-[#c7c7c7] absolute top-[50%] translate-y-[-50%] left-5 scale-[1.5]">
            <FaMagnifyingGlass />
          </div>
          {searchText.length > 0 && (
            <button
              className="text-[#c7c7c7] absolute top-[50%] translate-y-[-50%] right-5 scale-[1.5]"
              onClick={handleXClick}
            >
              <FaXmark />
            </button>
          )}
        </div>
      </div>
      <div className="bg-[url('src/images/starred-bg2.jpg')] pt-24 px-[8%]">
        <div
          className="text-white shadow-md shadow-black/30 grid grid-cols-5
          h-[60px] text-lg text-[--third-color] bg-white/20 border-[#ffffff34] mb-4 
          relative"
          ref={filterNSort}
        >
          {filterOptions.map((btn) => (
            <FilterBtn
              key={btn.name}
              isOpen={isOpen[btn.name]}
              handleClick={(e) => handleToggleFilterBtn(e)}
              addedFilters={addedFilters}
              handleNewFilter={handleNewFilter}
              {...btn}
            />
          ))}
          <SortBtn
            isOpen={isOpen.sort}
            handleClick={(e) => handleToggleFilterBtn(e)}
            currentSorting={currentSorting}
            setCurrentSorting={setCurrentSorting}
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex items-center gap-5 flex-wrap">
              <span className="text-white/60 font-light">
                Showing {(page - 1) * 9 + 1}-
                {page === Math.ceil(filteredTours?.length / 9)
                  ? filteredTours?.length
                  : page * 9}{" "}
                of {filteredTours?.length} results
              </span>
              {addedFilters.map((filter) => (
                <FilterTag
                  key={filter}
                  text={filter}
                  setAddedFilters={setAddedFilters}
                />
              ))}
              {addedFilters.length && (
                <button
                  className="text-white font-light transition-all duration-300 underline tracking-wider
              hover:text-[18px]"
                  onClick={() => setAddedFilters([])}
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
                        setPage((prev) => prev - 1);
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
                        setPage((prev) => prev + 1);
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
