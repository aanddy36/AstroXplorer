import { HomePhoto } from "../ui/HomePhoto";
export const Home = () => {
  return (
    <article className="h-[100vh] relative z-[1]">
      <HomePhoto/>
      <div className="absolute top-[50%] translate-y-[-50%] left-[10%] text-[--main-font-color] w-[80%] laptop:w-[50%] flex flex-col gap-6">
        <h1 className="font-bold text-5xl tablet:text-6xl font-serif tracking-wide">
          Beyond the Earth, Awaits the Universe
        </h1>
        <p>
          AstroXplorer will take you beyond the Earth to a universe of
          possibilities. Explore the wonders of space, from Mercury to Pluto.
          Your next great adventure awaits among the stars!
        </p>
      </div>
    </article>
  );
};
