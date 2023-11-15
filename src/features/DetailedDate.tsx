import { IDate } from "../moduls";
import { FaBed, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addPurchasedTour,
  changeConfirmingPopup,
  retrievePurchasedTours,
} from "./UserTours/userToursSlice";
import { useNavigate, useParams } from "react-router-dom";
import { DatesInterval } from "../ui/DatesInterval";
import { ConfirmPurchase } from "../ui/ConfirmPurchase";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const DetailedDate = ({
  date,
  closeDate,
}: {
  date: IDate;
  closeDate: () => void;
}) => {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      numTravelers: 1,
      suit: "standard",
    },
  });
  const { id: tour_id } = useParams();
  const { id: user_id } = useSelector((store: RootState) => store.auth);
  const { isConfirmingPurchase } = useSelector(
    (store: RootState) => store.userTours
  );
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const travelers = watch("numTravelers");
  const suit = watch("suit");
  const [totalValue, setTotalValue] = useState(0);
  const ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();

  const onSubmit = (data: { numTravelers: number; suit: string }) => {
    let randomId = Math.floor(Math.random() * 999999999);
    dispatch(
      addPurchasedTour({
        id: randomId,
        user_id,
        date_id: date.id,
        numTravelers: data.numTravelers,
        isSuitPremium: data.suit === "premium",
        totalPrice: totalValue,
        tour_id: Number(tour_id),
      })
    ).then((actionResult) => {
      if (addPurchasedTour.fulfilled.match(actionResult)) {
        const newTourId = actionResult.payload[0].id;
        dispatch(retrievePurchasedTours(user_id));
        navigate(`/order/${newTourId}`);
      } else {
        console.error("Error adding purchased tour:", actionResult.error);
      }
    });
  };
  useEffect(() => {
    if (isConfirmingPurchase) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isConfirmingPurchase]);
  const handleInputChange = () => {
    setTotalValue(() => {
      let total = 0;
      if (suit === "standard") {
        total = date.price * travelers;
      } else {
        total = (date.price + date.price * 0.3) * travelers;
      }
      return total;
    });
  };
  useEffect(() => {
    handleInputChange();
  }, [suit, travelers]);
  return (
    <main
      className=" bg-transparent border border-white/20 rounded-lg pt-12 relative px-5
     flex flex-col gap-10 items-start"
    >
      <button
        className=" scale-[1.3] absolute right-4 top-4 text-white/60 transition duration-200
 hover:text-white hover:rotate-90"
        onClick={closeDate}
      >
        <FaXmark />
      </button>
      <h1 className="text-yellow-500 text-3xl font-semibold">
        Your adventure overview
      </h1>
      <form
        className="w-full flex flex-col gap-5 h-full pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DatesInterval date={date.startDate} duration={date.duration} />
        <section className="border border-white/20 rounded-lg p-4 flex justify-between">
          <div className=" font-semibold text-lg tablet:text-xl flex gap-5 items-center leading-6">
            <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black">
              1
            </span>{" "}
            How many are travelling?
          </div>
          <select
            className="bg-transparent border-white/20 border p-1 focus:outline-none cursor-pointer max-h-[30px]"
            id="numTravelers"
            {...register("numTravelers")}
          >
            {ten.map((option) => (
              <option
                key={option}
                value={option}
                className="text-white bg-black"
              >
                {option}
              </option>
            ))}
          </select>
        </section>
        <section className="border border-white/20 rounded-lg p-4 flex flex-col gap-5">
          <div className=" font-semibold text-lg tablet:text-xl flex gap-5 items-center">
            <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black">
              2
            </span>{" "}
            Select accomodation
          </div>
          <div className="flex gap-3 items-center border-b border-white/20 pb-5">
            <FaBed />{" "}
            <span className="font-light text-base tablet:text-lg">
              Please assign{" "}
              <span className="font-semibold">
                {travelers} {travelers == 1 ? "Traveller" : "Travellers"}
              </span>{" "}
              to a type of room.
            </span>
          </div>
          <div className="flex flex-col full:flex-row gap-7 justify-between items-start w-full pb-5 border-b border-white/20">
            <div className="flex flex-col gap-3 items-start w-[300px]">
              <div className="flex items-center gap-5 tablet:gap-3">
                <h2 className=" font-semibold text-lg tablet:text-xl">
                  Standard Room
                </h2>
                <span className="py-1 px-2 rounded-xl bg-yellow-200 text-yellow-900 font-semibold text-sm">
                  Public
                </span>
              </div>
              <span className=" font-light text-white/60 text-sm tablet:text-base max-w-[220px]">
                Per person in a room for maximum 16 people.
              </span>
            </div>
            <div className="flex grow full:justify-around justify-between w-full">
              <div className="flex flex-col items-start">
                <span className="font-semibold">
                  ${String(date.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                <span className=" text-sm font-light text-white/60">
                  per traveller
                </span>
              </div>
              <label
                className="h-5 w-5 cursor-pointer relative"
                htmlFor="standard"
              >
                <span
                  className={`rounded-full border-2 h-5 w-5 absolute ${
                    suit === "standard" ? "bg-white" : "bg-transparent"
                  }`}
                ></span>
                <input
                  className=" invisible"
                  type="radio"
                  id="standard"
                  value="standard"
                  {...register("suit")}
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col full:flex-row gap-7 justify-between items-start w-full pb-5">
            <div className="flex flex-col gap-3 items-start w-[300px]">
              <div className="flex items-center gap-5 tablet:gap-3">
                <h2 className=" font-semibold text-lg tablet:text-xl">
                  Premium Room
                </h2>
                <span className="py-1 px-2 rounded-xl bg-yellow-200 text-yellow-900 font-semibold text-sm">
                  Private
                </span>
              </div>
              <span className=" font-light text-white/60 text-sm tablet:text-base max-w-[220px]">
                Per person in a personal room.
              </span>
            </div>
            <div className="flex grow full:justify-around justify-between w-full">
              <div className="flex flex-col items-start">
                <span className="font-semibold">
                  $
                  {String(date.price + date.price * 0.3).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </span>
                <span className=" text-sm font-light text-white/60">
                  per traveller
                </span>
              </div>
              <label
                className="h-5 w-5 cursor-pointer relative"
                htmlFor="premium"
              >
                <span
                  className={`rounded-full border-2 h-5 w-5 absolute ${
                    suit === "premium" ? "bg-white" : "bg-transparent"
                  }`}
                ></span>
                <input
                  className=" invisible"
                  type="radio"
                  id="premium"
                  value="premium"
                  {...register("suit")}
                />
              </label>
            </div>
          </div>
        </section>
        <div className="border border-white/20 rounded-lg p-4 flex flex-col gap-5">
          <div className=" font-semibold text-lg tablet:text-xl flex gap-5 items-center">
            <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black">
              3
            </span>{" "}
            Price breakdown
          </div>
          <div>
            <div className="flex flex-col gap-2 pb-5 border-b border-white/20">
              <div className="flex tablet:gap-20 text-base tablet:text-lg justify-between tablet:justify-normal">
                <span>
                  {suit === "standard" ? "Standard Room" : "Premium Room"}
                </span>
                <span>
                  {`$${String(totalValue).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}`}
                </span>
              </div>
              <span className=" font-light tracking-wider text-white/60">
                {travelers} {travelers == 1 ? "Traveller" : "Travellers"} x $
                {`${
                  suit === "standard"
                    ? `${String(date.price).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}`
                    : `${String(date.price + date.price * 0.3).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}`
                }`}
                .00
              </span>
            </div>
            <div className="flex items-center justify-between font-semibold pt-8 text-lg tablet:text-2xl">
              <span>Total due</span>
              <span>
                US$
                {`${String(totalValue).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                .00
              </span>
            </div>
          </div>
        </div>
        <button
          className="bg-yellow-500 text-black py-3 transition duration-200 text-xl font-semibold
         hover:bg-yellow-200"
          type="button"
          onClick={() => dispatch(changeConfirmingPopup(true))}
        >
          Book {travelers} space
        </button>
      </form>
      {isConfirmingPurchase && (
        <ConfirmPurchase onSubmit={handleSubmit(onSubmit)} />
      )}
    </main>
  );
};
