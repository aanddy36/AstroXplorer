import { motion } from "framer-motion";
import groupOfAstronauts from "../images/aboutUs/group-of-astronauts-2.jpg"
import groupOfAstronauts2 from "../images/aboutUs/astronaut-2.jpg"
export const CompanyDescription = () => {
  return (
    <>
      <div
        className="text-white px-[6%] full:px-[10%] mt-24 flex flex-col laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <div className="flex flex-col justify-between gap-5 laptop:pr-16 full:pr-32">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-4xl full:text-5xl font-semibold"
          >
            Who We Are?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light full:text-lg text-center laptop:text-left"
          >
            At AstroXplorer, we're a passionate team of space enthusiasts,
            committed to sharing the wonders of the cosmos with the world. Our
            team, composed of astrophysicists, space engineers, and adventurers,
            is on a mission to make interplanetary travel accessible to all. We
            blend science and adventure to create journeys of discovery and
            amazement that leave you with a profound sense of wonder.
          </motion.p>
        </div>
        <img
          src={groupOfAstronauts}
          alt="Group of astronauts"
          className="h-[300px] full:h-[400px]"
        />
      </div>
      <div
        className="text-white px-[6%] full:px-[10%] mt-24 flex flex-col-reverse laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <img
          src={groupOfAstronauts2}
          alt="Group of astronauts 2"
          className="h-[300px] full:h-[400px]"
        />
        <div className="flex flex-col justify-between gap-5 laptop:pl-16 full:pl-32">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-4xl full:text-5xl font-semibold"
          >
            Why Choose AstroXplorer?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light full:text-lg text-center laptop:text-left"
          >
            AstroXplorer stands out for its unmatched expertise in space
            exploration. Our team of experts ensures your safety and enjoyment
            throughout your interplanetary voyage. We use cutting-edge
            technology, maintain strict safety standards, and prioritize
            sustainability. Every tour offers educational opportunities,
            inspiring experiences, and accessibility for all. With us, you'll
            embark on a memorable journey through the cosmos, fulfilling your
            dreams of exploring the universe.
          </motion.p>
        </div>
      </div>
    </>
  );
};
