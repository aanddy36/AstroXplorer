import { useEffect, useState } from "react";
import { ISingleReview } from "../moduls";

export const useSortReviews = (
  reviews: ISingleReview[],
  sortingMethod: "featured" | "highest" | "lowest" | "newest"
) => {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  useEffect(() => {
    setSortedReviews(reviews);
  }, [reviews]);
  useEffect(() => {
    setSortedReviews((prev) => {
      let newArray: ISingleReview[] = [];
      switch (sortingMethod) {
        case "featured":
          newArray = [...reviews].sort((a, b) => a.id - b.id);
          break;
        case "highest":
          newArray = [...reviews].sort((a, b) => b.rating - a.rating);
          break;
        case "lowest":
          newArray = [...reviews].sort((a, b) => a.rating - b.rating);
          break;
        case "newest":
          newArray = [...reviews].sort((a, b) => {
            const date1 = new Date(a.date);
            const date2 = new Date(b.date);
            return date2.getTime() - date1.getTime();
          });
          break;
        default:
          newArray = prev;
      }
      return newArray;
    });
  }, [sortingMethod]);

  return { sortedReviews };
};
