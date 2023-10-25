import { motion } from "framer-motion";
export const AboutUs = () => {
  return (
    <div
      className="pt-24 full:px-[3%] min-[1200px]:px-[10%] flex 
        full:flex-row flex-col gap-10 px-[10%] mb-12"
    >
      <div className="text-white flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl text-yellow-500"
        >
          ABOUT US
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl laptop:text-5xl text-white font-semibold"
        >
          Explore All Corners of The Universe With Us
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-light"
        >
          AstroXplorer is your gateway to the cosmos, where dreams of
          interplanetary adventure become a breathtaking reality. Founded on a
          passion for space exploration and an unwavering commitment to making
          the universe accessible to all, we're your trusted partner in
          exploring the wonders of our solar system.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-2 border-white py-1 px-3 text-lg w-fit transition-colors duration-200 
            hover:bg-white border-[--secundary-color] hover:text-black hover:font-semibold"
        >
          Read more
        </motion.button>
      </div>
      <div className="grid grid-cols-2 full:pt-12 laptop:min-w-[550px] gap-10">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src="src/images/temp-1.jpg"
          className="full:h-[300px]"
        />
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src="src/images/temp-2.jpg"
          className="full:h-[300px] full:mt-12"
        />
      </div>
    </div>
  );
};
