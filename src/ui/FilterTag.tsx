import { FaXmark } from "react-icons/fa6";

export const FilterTag = ({
  text,
  setAddedFilters,
}: {
  text: string;
  setAddedFilters: any;
}) => {
    const handleUnselect = (text:string)=>{
        setAddedFilters((prev:string[]) => {
            return prev.filter(tag => tag !== text)})
    }
  return (
    <button
      className="bg-white/40 rounded-xl py-1 px-3 text-black inline-flex items-center
              gap-3 font-semibold transition-all duration-300 hover:bg-white/70"
              onClick={()=>handleUnselect(text)}
    >
      {text}
      <FaXmark className="inline-block font-extralight scale-[1.1]" />
    </button>
  );
};
