import React, { useEffect, useRef, useState } from "react";
import { BlurBall } from "../../ui/BlurBall";
import { Coordinates, IPurchasedTour } from "../../moduls";
import { useNavigate } from "react-router-dom";
import { daysOfWeek, monthAbbreviations } from "../../utils/months";

export const PurchasedTourCard = ({
  cardImage,
  title,
  tour_id,
  startDate,
}: IPurchasedTour) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const iamgeCont = useRef<HTMLDivElement | null>(null);
  const [{ offsetX, offsetY }, setOffset] = useState<Coordinates>({
    offsetX: 0,
    offsetY: 0,
  });
  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    setOffset({ offsetX, offsetY });
  }
  const navigate = useNavigate();
  const date = new Date(startDate);

  useEffect(() => {
    if (iamgeCont.current) {
      const width = iamgeCont.current.clientWidth;
      iamgeCont.current.style.height = `${width * (9 / 16)}px`;
    }
    const adjustHeight = () => {
      if (iamgeCont.current) {
        const width = iamgeCont.current.clientWidth;
        iamgeCont.current.style.height = `${width * (9 / 16)}px`;
      }
    };
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  return (
    <div
      className="group relative px-3 mb-8 text-white bg-gradient-to-b min-[850px]:bg-gradient-to-r
    from-white/20 to-white/0 hover:translate-x-1 hover:-translate-y-1 transition duration-200
     w-full flex items-center justify-between min-[850px]:pr-6 flex-col min-[850px]:flex-row h-fit"
      onMouseMove={handleMove}
      ref={ref}
    >
      <BlurBall offsetX={offsetX} offsetY={offsetY} />

      <div className="relative cursor-pointer min-w-full min-[850px]:min-w-[250px] overflow-hidden
       my-3 min-[850px]:mr-0"
      ref={iamgeCont}>
        <div
          className="overflow-hidden bg-black/60 w-full h-full"
        >
          <img
            src={cardImage}
            alt="example"
            className="absolute object-contain w-fit"
            loading="lazy"
            onClick={() => navigate(`/tours/${tour_id}`)}
          />
        </div>
      </div>
      <div
        className="flex justify-between grow min-[850px]:items-center flex-col min-[850px]:flex-row w-full
       px-3 gap-6 min-[850px]:gap-0"
      >
        <div
          className="flex flex-col max-w-[250px] justify-center gap-3 min-[850px]:ml-3
          py-2"
        >
          <span className="text-lg font-semibold">{title}</span>
          <span className=" font-light text-white/60">{`${
            daysOfWeek[date.getDay()]
          } ${date.getDate()} ${
            monthAbbreviations[date.getMonth()]
          }, ${date.getFullYear()}`}</span>
        </div>
        <span
          className=" underline relative z-[2] cursor-pointer w-fit h-fit transition duration-200 
      hover:text-yellow-200 whitespace-nowrap mb-5"
        >
          View Details
        </span>
      </div>
    </div>
  );
};
