import { useEffect, useRef } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleModal } from "../features/Modal/modalSlice";
import { RootState } from "../store";

export const ImageCont = ({
  cardImage,
  id,
}: {
  cardImage?: string;
  id: number;
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const { idFavoriteTours } = useSelector(
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
    if (!idFavoriteTours.some((tour) => tour.tour_id === id) && !isLoggedIn) {
      dispatch(toggleModal(true));
    }
  };
  return (
    <div
      className="relative cursor-pointer overflow-hidden bg-black/60"
      ref={ref}
    >
      <span
        className="absolute top-3 right-3 h-10 w-10 z-[5] bg-white/40 flex items-center justify-center 
      rounded-full transition duration-200 hover:scale-[1.1]"
        //onClick={() => setIsFavorite(!isFavorite)}
      >
        <span
          className="p-[6px] relative text-white/90"
          onClick={handleClickFavorite}
        >
          {!idFavoriteTours.some((tour) => tour.tour_id === id) ? (
            <FaRegBookmark className="scale-[1.3]" />
          ) : (
            <FaBookmark className="scale-[1.3]" />
          )}
        </span>
      </span>
      <img
        src={cardImage}
        className="relative object-contain"
        loading="lazy"
        onClick={() => navigate(`/tours/${id}`)}
      />
    </div>
  );
};
