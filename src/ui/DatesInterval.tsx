import { FaArrowRight } from "react-icons/fa6";
import { daysOfWeek, monthAbbreviations } from "../utils/months";

export const DatesInterval = ({
  date,
  duration,
}: {
  date: string;
  duration: string;
}) => {
  const startDate = new Date(date);
  const finishDate = new Date(startDate);
  finishDate.setDate(finishDate.getDate() + Number(duration));
  return (
    <section className="border border-white/20 rounded-lg p-4 text-lg font-light flex items-center gap-10">
      <div className="flex flex-col gap-0 font-light text-base">
        <span>{`${daysOfWeek[startDate.getDay()]}`}</span>
        <span className=" font-semibold text-xl">{`${startDate.getDate()} ${
          monthAbbreviations[startDate.getMonth()]
        }, ${startDate.getFullYear()}`}</span>
      </div>
      <FaArrowRight className="scale-[1.5]" />
      <div className="flex flex-col gap-0 font-light text-base">
        <span>{`${daysOfWeek[finishDate.getDay()]}`}</span>
        <span className=" font-semibold text-xl">{`${finishDate.getDate()} ${
          monthAbbreviations[finishDate.getMonth()]
        }, ${finishDate.getFullYear()}`}</span>
      </div>
    </section>
  );
};
