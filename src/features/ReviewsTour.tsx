import { useSelector } from "react-redux";
import { RootState } from "../store";
import { StarRating } from "../ui/StarRating";
import { SingleReview } from "../ui/SingleReview";
import { SortReviews } from "./SortReviews/SortReviews";
import { useSortReviews } from "../services/useSortReviews";
import { useEffect, useRef, useState } from "react";

export const ReviewsTour = () => {
  const { reviewsTour, avgReview } = useSelector(
    (store: RootState) => store.currentTour
  );
  const { sortingMethod } = useSelector(
    (store: RootState) => store.sortReviews
  );
  const { sortedReviews } = useSortReviews(reviewsTour, sortingMethod);
  const [finalReviews, setFinalReviews] = useState(sortedReviews);
  const reviewsCont = useRef<HTMLDivElement | null>(null);
  const [actualHeight, setActualHeight] = useState(0);
  const listItems = useRef<HTMLLIElement[]>([]);
  useEffect(() => {
    setFinalReviews(sortedReviews);
  }, [sortedReviews]);
  useEffect(() => {
    setActualHeight(reviewsCont.current?.clientHeight as number);
  }, [reviewsCont]);
  const handleShowMore = () => {
    setActualHeight((prev) => (prev as number) + 800);
  };
  /*useEffect(() => {
    setActualHeight(1100);
  }, [sortingMethod]);*/
  useEffect(() => {
    if (listItems.current.length) {
      let cuttedArray = listItems.current.slice(0, 4);
      let he = 0;
      for (let i = 0; i < cuttedArray.length; i++) {
        he += cuttedArray[i]?.scrollHeight;
      }
      setActualHeight(he)
      console.log(he);
    }
  }, [listItems, sortingMethod]);
    useEffect(() => {
    //console.log(`visible height:${actualHeight}`);
    //console.log(`total height:${reviewsCont.current?.scrollHeight}`);
  }, [actualHeight]);
  if (!reviewsTour.length) {
    return (
      <div className="py-28 flex flex-col gap-10 items-center">
        <h1 className="text-center text-white/60 text-3xl">
          There are no reviews for this tour yet. Be the first one!
        </h1>
        <button
          className="bg-yellow-500 text-lg py-3 px-6 text-black transition duration-200
         hover:bg-yellow-200 font-semibold"
        >
          ADD REVIEW
        </button>
      </div>
    );
  }
  return (
    <div className="py-8 flex flex-col">
      <div
        className="flex items-start tablet:items-center justify-between py-6 border-b border-white/20 
      tablet:flex-row flex-col gap-6 tablet:gap-0"
      >
        <div className="gap-4 flex items-end justify-between tablet:justify-start w-full tablet:w-fit">
          <h2 className="text-6xl font-semibold">{avgReview}</h2>
          <div className="flex flex-col gap-0 items-start">
            <StarRating rating={avgReview} />
            <span className="text-white/60 font-light">
              ( {reviewsTour.length} reviews )
            </span>
          </div>
        </div>
        <button
          className="bg-yellow-500 transiton duration-200 hover:bg-yellow-200 text-black py-2 px-4 
        font-semibold"
        >
          ADD REVIEW
        </button>
      </div>
      <div className="max-h-[47px] overflow-visible mt-8">
        <SortReviews />
      </div>
      <div
        className={`overflow-hidden relative h-[${
          actualHeight + 200
        }px]`}
        ref={reviewsCont}
        style={{
          height:
            actualHeight < (reviewsCont.current?.scrollHeight as number)
              ? `${actualHeight + 200}px`
              : `${reviewsCont.current?.scrollHeight as number}px`,
        }}
      >
        <ul>
          {finalReviews.map((review, index) => {
            return (
              <li
                key={index}
                className="py-10 border-b border-white/20 flex flex-col gap-4 laptop:gap-2 items-start"
                ref={(el) => (listItems.current[index] = el as HTMLLIElement)}
              >
                <SingleReview {...review} />
              </li>
            );
          })}
        </ul>
        {(reviewsCont.current?.scrollHeight as number) - actualHeight > 250 && (
          <div
            className="absolute bottom-0 z-[2] bg-gradient-to-t from-black from-[12%] via-transparent via-25%
           h-[1100px] w-full"
          >
            <button
              className="absolute left-[50%] translate-x-[-50%] bottom-5 border-2 bg-black py-2 px-4 transition
            duration-200 hover:bg-white hover:text-black font-semibold"
              onClick={handleShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
