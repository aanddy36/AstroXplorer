import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IPurchasedTour } from "../moduls";
import { daysOfWeek, monthAbbreviations } from "../utils/months";

export const PurchasedTour = () => {
  const { orderId } = useParams();
  const { purchasedTours } = useSelector((store: RootState) => store.userTours);
  const navigate = useNavigate();
  //console.log(purchasedTours);
  const [actualOrder, setActualOrder] = useState({} as IPurchasedTour);
  useEffect(() => {
    setActualOrder(() => {
      return purchasedTours.filter(
        (tour) => String(tour.id) == (orderId as string)
      )[0];
    });
  }, [purchasedTours]);

  useEffect(() => {
    console.log(new Date(actualOrder?.created_at));
  }, [actualOrder]);
  return (
    <div className="relative pt-40 text-white px-[10%] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-yellow-500">Order Details</h1>
        <button
          className="border-b border-white/40 transition duration-200 hover:text-white flex items-center gap-2
          w-fit cursor-pointer text-white/60"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Get back
        </button>
      </div>
      <article className="border border-white/20 rounded-lg p-5">
        <section className="flex justify-between w-full flex-col laptop:flex-row gap-8 border-b pb-5 border-b-white/20">
          <div className=" flex flex-col">
            <h1 className="text-xl font-semibold">Order ID: #{orderId}</h1>
            <span className=" text-white/60">
              Purchased {daysOfWeek[new Date(actualOrder?.created_at).getDay()]}
              , {new Date(actualOrder?.created_at).getDate()}{" "}
              {monthAbbreviations[new Date(actualOrder?.created_at).getMonth()]}{" "}
              {new Date(actualOrder?.created_at).getFullYear()}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-2 rounded-full bg-[#3f3f3fdc] h-fit">
              {actualOrder?.userdata.name.slice(0, 1).toLocaleUpperCase()}
              {actualOrder?.userdata.surname.slice(0, 1).toLocaleUpperCase()}
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Customer:</span>
              <span className="text-white/60">
                Name: {actualOrder?.userdata.name}{" "}
                {actualOrder?.userdata.surname}
              </span>
              <span className="text-white/60">Email: {actualOrder?.useremail}</span>
            </div>
          </div>
        </section>
        <h1 className="text-5xl font-bold py-8 border-b border-b-white/20">{actualOrder?.title}</h1>
      </article>
    </div>
  );
};
