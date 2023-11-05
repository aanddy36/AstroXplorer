import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

export const Dates = () => {
  const { dates } = useSelector((store: RootState) => store.currentTour);
  //useEffect(() => console.log(dates));
  return (
    <div className="py-24 text-3xl text-center">
      Hey! Shamefully, it seems there are no expeditions available soon for this
      tour.{" "}
    </div>
  );
};
