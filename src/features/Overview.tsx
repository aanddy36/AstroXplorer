import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Overview = () => {
  const { currentTour } = useSelector((store: RootState) => store.currentTour);
  return (
    <div className="py-16 grid grid-cols-1 full:grid-cols-2 gap-y-12">
      <div className="flex flex-col items-start gap-8">
        <h1 className="text-4xl font-semibold tracking-wider text-yellow-500">Description</h1>
        <span className="text-white/60 font-light">
          {currentTour.description}
        </span>
      </div>
      <div className="full:mx-10 rounded-lg py-8 px-6 border-white/30 h-full bg-white/20">
        <h1 className="font-semibold text-xl mb-5">Your tour package includes: </h1>
        <ul className=" list-disc font-light tracking-wide pl-8 flex flex-col gap-3 text-white/70">
          <li>Bedrooms for all the people in the group</li>
          <li>Breakfast, lunch and dinner</li>
          <li>Recreational areas: swimming pools, tennis court, golf courses. yoga classes</li>
          <li>Medical services available 24/7</li>
          <li>Free Wi-Fi</li>
        </ul>
      </div>
    </div>
  );
};
