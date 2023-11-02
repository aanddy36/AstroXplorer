import { AboutUs } from "../features/AboutUs";
import { FAQ } from "../features/FAQ";
import { ReviewsHome } from "../features/ReviewsHome";
import { Services } from "../features/Services";
import { HomePhoto } from "../ui/HomePhoto";
import { motion } from "framer-motion";
export const Home = () => {
  /*ERRORS TO SOLVE
  1. Hishori Tanaka review in CELULAR devices
  2. FAQ 2nd & 3rd question in CELULAR devices
  3. Initial circle in the sidebar in CELULAR DEVICES
  4. Search bar in Tour page must have greater z than Filter & Sort menu
  5. Add reset password functionality in Log In and Sign Up page
  6. At the end erase all cardImages and tourImages as they are extracted from supabase, not from the project
  7. BUG:When im in the SpecificTour page and then I click back to Tour, the search bar, gets fixed at the exact top
  8. Bg images of Login and Signup page is not showing up
  9. In tours, the section Tours > TITLE, there is a bug for mobile: the padding is not added when it goes to the next line. Ej: Saturn tour.
  10. Remove scroll bar height for the submenu of Specific Tour
  11. When i go back from the Specific tour, the Search bar keeps the previous text. That shouldnt pass.
  12. BUG: Cuando hay 4 reviews, en la seccion Reviews de SpecificTour en Mobile no se ve por completo.
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
      <div className="px-[10%] full:px-[3%] min-[1200px]:px-[10%] grid grid-cols-1 full:grid-cols-2 gap-14 full:gap-0">
        <ReviewsHome />
        <FAQ />
      </div>
    </main>
  );
};
