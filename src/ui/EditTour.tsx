import { FaXmark } from "react-icons/fa6";
import { IPurchasedTour } from "../moduls";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { updatePurchasedTour } from "../features/UserTours/userToursSlice";

export const EditTour = ({
  setClose,
  tourInfo,
}: {
  setClose: () => void;
  tourInfo: IPurchasedTour;
}) => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { id: user_id } = useSelector((store: RootState) => store.auth);
  const { isUpdating } = useSelector((store: RootState) => store.userTours);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      numTravelers: tourInfo.numTravelers,
      suit: tourInfo.isSuitPremium ? "premium" : "standard",
    },
  });
  const travelers = watch("numTravelers");
  const suit = watch("suit");
  const [newPrice, setNewPrice] = useState(tourInfo.totalPrice);
  const handleChange = () => {
    setNewPrice(() => {
      let total = 0;
      if (suit === "standard") {
        total = tourInfo.price * travelers;
      } else {
        total = (tourInfo.price + tourInfo.price * 0.3) * travelers;
      }
      return total;
    });
  };
  useEffect(() => {
    handleChange();
  }, [suit, travelers]);
  const onSubmit = (data: { numTravelers: number; suit: string }) => {
    console.log(data);
    console.log(newPrice);
    console.log(tourInfo.id);
    console.log(user_id);
    dispatch(
      updatePurchasedTour({
        id: tourInfo.id,
        numTravelers: data.numTravelers,
        isSuitPremium: data.suit === "premium",
        totalPrice: newPrice,
        user_id,
      })
    );
    setClose();
  };

  return (
    <div className="bg-black/70 h-screen w-screen overflow-hidden fixed top-0 left-0 z-[999]">
      <div
        className="bg-[#1f1f1f] h-[540px] w-[350px] tablet:w-[400px] laptop:w-[500px] absolute left-[50%] 
          translate-x-[-50%] top-[45%] tablet:top-[50%] translate-y-[-50%] flex flex-col gap-5 text-white items-center 
          p-5 shadow-xl shadow-black"
      >
        {" "}
        <div className="w-full flex justify-end">
          <FaXmark
            className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer"
            onClick={setClose}
          />
        </div>
        <h1 className="text-3xl font-semibold text-center w-full">Edit tour</h1>
        <form
          className="flex flex-col items-center gap-4 mt-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section
            className=" text-lg tablet:text-xl flex gap-5 items-center leading-6 w-full 
           justify-between"
          >
            <div className="flex gap-4">
              <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black font-semibold">
                1
              </span>
              <span>How many are travelling?</span>
            </div>
            <select
              className="bg-transparent border-white/20 border p-1 focus:outline-none cursor-pointer max-h-[40px]"
              id="numTravelers"
              {...register("numTravelers")}
            >
              {ten.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="text-white bg-[#1f1f1f]"
                >
                  {option}
                </option>
              ))}
            </select>
          </section>
          <section
            className=" text-lg tablet:text-xl flex gap-5 leading-6 w-full 
           justify-between flex-col"
          >
            <div className="flex gap-4">
              <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black font-semibold">
                2
              </span>
              <span>Select accomodation:</span>
            </div>
            <div className=" flex justify-center gap-9">
              <label
                className="cursor-pointer relative flex flex-row gap-5 items-center w-fit text-lg"
                htmlFor="standard"
              >
                <h2>Standard</h2>
                <span
                  className={`rounded-full border-2 h-5 w-5 absolute right-0 ${
                    suit === "standard" ? "bg-white" : "bg-transparent"
                  }`}
                ></span>
                <input
                  className="invisible"
                  type="radio"
                  id="standard"
                  value="standard"
                  disabled={isUpdating}
                  {...register("suit")}
                />
              </label>
              <div className="flex flex-row gap-3 items-center w-fit">
                <label
                  className="cursor-pointer relative flex flex-row gap-5 items-center w-fit text-lg"
                  htmlFor="premium"
                >
                  <h2>Premium</h2>
                  <span
                    className={`rounded-full border-2 h-5 w-5 absolute right-0 ${
                      suit === "premium" ? "bg-white" : "bg-transparent"
                    }`}
                  ></span>
                  <input
                    className="invisible"
                    type="radio"
                    id="premium"
                    value="premium"
                    disabled={isUpdating}
                    {...register("suit")}
                  />
                </label>
              </div>
            </div>
          </section>
          <section
            className=" text-lg tablet:text-xl flex gap-5 leading-6 w-full 
           justify-between flex-col"
          >
            <div className="flex gap-4">
              <span className="px-[10px] py-[2px] text-base bg-yellow-500 text-black font-semibold">
                3
              </span>
              <span>New price:</span>
            </div>
            <div className=" flex justify-center gap-9">
              <span className="text-white/40 line-through decoration-white/40">
                $
                {String(tourInfo.totalPrice).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
                .00
              </span>
              <span
                className={
                  tourInfo.totalPrice > newPrice
                    ? "text-[#28ff89] font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                ${String(newPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                .00
              </span>
            </div>
          </section>
          <section className="flex items-center gap-4 mt-6">
            <button
              className="px-3 py-2 border border-white/20 transiton duration-200 hover:bg-white font-semibold
             w-[150px] text-lg hover:text-black text-center disabled:cursor-not-allowed"
              disabled={false}
              onClick={setClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-yellow-500 px-3 py-2 transiton duration-200 hover:bg-yellow-200 font-semibold
            w-[150px] text-lg text-center disabled:cursor-not-allowed text-black"
              disabled={false}
            >
              Confirm
            </button>
          </section>
        </form>
        <span className=" font-light italic text-white/70">
          This is a false tour, so no payment is involved!
        </span>
      </div>
    </div>
  );
};
