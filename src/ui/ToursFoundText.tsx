import { ITours } from "../moduls";

export const ToursFoundText = ({
  filteredTours,
  page,
}: {
  filteredTours: ITours[];
  page: number;
}) => {
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
