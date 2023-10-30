import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { ITours } from "../moduls";
import { FaChevronRight } from "react-icons/fa6";
import { Rate } from "antd";
import { StarRating } from "../ui/StarRating";

export const SpecificTour = () => {
  const { id } = useParams();
  console.log(id);
  const { allTours } = useSelector((store: RootState) => store.filterSorting);
  const [currentTour, setCurrentTour] = useState<ITours>(
    allTours.filter((tour) => tour.id === Number(id))[0]
  );
  useEffect(() => {
    setCurrentTour(allTours.filter((tour) => tour.id === Number(id))[0]);
  }, [id]);
  useEffect(()=>{console.log(currentTour);
  },[currentTour])


  return (
    <main className="relative bg-black bg-[url('src/images/bgImages/starred-bg.jpg')] pt-32 px-[8%]">
      <span className=" text-[--secundary-color] gap-2">
        Tours <FaChevronRight className="scale-[0.7] inline-block" />{" "}
        <span className="text-white">{currentTour?.title}</span>
      </span>
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 mt-8">
        <img src={currentTour?.tourImage} />
        <div className="text-white flex flex-col items-start gap-6">
          <span className="font-light bg-transparent text-white/80 rounded-md">
            The gravity is {currentTour?.gravity} in {currentTour?.name}
          </span>
          <h1 className="text-4xl font-semibold">{currentTour?.title}</h1>
          <div className="flex items-center gap-3">
            <StarRating rating={3.6745}/>
            <span className="text-white/40 text-sm">(150 reviews)</span>
          </div>
          <h2 className="text-xl font-semibold">
            {currentTour?.duration} days
          </h2>
        </div>
      </div>
      <div className="text-white pt-24">{JSON.stringify(currentTour)}</div>
    </main>
  );
};
