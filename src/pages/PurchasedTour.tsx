import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import { FaArrowLeft, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { IPurchasedTour } from "../moduls";
import { daysOfWeek, monthAbbreviations } from "../utils/months";
import { Spinner } from "../ui/Spinner";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { deletePurchasedTour } from "../features/UserTours/userToursSlice";
import { ConfirmDeleting } from "../ui/ConfirmDeleting";
import { EditTour } from "../ui/EditTour";

export const PurchasedTour = () => {
  const { orderId } = useParams();
  const { purchasedTours, isRetrieving } = useSelector(
    (store: RootState) => store.userTours
  );
  const { id: user_id } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const [actualOrder, setActualOrder] = useState({} as IPurchasedTour);
  const [missingTime, setMissingTime] = useState(0);
  useEffect(() => {
    setActualOrder(() => {
      return purchasedTours.filter(
        (tour) => String(tour.id) == (orderId as string)
      )[0];
    });
  }, [purchasedTours]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMissingTime(
      new Date(actualOrder?.startDate).getTime() - new Date().getTime()
    );
  }, [actualOrder]);

  useEffect(() => {
    if (isConfirmDeleteOpen || isEditingOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isConfirmDeleteOpen, isEditingOpen]);

  useEffect(() => {
    const handleTimer = () => {
      setMissingTime((prev) => prev - 1000);
    };
    if (missingTime > 0) {
      const myInterval = setInterval(handleTimer, 1000);
      return () => clearInterval(myInterval);
    }
  }, [missingTime]);

  const handleClick = () => {
    dispatch(
      deletePurchasedTour({
        purchased_id: orderId as string,
        user_id,
      })
    );
    document.body.style.overflow = "auto";
    navigate("/profile");
  };

  if (isRetrieving) {
    return (
      <main className="relative pt-32 px-[8%]">
        <Spinner />
      </main>
    );
  }
  return (
    <div className="relative pt-40 text-white px-[10%] flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-yellow-500">
          Order Details
        </h1>
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
          <div className=" flex flex-col gap-3">
            <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-3 items-start tablet:items-center">
              <h1 className="text-xl font-semibold">Order ID: #{orderId}</h1>
              <span className=" rounded-full bg-blue-300 px-4 text-blue-950 py-1 font-semibold">
                Starts soon
              </span>
            </div>
            <span className=" text-white/60">
              Purchased {daysOfWeek[new Date(actualOrder?.created_at).getDay()]}
              , {new Date(actualOrder?.created_at).getDate()}{" "}
              {monthAbbreviations[new Date(actualOrder?.created_at).getMonth()]}{" "}
              {new Date(actualOrder?.created_at).getFullYear()}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-2 rounded-full bg-[#3f3f3fdc] h-fit">
              {actualOrder?.userdata?.name.slice(0, 1).toLocaleUpperCase()}
              {actualOrder?.userdata?.surname.slice(0, 1).toLocaleUpperCase()}
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">Customer:</span>
              <span className="text-white/60">
                Name: {actualOrder?.userdata?.name}{" "}
                {actualOrder?.userdata?.surname}
              </span>
              <span className="text-white/60">
                Email: {actualOrder?.useremail}
              </span>
            </div>
          </div>
        </section>
        <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold py-8">
          {actualOrder?.title}
        </h1>
        <div
          className="flex flex-col items-center w-full border border-white/20 rounded-lg py-5 gap-7 laptop:gap-10 
         px-3 tablet:px-0"
        >
          <h1 className="text-2xl tablet:text-3xl font-semibold">
            Your journey starts in
          </h1>
          <div className=" flex justify-center gap-4 laptop:gap-6 full:gap-10 items-center flex-wrap">
            <div className=" flex flex-col items-center text-xs laptop:text-base full:text-lg gap-0 laptop:gap-2">
              <h2 className="text-2xl laptop:text-4xl full:text-5xl text-yellow-500">
                {Math.floor(missingTime / 2592000000) > 9
                  ? Math.floor(missingTime / 2592000000)
                  : `0${Math.floor(missingTime / 2592000000)}`}
              </h2>
              <span>Months</span>
            </div>
            <div className="flex flex-col justify-between gap-2 laptop:gap-4">
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
            </div>
            <div className=" flex flex-col items-center text-xs laptop:text-base full:text-lg gap-0 laptop:gap-2">
              <h2 className="text-2xl laptop:text-4xl full:text-5xl text-yellow-500">
                {Math.floor((missingTime % 2592000000) / 86400000) > 9
                  ? Math.floor((missingTime % 2592000000) / 86400000)
                  : `0${Math.floor((missingTime % 2592000000) / 86400000)}`}
              </h2>
              <span>Days</span>
            </div>
            <div className="flex flex-col justify-between gap-2 laptop:gap-4">
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
            </div>
            <div className=" flex flex-col items-center text-xs laptop:text-base full:text-lg gap-0 laptop:gap-2">
              <h2 className="text-2xl laptop:text-4xl full:text-5xl text-yellow-500">
                {Math.floor(((missingTime % 2592000000) % 86400000) / 3600000) >
                9
                  ? Math.floor(
                      ((missingTime % 2592000000) % 86400000) / 3600000
                    )
                  : `0${Math.floor(
                      ((missingTime % 2592000000) % 86400000) / 3600000
                    )}`}
              </h2>
              <span>Hour</span>
            </div>
            <div className="flex flex-col justify-between gap-2 laptop:gap-4">
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
            </div>
            <div className=" flex flex-col items-center text-xs laptop:text-base full:text-lg gap-0 laptop:gap-2">
              <h2 className="text-2xl laptop:text-4xl full:text-5xl text-yellow-500">
                {Math.floor(
                  (((missingTime % 2592000000) % 86400000) % 3600000) / 60000
                ) > 9
                  ? Math.floor(
                      (((missingTime % 2592000000) % 86400000) % 3600000) /
                        60000
                    )
                  : `0${Math.floor(
                      (((missingTime % 2592000000) % 86400000) % 3600000) /
                        60000
                    )}`}
              </h2>
              <span>Minutes</span>
            </div>
            <div className="flex flex-col justify-between gap-2 laptop:gap-4 invisible tablet:visible">
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
              <span className="h-1 w-1 laptop:h-[6px] laptop:w-[6px] bg-yellow-500 rounded-full"></span>
            </div>
            <div className=" flex flex-col items-center text-xs laptop:text-base full:text-lg gap-0 laptop:gap-2">
              <h2 className="text-2xl laptop:text-4xl full:text-5xl text-yellow-500">
                {Math.floor(
                  ((((missingTime % 2592000000) % 86400000) % 3600000) %
                    60000) /
                    1000
                ) > 9
                  ? Math.floor(
                      ((((missingTime % 2592000000) % 86400000) % 3600000) %
                        60000) /
                        1000
                    )
                  : `0${Math.floor(
                      ((((missingTime % 2592000000) % 86400000) % 3600000) %
                        60000) /
                        1000
                    )}`}
              </h2>
              <span>Seconds</span>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          <h1 className="text-2xl tablet:text-3xl font-semibold">Summary</h1>
          <table className="w-full tablet:w-[90%] mx-auto mt-4">
            <thead className="border-b border-white/20 text-center text-base tablet:text-lg">
              <tr>
                <th className="py-3">ROOM</th>
                <th>TRAVELERS</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody className="text-center text-base tablet:text-lg">
              <tr>
                <td className="py-3 font-light text-white/70">
                  {actualOrder?.isSuitPremium ? "Premium" : "Standard"}
                </td>
                <td className=" font-light text-white/70">
                  {actualOrder?.numTravelers}
                </td>
                <td className=" font-light text-white/70">{`$${String(
                  actualOrder?.totalPrice / actualOrder?.numTravelers
                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</td>
              </tr>
            </tbody>
          </table>
          <div
            className="flex items-center justify-between font-semibold p-4 text-lg tablet:text-2xl
          w-full tablet:w-[90%] mx-auto border rounded-lg border-white/20 mt-4"
          >
            <span>Total due</span>
            <span className="text-yellow-500">
              US$
              {`${String(actualOrder?.totalPrice).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}`}
              .00
            </span>
          </div>
        </div>
        <div className="w-full flex justify-end mt-12 gap-8 laptop:gap-12">
          <button
            className="border bg-transparent font-semibold py-2 w-[120px] laptop:w-[150px] text-sm laptop:text-base 
          transition duration-200 hover:bg-white hover:text-black flex items-center gap-2 tablet:gap-4 justify-center
           border-white/20"
            onClick={() => setIsEditingOpen(true)}
          >
            <FaRegPenToSquare />
            Edit Tour
          </button>
          <button
            className=" bg-red-600 font-semibold py-2 w-[120px] laptop:w-[150px] text-sm 
          laptop:text-base transition duration-200 hover:bg-red-200 flex items-center gap-2 tablet:gap-4 
          justify-center"
            onClick={() => setIsConfirmDeleteOpen(true)}
          >
            <FaRegTrashCan />
            Delete Tour
          </button>
        </div>
      </article>
      {isConfirmDeleteOpen && (
        <ConfirmDeleting
          handleClick={() => handleClick()}
          setClose={() => setIsConfirmDeleteOpen(false)}
        />
      )}
      {isEditingOpen && (
        <EditTour
          setClose={() => setIsEditingOpen(false)}
          tourInfo={actualOrder}
        />
      )}
    </div>
  );
};
