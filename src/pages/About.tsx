import { motion } from "framer-motion";
import { Vehicles } from "../features/Vehicles";
import { CompanyDescription } from "../features/CompanyDescription";
import { TeamMembers } from "../features/TeamMembers";
export const About = () => {
  return (
    <main className="bg-[url('src/images/bgImages/starred-bg.jpg')]">
      <div
        className="h-[400px] relative z-[1] w-full bg-[url('src/images/bgImages/icy-03.jpg')] bg-cover bg-center
        before:content-[''] before:absolute before:inset-0 before:bg-black/50"
      >
        <motion.h1
          initial={{ opacity: 0, translateY: "-200%" }}
          animate={{ opacity: 1, translateY: "-50%" }}
          transition={{ duration: 1.0 }}
          className="relative text-[--main-font-color] top-[50%] translate-y-[-50%] text-center
        font-bold text-5xl tablet:text-6xl font-serif tracking-wide"
        >
          About Us
        </motion.h1>
      </div>
      <CompanyDescription />
      <Vehicles />
      <TeamMembers />
    </main>
  );
};
