import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

export const Dates = () => {
  const { dates } = useSelector(
    (store: RootState) => store.currentTour
  );
  useEffect(()=>console.log(dates)
  )
  return (
    <div>{JSON.stringify(dates)}</div>
  )
}
