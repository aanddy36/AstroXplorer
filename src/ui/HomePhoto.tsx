import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { homeImages } from "../utils/homeImages";
import { IHomeBg } from "../moduls";

export const HomePhoto = () => {
  const [photos, setPhotos] = useState(homeImages);
  const [isStoped, setIsStoped] = useState(false);
  useEffect(() => {
    let timerImage: any;
    if (!isStoped) {
      timerImage = setInterval(() => {
        setPhotos((prev: IHomeBg[]) => {
          let newArray = prev.map((photo) => {
            switch (photo.position) {
              case "active":
                return { ...photo, position: "before" };
              case "before":
                return { ...photo, position: "after" };
              case "after":
                return { ...photo, position: "active" };
              default:
                return photo;
            }
          });
          return newArray;
        });
      }, 5000);
    }

    return () => clearInterval(timerImage);
  }, [isStoped]);
  return (
    <div className="relative h-full w-full overflow-hidden">
      <button
        onMouseEnter={() => setIsStoped(true)}
        onMouseLeave={() => setIsStoped(false)}
        className="absolute right-[50%] translate-x-[50%] min-[490px]:max-[1000px]:right-[10%] 
        min-[490px]:max-[1000px]:translate-x-[0] tablet:bottom-7 text-white z-[2] transition duration-200 
        border-2 py-1 hover:bg-[--main-font-color] w-[120px] border-[--secundary-color] hover:text-[--third-color] 
        hover:font-bold bottom-28"
      >
        View More
      </button>
      {photos.map((photo, index) => {
        const { position, price, planet, image } = photo;
        
        return (
          <div
            key={index}
            className={`transition-[transform] duration-300 absolute h-full w-full bg-[url('src/images/bgImages/${image}.jpg')] bg-cover bg-bottom
            before:content-[''] before:absolute before:inset-0 before:bg-black/50 ${position}`}
          >
            <div className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6">
              <span className="p-3 rounded-full bg-[--bg-icons]">
                <FaLocationDot />
              </span>
              {planet} - ${price} / night
            </div>
          </div>
        );
      })}
      {/*<div
        className={`transition-[transform] duration-300 absolute h-full w-full bg-[url('src/images/bgImages/mercury-bg.jpg')] bg-cover bg-bottom
            before:content-[''] before:absolute before:inset-0 before:bg-black/50`}
      >
        <div className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6">
          <span className="p-3 rounded-full bg-[--bg-icons]">
            <FaLocationDot />
          </span>
          Mars - $8000.00 / night
        </div>
    </div>*
    <div
        className={`transition-[transform] duration-300 absolute h-full w-full bg-[url('src/images/bgImages/europe-bg.jpg')] bg-cover bg-bottom
            before:content-[''] before:absolute before:inset-0 before:bg-black/50`}
      >
        <div className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6">
          <span className="p-3 rounded-full bg-[--bg-icons]">
            <FaLocationDot />
          </span>
          Mars - $8000.00 / night
        </div>
    </div>*
    <div
        className={`transition-[transform] duration-300 absolute h-full w-full bg-[url('src/images/bgImages/mars-bg.jpg')] bg-cover bg-bottom
            before:content-[''] before:absolute before:inset-0 before:bg-black/50`}
      >
        <div className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6">
          <span className="p-3 rounded-full bg-[--bg-icons]">
            <FaLocationDot />
          </span>
          Mars - $8000.00 / night
        </div>
    </div>*/}
    </div>
  );
};
