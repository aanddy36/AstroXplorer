import { ITours } from "../moduls";

export const TourCard = ({title,duration, price, cardImage}:ITours) => {
  return (
    <button className="transition duration-200 h-[360px] grid grid-cols-1 min-w-[375px] hover:shadow-lg hover:shadow-black/60
    hover:translate-x-1 hover:-translate-y-1">
      <div className=" overflow-hidden h-[210px]">
        <img src={cardImage} className="" />
      </div>
      <div className=" h-[150px] p-4 flex flex-col justify-between bg-[#303030] text-white">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-lg text-left">
            {title}
          </h1>
          <p className="font-light">{duration} days</p>
        </div>
        <div className="flex justify-between items-end">
          <span className="font-bold">From ${price}.*</span>
          <button className="px-3 py-2 border-2 border-white bg-transparent hover:bg-white hover:text-black
          transition duration-200">
            View Tour
          </button>
        </div>
      </div>
    </button>
  );
};
