import { motion } from "framer-motion";
import ceo from "../images/aboutUs/ceo.png"
import kurt from "../images/aboutUs/kurt.jpg"
import annie from "../images/aboutUs/annie.jpg"
import tyrone from "../images/aboutUs/tyrone.jpg"
import jisoo from "../images/aboutUs/jisoo.jpg"
export const TeamMembers = () => {
  return (
    <div className="text-white px-8 laptop:px-[10%] pb-28">
      <motion.h1
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-4xl full:text-5xl font-semibold mt-36"
      >
        Our Team
      </motion.h1>
      <div className="flex flex-col items-center mt-24 gap-6">
        <motion.h1
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center laptop:text-left text-3xl full:text-4xl my-10 text-yellow-500"
        >
          LEADERSHIP TEAM
        </motion.h1>
        <motion.img
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src={ceo}
          alt="CEO of AstroXplorer"
          className="h-[175px] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2"
        >
          <h2 className="font-semibold text-2xl">Andrés Del Chiaro</h2>
          <h3 className="font-light">CEO and Lead Developer</h3>
        </motion.div>
      </div>
      <div className="flex flex-col items-center mt-24 gap-4">
        <motion.h1
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center laptop:text-left text-3xl full:text-4xl my-10 text-yellow-500"
        >
          TOUR GUIDES
        </motion.h1>
        <div className="grid grid-cols-2 full:grid-cols-4 w-full gap-12 full:gap-0">
          <div className="flex flex-col items-center gap-6">
            <motion.img
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              src={kurt}
              alt="Kurt Tour Guide"
              className="h-[125px] tablet:h-[175px] rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1 tablet:gap-2"
            >
              <h2 className="font-semibold text-xl tablet:text-2xl">
                Kurt Simmons
              </h2>
              <h3 className="font-light">Tour Guide</h3>
            </motion.div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <motion.img
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              src={annie}
              alt="Annie Tour Guide"
              className="h-[125px] tablet:h-[175px] rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1 tablet:gap-2"
            >
              <h2 className="font-semibold text-xl tablet:text-2xl">
                Annie Jackson
              </h2>
              <h3 className="font-light">Tour Guide</h3>
            </motion.div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <motion.img
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              src={tyrone}
              alt="Tyrone Tour Guide"
              className="h-[125px] tablet:h-[175px] rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1 tablet:gap-2"
            >
              <h2 className="font-semibold text-xl tablet:text-2xl">
                Tyrone Welter
              </h2>
              <h3 className="font-light">Tour Guide</h3>
            </motion.div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <motion.img
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              src={jisoo}
              alt="Jisoo Tour Guide"
              className="h-[125px] tablet:h-[175px] rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0%" }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1 tablet:gap-2"
            >
              <h2 className="font-semibold text-xl tablet:text-2xl">
                Jisoo Lee
              </h2>
              <h3 className="font-light">Tour Guide</h3>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
