import React from "react";
import { motion } from "framer-motion";

export default function RevealImage({ src, alt }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}
