import { useEffect, useRef } from "react";

export const ImageCont = ({ cardImage }: { cardImage?: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      ref.current.style.height = `${width * (9/16)}px`;
    }
    const adjustHeight = () => {
      if (ref.current) {
        const width = ref.current.clientWidth;
        ref.current.style.height = `${width * (9/16)}px`;
      }
    };
    window.addEventListener("resize", adjustHeight);

    return () => window.removeEventListener("resize", adjustHeight);
  }, []);
  return (
    <div className="relative cursor-pointer overflow-hidden" ref={ref}>
      <img src={cardImage} className="relative object-contain" />
    </div>
  );
};
