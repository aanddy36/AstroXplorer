import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetErrors } from "./Auth/authSlice";
import { resetPages } from "./FilterAndSorting/filterSortingSlice";

export function ScrollToTop() {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string>("");

  const dispatch = useDispatch();
  let nonScrollableLinks = ["itinerary", "meeting", "dates", "reviews"];

  useEffect(() => {
    //console.log(`Previous path: ${previousPath}`);
    let newArray = location.pathname.split("/");
    let actualPage = newArray[newArray.length - 1];
    //console.log(`Current path: ${actualPage}`);
    //console.log(nonScrollableLinks.includes(previousPath));

    if (!nonScrollableLinks.includes(actualPage) && !nonScrollableLinks.includes(previousPath)) {
      //console.log("AAAAA");
      
      window.scrollTo(0, 0);
    }
    dispatch(resetErrors());
    dispatch(resetPages());
    setPreviousPath(actualPage)
  }, [location.pathname]);

  useEffect(()=>{
    //console.log(`Previous path: ${previousPath}`);
  },[previousPath])

  return null;
}
