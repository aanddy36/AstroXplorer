import { useSelector } from "react-redux";
import { RootState } from "../store";
import { StarRating } from "../ui/StarRating";
import { SingleReview } from "../ui/SingleReview";
import { SortReviews } from "./SortReviews/SortReviews";
import { useSortReviews } from "../services/useSortReviews";
import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

export const ReviewsTour = () => {
  const { reviewsTour, currentTour } = useSelector(
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
  const [isPopup, setIsPopup] = useState(false)
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
         onClick={()=>setIsPopup(true)}
        >
          ADD REVIEW
        </button>
      </div>
    );
  }
  return (
    <div className="py-8 flex flex-col">
      {isPopup && <div
        className="bg-[#1f1f1f] h-[220px] w-[350px] tablet:w-[400px] laptop:w-[500px] fixed left-[50%] 
          translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col gap-12 text-white items-center p-5
           shadow-xl shadow-black z-[999]"
      >
        <div className="w-full flex justify-end">
          <FaXmark className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer" 
           onClick={()=>setIsPopup(false)}/>
        </div>
        <h1 className="text-2xl font-semibold text-center">
          This functionality is not available yet, but soon it will be, so try
          again soon!
        </h1>
      </div>}
      <div
        className="flex items-start tablet:items-center justify-between py-6 border-b border-white/20 
      tablet:flex-row flex-col gap-6 tablet:gap-0"
      >
        <div className="gap-4 flex items-end justify-between tablet:justify-start w-full tablet:w-fit">
          <h2 className="text-6xl font-semibold">{Number(currentTour.avgreview.toFixed(1))}</h2>
          <div className="flex flex-col gap-0 items-start">
            <StarRating rating={currentTour.avgreview} />
            <span className="text-white/60 font-light">
              ( {currentTour.totalreviews} reviews )
            </span>
          </div>
        </div>
        <button
          className="bg-yellow-500 transiton duration-200 hover:bg-yellow-200 text-black py-2 px-4 
        font-semibold"
        onClick={()=>setIsPopup(true)}
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
