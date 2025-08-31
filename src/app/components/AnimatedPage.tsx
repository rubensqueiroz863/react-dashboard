"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  userId: string | null;
};

export default function AnimatedHome({ userId }: Props) {

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.8 },
  });

  return (
    <section className="flex mb-20 flex-col w-full items-center justify-center">

      {/* Títulos */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center flex-col"
      >
        <p className="text-5xl mb-5 font-black">FinanX</p>
        <p className="text-4xl">Controle suas finanças</p>
        <p className="text-4xl font-bold">com facilidade</p>
      </motion.div>

      {/* Parágrafos */}
      <motion.div
        {...fadeInUp(0.5)}
        className="flex flex-col justify-center items-center my-10"
      >
        <p className="text-md">Tudo o que você precisa para controlar suas finanças</p>
        <p className="text-md">sem perder tempo.</p>
      </motion.div>

      {/* Botão com animação e interatividade */}
        <Link href={userId ? "/overview" : "/sign-in"}>
          <motion.button
            {...fadeInUp(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neutral-800 cursor-pointer text-white py-2 px-6 rounded-md font-medium transition-all duration-300 hover:shadow-xl hover:bg-neutral-700"
          >
            Começar agora
          </motion.button>
        </Link>
    </section>
  );
}