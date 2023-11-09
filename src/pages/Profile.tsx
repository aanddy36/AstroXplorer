import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Spinner } from "../ui/Spinner";
import { FaBookmark, FaGear, FaRocket, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import {
  retrieveFavoriteTours,
  retrievePurchasedTours,
} from "../features/UserTours/userToursSlice";
import { TourCard } from "../features/Tours/TourCard";

export const Profile = () => {
  const { name, surname, id } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { favoriteTours, isRetrieving, purchasedTours } = useSelector(
    (store: RootState) => store.userTours
  );
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    dispatch(retrieveFavoriteTours(id));
    dispatch(retrievePurchasedTours(id));
  }, [id]);

  useEffect(() => {
    console.log(purchasedTours);
  }, [purchasedTours]);

  if (isRetrieving) {
    return (
      <div className="relative pt-32 px-[8%]">
        <Spinner />;
      </div>
    );
  }
  return (
    <div className="relative pt-32 text-white">
      {isPopup && (
        <div
          className="bg-[#1f1f1f] h-[220px] w-[350px] tablet:w-[400px] laptop:w-[500px] fixed left-[50%] 
          translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col gap-12 text-white items-center p-5
           shadow-xl shadow-black z-[999]"
        >
          <div className="w-full flex justify-end">
            <FaXmark
              className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer"
              onClick={() => setIsPopup(false)}
            />
          </div>
          <h1 className="text-2xl font-semibold text-center">
            This functionality is not available yet, but soon it will be, so try
            again soon!
          </h1>
        </div>
      )}
      <section
        className="border-y border-white/20 h-24 flex items-center justify-between px-[5%] tablet:px-[10%]
       pr-[10%]"
      >
        <div className="flex items-center gap-3 laptop:gap-5">
          <span
            className="py-2 laptop:py-3 px-3 laptop:px-4 rounded-full bg-[#525252] text-lg laptop:text-xl
           font-light"
          >
            {name.slice(0, 1).toLocaleUpperCase()}
            {surname.slice(0, 1).toLocaleUpperCase()}
          </span>
          <span className="text-xl laptop:text-2xl font-semibold tracking-wider">
            {name} {surname}
          </span>
        </div>
        <button
          className="flex items-center gap-5 group text-white/80"
          onClick={() => setIsPopup(true)}
        >
          <span className="text-xl group-hover:underline group-hover:text-white hidden laptop:inline-block">
            Account settings
          </span>
          <FaGear className="scale-[1.8] laptop:scale-[1.4] group-hover:text-white" />
        </button>
      </section>
      <section className="grid grid-cols-1 px-[5%] tablet:px-[10%] py-12 gap-10">
        <div
          className={`relative bg-transparent border border-white/20 rounded-lg px-12 pt-12 flex flex-col ${
            favoriteTours.length ? "h-[500px] pb-0" : "h-fit pb-12"
          }`}
        >
          <div className="flex justify-between items-center">
            <FaRocket className="scale-[2] text-yellow-500" />
            <h1 className="text-4xl text-center font-bold">MY TOURS</h1>
          </div>
          {!purchasedTours.length ? (
            <div className="flex grow flex-col items-center justify-center gap-6">
              <h1 className=" font-semibold text-xl text-center">
                Where is going to be your next destination?
              </h1>
              <span className=" font-light text-white/60 text-center">
                Looks like it's time to get a trip on the calendar! Experience
                new destinations like an insider thanks to our interplanetary
                connections.
              </span>
              <Link
                to="/tours"
                className="border-2 px-3 py-2 w-fit transition duration-200 hover:bg-white hover:text-black
              hover:font-semibold mt-7"
              >
                View tours
              </Link>
            </div>
          ) : (
            <ul className="pt-20 grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8"></ul>
          )}
        </div>
        <div
          className={`relative bg-transparent border border-white/20 rounded-lg px-12 pt-12 flex flex-col ${
            !favoriteTours.length ? "h-[500px] pb-0" : "h-fit pb-0"
          }`}
        >
          <div className="flex justify-between items-center">
            <FaBookmark className="scale-[2] text-yellow-500" />
            <h1 className="text-4xl text-center font-bold">WISH LIST</h1>
          </div>
          {!favoriteTours.length ? (
            <div className="flex grow flex-col items-center justify-center gap-6">
              <h1 className=" font-semibold text-xl text-center">
                Find tours you love
              </h1>
              <span className=" font-light text-white/60 text-center">
                Tap the heart icon while browsing our website to save tours to
                your wish list.
              </span>
              <Link
                to="/tours"
                className="border-2 px-3 py-2 w-fit transition duration-200 hover:bg-white hover:text-black
             hover:font-semibold mt-7"
              >
                Browse tours
              </Link>
            </div>
          ) : (
            <ul className="pt-20 grid grid-cols-1 laptop:grid-cols-2 full:grid-cols-3 gap-8">
              {favoriteTours.map((tour) => {
                const {
                  tour_id,
                  id,
                  tours_and_reviews: {
                    cardImage,
                    price,
                    title,
                    duration,
                    avgreview,
                    totalreviews,
                  },
                } = tour;
                return (
                  <TourCard
                    key={id}
                    id={tour_id}
                    cardImage={cardImage}
                    price={price}
                    title={title}
                    duration={duration}
                    avgreview={avgreview}
                    totalreviews={totalreviews}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
