import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { ISingleReview } from "../moduls";
import { StarRating } from "./StarRating";

export const SingleReview = ({
  rating,
  review,
  date,
  userName,
  title,
  isSuggested,
}: ISingleReview) => {
  const dd = new Date(date);
  const month = String(dd.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(dd.getDate()).padStart(2, "0");
  const year = dd.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <StarRating rating={rating} />
        <span className=" font-light text-white/60">{formattedDate}</span>
      </div>
      <span className="text-xl font-bold">{title}</span>
      <span className=" font-light text-white/60 max-w-[500px]">{review}</span>
      <span className="font-light tracking-wide text-lg">- {userName}</span>
      {isSuggested ? (
        <div className="flex gap-2 w-fit text-[#28ff89] items-center mt-2">
          <FaRegCircleCheck />
          {userName.split(" ")[0]} suggests this tour
        </div>
      ) : (
        <div className="flex gap-2 w-fit text-white/60 items-center mt-2">
          <FaRegCircleXmark />
          {userName.split(" ")[0]} doesn't suggest this tour
        </div>
      )}
    </>
  );
};
