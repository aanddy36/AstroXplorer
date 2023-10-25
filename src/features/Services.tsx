import {
  FaPeopleGroup,
  FaRegMoneyBill1,
  FaShuttleSpace,
} from "react-icons/fa6";
import { motion } from "framer-motion";

export const Services = () => {
  return (
    <div className="px-[3%] min-[1200px]:px-[10%] text-white flex flex-col items-center bg-transparent py-24 gap-4">
      <motion.h1
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl text-yellow-500"
      >
        OUR SERVICES
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className=" text-4xl laptop:text-5xl text-white font-semibold text-center"
      >
        Join Us on a Journey Beyond Imagination
      </motion.h3>
      <div className="w-full grid full:grid-cols-3 grid-cols-1 full:gap-0 gap-8 pt-8">
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl 
      max-w-[350px]"
        >
          <FaRegMoneyBill1 className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">Affordable Adventures</h3>
          <p className="font-light text-center">
            Fulfill your interplanetary dreams without draining your savings
            with our budget-friendly tours.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl 
      max-w-[350px]"
        >
          <FaPeopleGroup className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">Group Expeditions</h3>
          <p className="font-light text-center">
            Share the magic of space exploration with your loved ones on our
            group adventures designed for memorable family and friend outings.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 bg-white/20 mx-auto full:mx-5 px-5 py-6 rounded-xl 
      max-w-[350px]"
        >
          <FaShuttleSpace className="scale-[4] my-6" />
          <h3 className="font-semibold text-xl">Luxury Space Safaris</h3>
          <p className="font-light text-center">
            Elevate your space journey with the epitome of comfort and style,
            experiencing celestial luxury on our exclusive luxury space safaris.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
