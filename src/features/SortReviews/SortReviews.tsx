import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaSort } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { newSorting } from "./sortReviewsSlice";

export const SortReviews = () => {
  const [isOpen, setIsOpen] = useState(false);
  const btn = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const {sortingMethod} = useSelector((store:RootState)=>store.sortReviews)

  useEffect(() => {
    const handleScroll = ()=>{
      setIsOpen(false)
    }
    
    window.addEventListener("scroll",handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id !== sortingMethod) {
      dispatch(newSorting(id))
    }
    setIsOpen(false);
  };
  return (
    <motion.div
      ref={btn}
      animate={{ height: isOpen ? btn.current?.scrollHeight : "47px" }}
      transition={{ duration: 0.2 }}
      className={`relative w-fit overflow-hidden`}
    >
      <button
        className="flex items-center border-2 border-[#ffffff7a] py-2 px-4 font-light gap-4
        transition-all duration-300 hover:bg-[#ffffff3d] bg-transparent w-fit"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Sort by
        <FaSort />
      </button>
      <ul className="border border-[#ffffff34] mt-3 bg-black absolute w-full z-[3] flex flex-col">
        <label
          className={`flex justify-start items-center gap-4 font-light cursor-pointer py-3 pl-3 transition duration-200
          hover:bg-white/20 ${
            sortingMethod === "featured" ? "bg-white/20" : "bg-black"
          }`}
          htmlFor="featured"
        >
          <input
            type="radio"
            id="featured"
            name="sortReview"
            onChange={(e) => handleChange(e)}
            checked={sortingMethod === "featured"}
            className="check-form cursor-pointer invisible absolute"
          />
          Featured
        </label>
        <label
          className={`flex justify-start items-center gap-4 font-light cursor-pointer py-3 pl-3 transition duration-200
          hover:bg-white/20 ${
            sortingMethod === "highest" ? "bg-white/20" : "bg-black"
          }`}
          htmlFor="highest"
        >
          <input
            type="radio"
            id="highest"
            name="sortReview"
            onChange={(e) => handleChange(e)}
            checked={sortingMethod === "highest"}
            className="check-form cursor-pointer invisible absolute"
          />
          Highest rated
        </label>
        <label
          className={`flex justify-start items-center gap-4 font-light cursor-pointer py-3 pl-3 transition duration-200
          hover:bg-white/20 ${
            sortingMethod === "lowest" ? "bg-white/20" : "bg-black"
          }`}
          htmlFor="lowest"
        >
          <input
            type="radio"
            id="lowest"
            name="sortReview"
            onChange={(e) => handleChange(e)}
            checked={sortingMethod === "lowest"}
            className="check-form cursor-pointer invisible absolute"
          />
          Lowest rated
        </label>
        <label
          className={`flex justify-start items-center gap-4 font-light cursor-pointer py-3 pl-3 transition duration-200
           hover:bg-white/20 ${
             sortingMethod === "newest" ? "bg-white/20" : "bg-black"
           }`}
          htmlFor="newest"
        >
          <input
            type="radio"
            id="newest"
            name="sortReview"
            onChange={(e) => handleChange(e)}
            checked={sortingMethod === "newest"}
            className="check-form cursor-pointer invisible absolute"
          />
          Newest
        </label>
      </ul>
    </motion.div>
  );
};
