import { useEffect, useRef, useState } from "react";
import { Coordinates } from "../../moduls";
import { ImageCont } from "../../ui/ImageCont";
import { BlurBall } from "../../ui/BlurBall";
import { Link } from "react-router-dom";
import { StarRating } from "../../ui/StarRating";
//asdsadas

export const TourCard = ({
  cardImage,
  price,
  title,
  duration,
  id,
  avgreview,
  totalreviews,
}: {
  cardImage: string;
  price: number;
  title: string;
  duration: string;
  id: number;
  avgreview: number;
  totalreviews: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ offsetX, offsetY }, setOffset] = useState<Coordinates>({
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      ref.current.style.minHeight = `${width * 0.8}px`;
    }
    const adjustHeight = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        ref.current.style.minHeight = `${width * 0.8}px`;
      }
    };
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    setOffset({ offsetX, offsetY });
  }
  return (
      <div
        className="group relative overflow-hidden p-px mb-8 text-white bg-gradient-to-b
        from-white/20 to-white/0 hover:translate-x-1 hover:-translate-y-1 transition-all duration-200"
        onMouseMove={handleMove}
        ref={ref}
      >
        <div
          className="flex flex-col h-full gap-8 laptop:gap-4 p-4 bg-gradient-to-b
          from-[#0303037a] to-[#00000081]"
        >
          <BlurBall offsetX={offsetX} offsetY={offsetY} />
          <ImageCont cardImage={cardImage} id={id} title={title} />
          <div className="relative h-full flex flex-col flex-1 gap-5 laptop:gap-3 justify-between">
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-bold text-lg text-left">{title}</h1>
              <p className="font-light text-white/50">{duration} days</p>
              {!totalreviews ? (
                <span className="font-light text-white/70 italic">No reviews yet</span>
              ) : (
                <div className="flex gap-3 font-light text-white/70 items-center">
                  <StarRating rating={avgreview} />{" "}
                  <span className="mb-1">{`(${totalreviews})`}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-end">
              <span className="font-bold">From ${String(price).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                  )}.*</span>
              <Link
                to={String(id)}
                className="px-3 py-2 border-2 border-white/50 bg-transparent hover:bg-white/90 hover:text-black
                transition duration-200"
              >
                View Tour
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
