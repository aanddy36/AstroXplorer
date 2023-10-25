import { motion } from "framer-motion";
import { faqHome } from "../utils/faqHome";
import { FaChevronDown } from "react-icons/fa6";
import { useRef, useState } from "react";
type IAreFAQOpen = {
  0: boolean,
  1: boolean,
  2: boolean,
  3: boolean,
  4: boolean,
  [key: number]: boolean;
}
const initialState: IAreFAQOpen = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

export const FAQ = () => {
  const [areFAQOpen, setAreFAQOpen] = useState<IAreFAQOpen>(initialState);
  const listItemRefs = useRef<HTMLLIElement[] | []>([]);
  return (
    <div className="text-white flex flex-col gap-4 min-[1200px]:pl-8">
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
        className="text-4xl laptop:text-5xl font-semibold text-center full:text-left"
      >
        Frequently Asked Questions
      </motion.h3>
      <motion.ul
        initial={{ opacity: 0, translateY: "100%" }}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-light border-t border-white/80 mt-12"
      >
        {faqHome.map((section, index) => {
          const { question, answer } = section;
          return (
            <motion.li
              key={index}
              ref={(el) => (listItemRefs.current[index] = el as HTMLLIElement)}
              animate={{ height: areFAQOpen[index] ? listItemRefs.current[index]?.scrollHeight : "60px" }}
              transition={{ duration: 0.2 }}
              className="text-white border-b border-white/80 overflow-hidden py-4 px-4 faq"
            >
              <button
                className="font-semibold text-lg tablet:text-xl flex items-center justify-between w-full"
                onClick={() => setAreFAQOpen((prev) => {
                  return {
                    ...initialState,
                    [index]: !prev[index]
                  }
                })}
              >
                {question}
                <motion.span
                  animate={{ rotate: areFAQOpen[index] ? "180deg" : "0deg" }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <p className="pt-5">{answer}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};
