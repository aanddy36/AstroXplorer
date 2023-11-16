import { useSelector } from "react-redux";
import { RootState } from "../store";
import { FaXmark } from "react-icons/fa6";

export const ConfirmDeleting = ({handleClick, setClose}:{handleClick: ()=>void, setClose: ()=>void}) => {

  const { isDeleting } = useSelector((store: RootState) => store.userTours);
  return (
    <div className="bg-black/70 h-screen w-screen overflow-hidden fixed top-0 left-0 z-[999]">
      <div
        className="bg-[#1f1f1f] h-[340px] w-[350px] tablet:w-[400px] laptop:w-[500px] absolute left-[50%] 
          translate-x-[-50%] top-[45%] tablet:top-[50%] translate-y-[-50%] flex flex-col gap-5 text-white items-center p-5
           shadow-xl shadow-black"
      >
        {" "}
        <div className="w-full flex justify-end">
          <FaXmark
            className="scale-[1.4] transition duration-200 hover:rotate-90 cursor-pointer"
            onClick={setClose}
          />
        </div>
        <h1 className="text-3xl font-semibold text-center w-full">
          Are you sure?
        </h1>
        <span className=" font-light text-white/60 text-center">
          Do you really want to delete this tour? This action can not be undone.
        </span>
        <div className="flex items-center gap-4 mt-6">
          <button
            className="px-3 py-2 border border-white/20 transiton duration-200 hover:bg-white font-semibold
             w-[150px] text-lg hover:text-black text-center disabled:cursor-not-allowed"
            disabled={isDeleting}
            onClick={setClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 px-3 py-2 transiton duration-200 hover:bg-red-200 font-semibold
              w-[150px] text-lg text-center disabled:cursor-not-allowed"
            type="submit"
            disabled={isDeleting}
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
        <span className=" font-light italic text-white/70">
          This is a false tour, so no payment is involved!
        </span>
      </div>
    </div>
  );
};
