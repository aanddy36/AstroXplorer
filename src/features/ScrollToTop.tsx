import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetErrors } from "./Auth/authSlice";
import { resetPages } from "./FilterAndSorting/filterSortingSlice";
import { resetSorting } from "./SortReviews/sortReviewsSlice";
import { toggleModal } from "./Modal/modalSlice";
import { changeConfirmingPopup } from "./UserTours/userToursSlice";

export function ScrollToTop() {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string>("");

  const dispatch = useDispatch();
  let nonScrollableLinks = ["itinerary", "meeting", "dates", "reviews"];

  useEffect(() => {
    let newArray = location.pathname.split("/");
    let actualPage = newArray[newArray.length - 1];

    if (
      !nonScrollableLinks.includes(actualPage) &&
      !nonScrollableLinks.includes(previousPath)
    ) {
      window.scrollTo(0, 0);
    }
    dispatch(resetErrors());
    dispatch(resetPages());
    dispatch(resetSorting());
    dispatch(toggleModal(false))
    dispatch(changeConfirmingPopup(false))
    setPreviousPath(actualPage);
  }, [location.pathname]);

  useEffect(() => {
    //console.log(previousPath);
  }, [previousPath]);

  return null;
}
