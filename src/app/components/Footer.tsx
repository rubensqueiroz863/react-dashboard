'use client';

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full bg-neutral-900 text-white py-8 mt-10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-black mb-1"
        >
          FinanX
        </motion.h1>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xs sm:text-sm text-neutral-400"
        >
          &copy; {new Date().getFullYear()} FinanX. Todos os direitos reservados.
        </motion.span>
      </div>
    </motion.footer>
  );
}
