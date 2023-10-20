import { Coordinates } from "../moduls";

export const BlurBall = ({offsetX, offsetY}:Coordinates) => {
  return (
    <div
      className="absolute inset-0 opacity-0 bg-white/10 transition duration-300 group-hover:opacity-100"
      style={{
        WebkitMaskImage: `radial-gradient(180px at ${offsetX}px ${offsetY}px, white, transparent)`,
      }}
    ></div>
  );
};
