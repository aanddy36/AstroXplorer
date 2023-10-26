import { motion } from "framer-motion";
export const Vehicles = () => {
  return (
    <div className="text-white">
      <h1 className="text-center text-4xl full:text-5xl font-semibold mt-36">
        The Vehicles
      </h1>
      <div
        className="text-white px-[6%] full:px-[10%] mt-12 flex flex-col-reverse laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <div className="flex flex-col justify-between gap-5 laptop:pr-16 full:pr-24">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-3xl full:text-4xl text-yellow-500"
          >
            DRAGON
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light text-center laptop:text-left"
          >
            The Dragon spacecraft has a passenger capacity of 200 individuals.
            Its groundbreaking bioluminescent hull provides an awe-inspiring
            view of the cosmos and also employs cutting-edge biotechnology to
            recycle and purify the onboard atmosphere, making it a sustainable
            and visually stunning marvel of space travel.
          </motion.p>
        </div>
        <img
          src="src/images/aboutUs/spacecraft-1.png"
          className="h-[300px] full:h-[500px]"
        />
      </div>
      <div
        className="text-white px-[6%] full:px-[10%] mt-24 flex flex-col laptop:flex-row items-center
      gap-8 laptop:gap-0"
      >
        <img
          src="src/images/aboutUs/spacecraft-3.png"
          className="h-[300px] full:h-[500px]"
        />
        <div className="flex flex-col justify-between gap-5 laptop:pl-16 full:pl-24">
          <motion.h1
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center laptop:text-left text-3xl full:text-4xl text-yellow-500"
          >
            NAURU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: "0%" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-light text-center laptop:text-left"
          >
            Nauru is a spacecraft engineered for interstellar journeys, capable
            of traveling immense distances, including missions to Pluto and
            beyond. This advanced vessel accommodates a crew of 50 tourists a
            revolutionary warp drive technology that bends the fabric of
            spacetime, drastically reducing travel time for distant
            destinations, and making it a true marvel of deep space exploration.
          </motion.p>
        </div>
      </div>
    </div>
  );
};
