import { motion } from "framer-motion";

export const FAQHome = () => {
  return (
    <div className="text-white flex flex-col gap-4">
    <motion.h1
      initial={{ opacity: 0, translateY: "100%" }}
      whileInView={{ opacity: 1, translateY: "0%" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-2xl text-yellow-500 text-center full:text-left"
    >
      FAQ
    </motion.h1>
    <motion.h3
      initial={{ opacity: 0, translateY: "100%" }}
      whileInView={{ opacity: 1, translateY: "0%" }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-5xl font-semibold text-center full:text-left"
    >
      Frequently Asked Questions
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
      passion for space exploration and an unwavering commitment to making the
      universe accessible to all, we're your trusted partner in exploring the
      wonders of our solar system.
    </motion.p>
  </div>
  )
}
