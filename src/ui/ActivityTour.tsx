export const ActivityTour = ({
  title,
  startDay,
  endDay,
  activities,
  order,
}: {
  title: string;
  startDay: number;
  endDay: number;
  activities: string[];
  order: number;
}) => {
  return (
    <li className={`pl-2 laptop:px-8 ${order % 2 === 0 ? "pb-16 full:p-0" : "pb-16 full:pt-36"}`}>
      <h1 className="font-semibold text-xl">
        <span className="text-yellow-500">
          Day {startDay} - Day {endDay}:
        </span>{" "}
        {title}
      </h1>
      <ul className="pt-6 px-10">
        {activities.map((activity) => {
          return (
            <li key={activity} className="pl-6 py-2 border-l w-fit max-w-[500px] font-light text-white/60 relative">
              <span className="absolute h-3 w-3 bg-white rounded-full top-[50%] translate-y-[-50%]
               left-0 translate-x-[-50%]"></span>
              {activity}
            </li>
          );
        })}
      </ul>
    </li>
  );
};
