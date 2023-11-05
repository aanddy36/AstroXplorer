import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";
import {
  FaArrowLeft,
  FaChevronRight,
  FaRegBookmark,
  FaRegCalendar,
  FaRegTrashCan,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { StarRating } from "../ui/StarRating";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { retrieveOneTour } from "../features/CurrentTour.tsx/currentTourSlice";
import { Spinner } from "../ui/Spinner";
import { GravityStatement } from "../ui/GravityStatement";
import { WrongPage } from "./WrongPage";
import { NavLinkTour } from "../ui/NavLinkTour";
import { toggleModal } from "../features/Modal/modalSlice";
import {
  addFavoriteTour,
  deleteFavoriteTour,
} from "../features/UserTours/userToursSlice";
import { MiniSpinner } from "../ui/MiniSpinner";

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
  const { currentTour, isRetrieving, reviewsTour, avgReview } = useSelector(
    (store: RootState) => store.currentTour
  );
  const { isLoggedIn, id: user_id } = useSelector(
    (store: RootState) => store.auth
  );
  const { idFavoriteTours, favoriteTours, isAdding, isDeleting } = useSelector(
    (store: RootState) => store.userTours
  );

  useEffect(() => {
    if (id) {
      dispatch(retrieveOneTour(id));
    }
  }, [id]);

  useEffect(() => {
    //const date = new Date(reviewsTour[0]?.date)
    //const finishDate = new Date(date)
    //finishDate.setDate(finishDate.getDate() + 50)
    //console.log(date);
    //console.log(finishDate);
    //console.log(date.getFullYear());
    //console.log(date.getMonth());
    //console.log(date.getDate());
  }, [reviewsTour]);

  /*const miniBgs = [
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
  ];*/
  /*useEffect(() => {
    const handleScrollMovement = () => {
      console.log(navbar.current?.getBoundingClientRect().y);
      if (window.scrollY > 795 && window.scrollY < 2000) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScrollMovement);
    return () => removeEventListener("scroll", handleScrollMovement);
  }, []);*/
  const handleClickFavorite = () => {
    console.log("entre");

    if (!isLoggedIn) {
      return dispatch(toggleModal(true));
    }
    if (idFavoriteTours.some((tour) => tour.tour_id === Number(id))) {
      let favorite_id = String(
        favoriteTours.filter((fav) => fav.tour_id === Number(id))[0]?.id
      );
      dispatch(deleteFavoriteTour({ favorite_id, user_id }));
    } else {
      console.log("AAAAA");

      dispatch(addFavoriteTour({ tour_id: Number(id), user_id }));
    }
  };
  useEffect(() => {
    if (id) {
      console.log(idFavoriteTours);
    }
  }, [idFavoriteTours]);
  if (isRetrieving) {
    return (
      <main className="relative pt-32 px-[8%]">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="relative pt-32">
      <div className="flex text-[--secundary-color] gap-5 px-[8%] flex-col laptop:flex-row justify-between">
        <span className="gap-2">
          Tours <FaChevronRight className="scale-[0.7] inline-block" />{" "}
          <span className="text-white">{currentTour.title}</span>
        </span>
        <Link
          to="/tours"
          className="border-b border-white/40 transition duration-200 hover:text-white flex items-center gap-2
          w-fit cursor-pointer"
        >
          <FaArrowLeft />
          Get back
        </Link>
      </div>
      <div className="grid grid-cols-1 full:grid-cols-2 gap-16 mt-16 px-[8%]">
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
              <StarRating rating={avgReview} />
              <span className="text-white/40 text-sm">
                {!avgReview
                  ? "( No reviews yet )"
                  : `( ${reviewsTour.length} reviews )`}
              </span>
            </div>
            <div className="flex items-start justify-start gap-5 tablet:gap-10 border-y border-white/20 w-full py-6">
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light whitespace-nowrap">Duration</h2>
                <h2 className="font-semibold text-lg">
                  {currentTour.duration} days
                </h2>
              </div>
              <div className="flex flex-col gap-2 items-center tablet:items-start text-center ">
                <h2 className="font-light whitespace-nowrap">Group Size</h2>
                <h2 className="font-semibold text-lg w-fit max-w-[100px] tablet:max-w-fit">
                  {currentTour.groupSize} travelers
                </h2>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-light whitespace-nowrap">Body Type</h2>
                <h2 className="font-semibold text-lg">
                  {currentTour.isPlanet ? "Planet" : "Moon"}
                </h2>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col w-full gap-5 pt-2">
            <button
              className="transition duration-200 p-2 bg-yellow-500 hover:bg-yellow-200 text-black 
            font-semibold flex items-center justify-center gap-4"
            >
              See dates & prices
              <FaRegCalendar />
            </button>
            <button
              className="transition duration-200 bg-transparent border-2 border-white p-2 hover:bg-white 
            font-semibold hover:text-black flex items-center justify-center gap-4 disabled:cursor-not-allowed"
              onClick={handleClickFavorite} disabled={isAdding || isDeleting}
            >
              {isAdding || isDeleting ? (
                <MiniSpinner />
              ) : (
                <>
                  {!idFavoriteTours.some(
                    (fav) => fav.tour_id === Number(id)
                  ) ? (
                    <>
                      Add to Favorite Tours
                      <FaRegBookmark />
                    </>
                  ) : (
                    <>
                      Delete from Favorite Tours
                      <FaRegTrashCan />
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="text-white pt-24 relative">
        <ul
          className={` text-white/40 flex border-b px-[5%] laptop:px-[0%] laptop:mx-[8%] border-b-white/20
           flex-nowrap overflow-auto gap-10 whitespace-nowrap`}
        >
          <NavLinkTour route="." end={true}>
            Overview
          </NavLinkTour>
          <NavLinkTour route="itinerary">Itinerary</NavLinkTour>
          <NavLinkTour route="meeting">Meeting & Pickup</NavLinkTour>
          <NavLinkTour route="dates">Dates & Prices</NavLinkTour>
          <NavLinkTour route="reviews">Reviews</NavLinkTour>
        </ul>
        <div className="px-[8%]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
