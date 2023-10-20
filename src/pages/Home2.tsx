import { FaLocationDot } from "react-icons/fa6";
export const Home2 = () => {
  return (
    <div
      className="h-[100vh] relative z-[1] w-full bg-[url('src/images/bg-3.jpg')] bg-cover bg-bottom
    before:content-[''] before:absolute before:inset-0 before:bg-black/50"
    >
      <div className="relative top-[50%] translate-y-[-50%] left-[10%] text-[--main-font-color] w-[80%] laptop:w-[50%] flex flex-col gap-6">
        <h1 className="font-bold text-5xl tablet:text-6xl font-serif tracking-wide">
          Beyond the Earth, Awaits the Universe
        </h1>
        <p>
          AstroXplorer will take you beyond the Earth to a universe of
          possibilities. Explore the wonders of space, from Mercury to Pluto.
          Your next great adventure awaits among the stars!
        </p>
      </div>
      <div className="absolute text-[--main-font-color] flex gap-3 items-center left-[10%] bottom-6">
        <span className="p-3 rounded-full bg-[--bg-icons]"><FaLocationDot /></span>
        Mars - $8000.00 / night
      </div>
    </div>
  );
};
