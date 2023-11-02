import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ActivityTour } from "../ui/ActivityTour";

export const Itinerary = () => {
  const { itinerary } = useSelector(
    (store: RootState) => store.currentTour
  );
  return (
    <ul className="py-16 grid grid-cols-1 full:grid-cols-2">
      {itinerary.map((section, index) => {
        
        return <ActivityTour key={index} order={index} {...section} />;
      })}
    </ul>
  );
};
