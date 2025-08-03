"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

export default function Subscriptions({ sub, index }: { sub: any, index: number }) {
  const features = [
    [
      "• Sem Conexão Bancária",
      "• Controle manual de contas e cartões",
      "• Criação de categorias e subcategorias",
      "• Limite de gastos ilimitados",
      "• Alerta de contas a pagar",
      "• Relatórios completos e fáceis de entender",
      "• Teste por 7 dias grátis",
    ],
    [
      "• Tudo do Plano Manual",
      "• Até 3 contas/cartões conectados",
      "• Conexão via Open Finance",
      "• Importe vários lançamentos com 1 clique",
      "• Categorize os lançamentos do seu jeito",
      "• Mais agilidade para organizar finanças",
      "• Sem teste grátis",
    ],
    [
      "• Tudo do Plano Manual",
      "• Tudo do Plano Conectado",
      "• Até 10 contas/cartões conectados",
      "• Sem teste grátis",
      "•",
      "•",
      "•",
    ],
  ];

  return (
    <motion.div
      className="flex flex-col rounded-xl border shadow-md w-full max-w-sm px-6 py-10 h-full bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
    >
      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold">{sub.name}</h1>
        <p className="py-2 text-md">{sub.description}</p>

        <div className="space-y-2 text-neutral-500 font-sans text-sm mt-2">
          {features[index].map((feature, i) => (
            <p key={i}>{feature}</p>
          ))}
        </div>

        <div className="flex items-end pt-6 mt-auto">
          <p className="text-3xl font-bold">{formatPrice(sub.price)}</p>
          <p className="ml-1 text-lg font-semibold text-neutral-600">/mês</p>
        </div>
      </div>
    </motion.div>
  );
}
