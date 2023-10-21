import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addOrDeleteFilter } from "../features/FilterAndSorting/filterSortingSlice";
import { Sorts } from "../moduls";

export const FilterTag = ({
  text,
}: {
  text: Sorts;
}) => {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-white/40 rounded-xl py-1 px-3 text-black inline-flex items-center
              gap-3 font-semibold transition-all duration-300 hover:bg-white/70"
      onClick={() => dispatch(addOrDeleteFilter(text))}
    >
      {text}
      <FaXmark className="inline-block font-extralight scale-[1.1]" />
    </button>
  );
};
