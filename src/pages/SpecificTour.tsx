import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { RootState } from "../store";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { StarRating } from "../ui/StarRating";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  retrieveOneTour,
  retrieveReviews,
} from "../features/CurrentTour.tsx/currentTourSlice";
import { Spinner } from "../ui/Spinner";
import { GravityStatement } from "../ui/GravityStatement";
import { WrongPage } from "./WrongPage";
import { NavLinkTour } from "../ui/NavLinkTour";

export const SpecificTour = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { id } = useParams();
  if (Number(id) < 1 || Number(id) > 25) {
    return <WrongPage />;
  }
  const { currentTour, isRetrieving, reviewsTour } = useSelector(
    (store: RootState) => store.currentTour
  );
  const [promReview, setPromReview] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(retrieveOneTour(id));
    }
  }, [id]);

  useEffect(() => {
    setPromReview(() => {
      if (!reviewsTour.length) {
        return 0;
      }
      let avg = 0;
      reviewsTour.forEach((review) => (avg += review.rating));
      return avg / reviewsTour.length;
    });
    //const date = new Date(reviewsTour[0]?.date)
    //const finishDate = new Date(date)
    //finishDate.setDate(finishDate.getDate() + 50)
    //console.log(date);
    //console.log(finishDate);
    //console.log(date.getFullYear());
    //console.log(date.getMonth());
    //console.log(date.getDate());
  }, [reviewsTour]);

  const miniBgs = [
    "/src/images/toursImages/mini-amalthea.jpg",
    "/src/images/toursImages/mini-callisto.jpg",
    "/src/images/toursImages/mini-deimos.jpg",
    "/src/images/toursImages/mini-dion.jpg",
    "/src/images/toursImages/mini-enceladus.jpg",
    "/src/images/toursImages/mini-europe.jpg",
    "/src/images/toursImages/mini-ganymede.jpg",
    "/src/images/toursImages/mini-himalia.png",
    "/src/images/toursImages/mini-io.jpg",
    "/src/images/toursImages/mini-jupiter.jpg",
    "/src/images/toursImages/mini-mars.jpg",
    "/src/images/toursImages/mini-mercury.png",
    "/src/images/toursImages/mini-mimas.jpg",
    "/src/images/toursImages/mini-moon.jpg",
    "/src/images/toursImages/mini-neptune.jpg",
    "/src/images/toursImages/mini-nereid.jpg",
    "/src/images/toursImages/mini-phobos.jpg",
    "/src/images/toursImages/mini-pluto.jpg",
    "/src/images/toursImages/mini-rhea.jpg",
    "/src/images/toursImages/mini-saturn.jpg",
    "/src/images/toursImages/mini-tethys.jpg",
    "/src/images/toursImages/mini-titan.jpg",
    "/src/images/toursImages/mini-triton.jpg",
    "/src/images/toursImages/mini-uranus.jpg",
    "/src/images/toursImages/mini-venus.jpg",
  ];
  if (isRetrieving) {
    return (
      <main className="relative pt-32 px-[8%]">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="relative pt-32 px-[8%]">
      <span className=" text-[--secundary-color] gap-2">
        Tours <FaChevronRight className="scale-[0.7] inline-block" />{" "}
        <span className="text-white">{currentTour.title}</span>
      </span>
      <div className="grid grid-cols-1 full:grid-cols-2 gap-16 mt-16">
        <div
          className={`bg-contain bg-no-repeat relative`}
          style={{
            backgroundImage: `url('/src/images/toursImages/mini-${currentTour.name}.jpg')`,
            paddingBottom: "100%",
          }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={currentTour.tourImage}
            className="bg-cover w-full absolute inset-0"
          />
        </div>
        <div className="text-white flex flex-col items-start gap-6 justify-start border-white/30">
          <div className="flex flex-col items-start gap-6">
            <GravityStatement {...currentTour} />
            <h1 className="text-3xl tablet:text-4xl font-semibold">
              {currentTour.title}
            </h1>
            <div className="flex items-center gap-3">
              <StarRating rating={promReview} />
              <span className="text-white/40 text-sm">
                {!promReview
                  ? "( No reviews yet )"
                  : `( ${reviewsTour.length} reviews )`}
              </span>
            </div>
            <div className="flex items-center justify-start gap-10 border-y border-white/20 w-full py-6">
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light">Duration</h2>
                <h2 className="font-semibold text-lg">
                  {currentTour.duration} days
                </h2>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light">Group Size</h2>
                <h2 className="font-semibold text-lg">
                  {currentTour.groupSize} travelers
                </h2>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light">Body Type</h2>
                <h2 className="font-semibold text-lg">
                  {currentTour.isPlanet ? "Planet" : "Moon"}
                </h2>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col w-full gap-5 pt-2">
            <button
              className="transition duration-200 p-2 bg-yellow-500 hover:bg-yellow-200 text-black 
            font-semibold"
            >
              See dates & prices
            </button>
            <button
              className="transition duration-200 bg-transparent border-2 border-white p-2 hover:bg-white 
            font-semibold hover:text-black"
            >
              Add to Favorite Tours
            </button>
          </div>
        </div>
      </div>
      <div className="text-white pt-24">
        <ul className="text-white/40 flex gap-10 border-b px-4 border-b-white/20">
          <NavLinkTour route="." end={true}>
            Overview
          </NavLinkTour>
          <NavLinkTour route="itinerary">Itinerary</NavLinkTour>
          <NavLinkTour route="meeting">Meeting & Pickup</NavLinkTour>
          <NavLinkTour route="dates">Dates & Prices</NavLinkTour>
          <NavLinkTour route="reviews">Reviews</NavLinkTour>
        </ul>
        <Outlet />
      </div>
    </main>
  );
};
