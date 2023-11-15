import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { changeConfirmingPopup } from "../features/UserTours/userToursSlice";
import { RootState } from "../store";
import { toggleModal } from "../features/Modal/modalSlice";
import { useEffect } from "react";

export const ConfirmPurchase = ({ onSubmit }: { onSubmit: () => void }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(toggleModal(true));
    }
  }, []);
  const { isPurchasing } = useSelector((store: RootState) => store.userTours);
  return (
    isLoggedIn && (
      <div className="bg-black/70 h-screen w-screen overflow-hidden fixed top-0 left-0 z-[999]">
        <div
          className="bg-[#1f1f1f] h-[340px] w-[350px] tablet:w-[400px] laptop:w-[500px] absolute left-[50%] 
          translate-x-[-50%] top-[50%] translate-y-[-50%] flex flex-col gap-5 text-white items-center p-5
           shadow-xl shadow-black"
        >
          {" "}
          <div className="w-full flex justify-end">
            <FaXmark
              className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer"
              onClick={() => dispatch(changeConfirmingPopup(false))}
            />
          </div>
          <h1 className="text-3xl font-semibold text-center w-full">
            Confirm transaction
          </h1>
          <span className=" font-light text-white/60 text-center">
            Are you sure you want to buy this tour? This action can be undone in
            the order page.
          </span>
          <div className="flex items-center gap-4 mt-6">
            <button
              className="px-3 py-2 border border-white/20 transiton duration-200 hover:bg-white font-semibold
             w-[150px] text-lg hover:text-black text-center disabled:cursor-not-allowed"
              disabled={isPurchasing}
              onClick={() => dispatch(changeConfirmingPopup(false))}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 transiton duration-200 hover:bg-yellow-200 font-semibold
             text-black w-[150px] text-lg bg-yellow-500 text-center disabled:cursor-not-allowed"
              type="submit"
              disabled={isPurchasing}
              onClick={() => {               
                onSubmit();
              }}
            >
              Buy
            </button>
          </div>
          <span className=" font-light italic text-white/70">
            This is a false tour, so no payment is required!
          </span>
        </div>
      </div>
    )
  );
};
