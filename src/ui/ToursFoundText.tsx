import { useSelector } from "react-redux";
import { RootState } from "../store";

export const ToursFoundText = () => {
  const { page, filteredTours } = useSelector(
    (store: RootState) => store.filterSorting
  );
  if (!filteredTours?.length) {
    return (
      <span className="text-white/60 font-light">Showing 0 of 0 results</span>
    );
  }
  return (
    <span className="text-white/60 font-light">
      Showing {(page - 1) * 9 + 1}-
      {page === Math.ceil(filteredTours?.length / 9)
        ? filteredTours?.length
        : page * 9}{" "}
      of {filteredTours?.length} results
    </span>
  );
};
