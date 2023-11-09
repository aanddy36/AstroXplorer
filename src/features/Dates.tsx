import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { IDate } from "../moduls";
import { monthAbbreviations } from "../utils/months";
import { toggleModal } from "./Modal/modalSlice";
import { DetailedDate } from "./DetailedDate";

export const Dates = () => {
  const { dates } = useSelector((store: RootState) => store.currentTour);
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();
  const [isBuyingOpen, setIsBuyingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<IDate>({} as IDate);
  const dateCont = useRef<HTMLDivElement | null>(null);
  let possibleYears = [
    ...new Set(
      dates.map((date) =>
        date.startDate.slice(date.startDate.length - 4, date.startDate.length)
      )
    ),
  ].sort((a, b) => Number(a) - Number(b));

  const handleSelectButton = (date: IDate) => {
    if (!isLoggedIn) {
      return dispatch(toggleModal(true));
    }
    setIsBuyingOpen(true);
    setSelectedDate(date);
    window.scrollTo({
      top:
        (dateCont.current?.getBoundingClientRect().top as number) +
        window.scrollY,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (isBuyingOpen) {
      window.scrollTo({
        top:
          (dateCont.current?.getBoundingClientRect().top as number) +
          window.scrollY,
        behavior: "smooth",
      });
    }
  }, [isBuyingOpen]);

  const closeDate = () => {
    setIsBuyingOpen(false);
    setSelectedDate({} as IDate);
  };
  return (
    <>
      {!dates.length ? (
        <div className="py-24 text-3xl text-center">
          Hey! Shamefully, it seems there are no expeditions available soon for
          this tour.
        </div>
      ) : (
        <div className="flex flex-col gap-2 full:gap-8 laptop:flex-row my-10">
          <div
            className=" bg-transparent border border-white/20 rounded-lg pt-8 laptop:w-[350px] flex flex-col items-center
           gap-8"
          >
            <h1 className=" font-semibold text-3xl  px-12">Available Dates</h1>

            <div className="w-full overflow-auto laptop:overflow-visible h-[400px] laptop:h-full">
              {possibleYears.map((year) => (
                <div className="w-full" key={nanoid()}>
                  <div className=" bg-gradient-to-r from-[#242424] to-black px-4 py-2 font-light text-lg">
                    {year}
                  </div>
                  <ul className="px-4">
                    {dates
                      .filter(
                        (date) =>
                          date.startDate.slice(
                            date.startDate.length - 4,
                            date.startDate.length
                          ) === String(year)
                      )
                      .map((date) => {
                        const startDate = new Date(date.startDate);
                        const finishDate = new Date(startDate);
                        finishDate.setDate(
                          finishDate.getDate() + Number(date.duration)
                        );
                        return (
                          <li
                            key={nanoid()}
                            className="flex gap-2 justify-between py-4 items-center"
                          >
                            <span className="w-[120px]">
                              {monthAbbreviations[startDate.getMonth()]}{" "}
                              {startDate.getDate()} -{" "}
                              {monthAbbreviations[finishDate.getMonth()]}{" "}
                              {finishDate.getDate()}
                            </span>
                            <span className="pr-2">
                              $
                              {String(date.price).replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ","
                              )}
                            </span>
                            <button
                              className="border-2 px-3 py-2 transition duration-200 hover:bg-white hover:text-black
                         font-semibold"
                              onClick={() => handleSelectButton(date)}
                            >
                              Select
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {isBuyingOpen && (
            <div className="grow" ref={dateCont}>
              <DetailedDate date={selectedDate} closeDate={closeDate} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
