import { AboutUs } from "../features/AboutUs";
import { FAQ } from "../features/FAQ";
import { ReviewsHome } from "../features/ReviewsHome";
import { Services } from "../features/Services";
import { HomePhoto } from "../ui/HomePhoto";
import { motion } from "framer-motion";
export const Home = () => {
  /*ERRORS TO SOLVE
  NOTE: At the end erase all cardImages and tourImages as they are extracted from supabase, not from the project
  NOTE: Remove scroll bar height for the submenu of Specific Tour
  1. The Popup marker of the Leaflet map doesnt show in production.
  2. OPTIONAL:The navbar of the Specific Tour page should be fixed when exceed (like the search bar).
  5. When im in Profile, log out and then Log in, the app breaks 
  */

  return (
    <main>
      <article className="h-[100vh] relative z-[1] ">
        <HomePhoto />
        <motion.div
          initial={{ opacity: 0, translateY: "-100%" }}
          animate={{ opacity: 1, translateY: "-50%" }}
          transition={{ duration: 1.0 }}
          className="absolute top-[50%] translate-y-[-50%] left-[10%] text-[--main-font-color] w-[80%] laptop:w-[50%]
           flex flex-col gap-6"
        >
          <h1 className="font-bold text-5xl tablet:text-6xl font-serif tracking-wide">
            Beyond the Earth, Awaits the Universe
          </h1>
          <p>
            AstroXplorer will take you beyond the Earth to a universe of
            possibilities. Explore the wonders of space, from Mercury to Pluto.
            Your next great adventure awaits among the stars!
          </p>
        </motion.div>
      </article>
      <AboutUs />
      <Services />
      <div className="grid grid-cols-1 full:grid-cols-2 gap-14 full:gap-0">
        <ReviewsHome />
        <FAQ />
      </div>
    </main>
  );
};
