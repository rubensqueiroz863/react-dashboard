"use client";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-3xl mx-auto p-6 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Sobre o Projeto
        </motion.h1>

        <motion.section
          className="space-y-6 text-lg leading-relaxed text-gray-800"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
            <motion.p
              variants={itemVariants}
            >
              O <strong>Dashboard Financeiro Pessoal</strong> é uma aplicação web desenvolvida com <strong>React</strong> e <strong>Next.js</strong>, criada para facilitar o controle das finanças pessoais de forma prática, rápida e intuitiva. A plataforma permite o registro e acompanhamento de receitas, despesas e saldo mensal, oferecendo uma visão clara da saúde financeira do usuário.
            </motion.p>

            <motion.p
                variants={itemVariants}
            >
                O sistema foi projetado para ser totalmente responsivo e de fácil usabilidade, permitindo a categorização dos gastos, a análise do desempenho financeiro ao longo do tempo e a visualização dos dados por meio de gráficos e relatórios interativos.
            </motion.p>

            <motion.p
                variants={itemVariants}
            >
                Este projeto também tem como objetivo consolidar conhecimentos em desenvolvimento web moderno, focando na criação de componentes reutilizáveis, no uso dos hooks do React, no roteamento dinâmico com Next.js e na integração com APIs. É uma iniciativa prática para unir tecnologia e organização financeira em uma única solução.
            </motion.p>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}