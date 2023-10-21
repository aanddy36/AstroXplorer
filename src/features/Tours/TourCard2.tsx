import { useEffect, useRef, useState } from "react";
import { Coordinates, ITours } from "../../moduls";
import { ImageCont } from "../../ui/ImageCont";
import { BlurBall } from "../../ui/BlurBall";

export const TourCard2 = ({ cardImage, price, title, duration }: ITours) => {
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
    <>
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
          <ImageCont cardImage={cardImage} />
          <div className="relative h-full flex flex-col flex-1 gap-5 laptop:gap-3 justify-between">
            <div className="flex flex-col items-start gap-2">
              <h1 className="font-bold text-lg text-left">{title}</h1>
              <p className="font-light text-white/50">{duration} days</p>
            </div>
            <div className="flex justify-between items-end">
              <span className="font-bold">From ${price}.*</span>
              <a href="" target="_blank">
                <button
                  className="px-3 py-2 border-2 border-white/50 bg-transparent hover:bg-white/90 hover:text-black
                transition duration-200"
                >
                  View Tour
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
