import { useEffect, useRef } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../features/Modal/modalSlice";
import { RootState } from "../store";
import {
  addFavoriteTour,
  deleteFavoriteTour,
} from "../features/UserTours/userToursSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const ImageCont = ({
  cardImage,
  id: tour_id,
}: {
  cardImage?: string;
  id: number;
}) => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const { isLoggedIn, id: user_id } = useSelector(
    (store: RootState) => store.auth
  );
  const { idFavoriteTours, favoriteTours, isAdding, isDeleting } = useSelector(
    (store: RootState) => store.userTours
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      ref.current.style.height = `${width * (9 / 16)}px`;
    }
    const adjustHeight = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        ref.current.style.height = `${width * (9 / 16)}px`;
      }
    };
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);
  const handleClickFavorite = () => {
    if (!isLoggedIn) {
      return dispatch(toggleModal(true));
    }
    if (idFavoriteTours.some((tour) => tour.tour_id === tour_id)) {
      let favorite_id = String(
        favoriteTours.filter((fav) => fav.tour_id === tour_id)[0]?.id
      );
      dispatch(deleteFavoriteTour({ favorite_id, user_id }));
    } else {
      dispatch(addFavoriteTour({ tour_id, user_id }));
    }
  };
  return (
    <div
      className="relative cursor-pointer overflow-hidden bg-black/60"
      ref={ref}
    >
      <span
        className="absolute top-3 right-3 h-10 w-10 z-[1] bg-white/40 flex items-center justify-center 
      rounded-full transition duration-200 hover:scale-[1.1]"
      >
        <button
          className="p-[6px] relative text-white/90 disabled:cursor-not-allowed"
          onClick={handleClickFavorite}
          disabled={isAdding || isDeleting}
        >
          {!idFavoriteTours.some((tour) => tour.tour_id === tour_id) ? (
            <FaRegBookmark className="scale-[1.3]" />
          ) : (
            <FaBookmark className="scale-[1.3]" />
          )}
        </button>
      </span>
      <img
        src={cardImage}
        className="relative object-contain"
        loading="lazy"
        onClick={() => navigate(`/tours/${tour_id}`)}
      />
    </div>
  );
};
