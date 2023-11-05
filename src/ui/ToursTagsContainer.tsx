import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { FilterTag } from "./FilterTag";
import { clearAllFilters } from "../features/FilterAndSorting/filterSortingSlice";

export const ToursTagsContainer = () => {
  const dispatch = useDispatch();
  const { addedFilters } = useSelector(
    (store: RootState) => store.filterSorting
  );
  return (
    <>
      {addedFilters.map((filter) => (
        <FilterTag key={filter} text={filter} />
      ))}
      {!addedFilters.length ? (
        ""
      ) : (
        <button
          className="text-white font-light transition-all duration-300 underline tracking-wider
  hover:text-[18px]"
          onClick={() => dispatch(clearAllFilters())}
        >
          Clear all
        </button>
      )}
    </>
  );
};
