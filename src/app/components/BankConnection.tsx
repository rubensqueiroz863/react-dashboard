"use client";

import { motion } from "framer-motion";
import Footer from "./Footer";

export default function BankConnection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7 },
    }),
  };

  const cards = [
    {
      title: "Menos trabalho, mais tempo livre",
      desc: "Seus lançamentos chegam prontos direto do seu banco.",
    },
    {
      title: "Seus gastos sob controle desde o primeiro dia",
      desc: "Traga seu histórico de 90 dias e não comece do zero.",
    },
    {
      title: "Conecte contas PF e PJ sem dor de cabeça",
      desc: "Finanças pessoais e do negócio organizadas no mesmo lugar.",
    },
    {
      title: "Segurança em primeiro lugar",
      desc: "Tecnologia do Banco Central para proteger seus dados e sua privacidade.",
    },
  ];

  return (
    <div>
      <div className="max-w-5xl m-auto px-4">
        <div>
          <div className="flex items-center">
            <p className="text-black font-semibold text-xl">Conexão Bancária</p>
            <div className="flex ml-2 py-1 bg-neutral-800 rounded-xl w-12 items-center justify-center">
              <p className="text-white text-sm">novo</p>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div>
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.5 + i * 0.2}
                  className="p-5 my-4 border-neutral-300 border hover:shadow-md bg-neutral-100 rounded-lg"
                >
                  <p className="font-bold text-xl">{card.title}</p>
                  <p>{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}