"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { editTransaction } from "../actions";

type TransactionProps = {
  transactionId: string;
  transactionName: string;
  transactionPrice: string; // vem no formato "234445" (centavos)
  type: "income" | "expense";
  onClose: () => void;
};

export default function EditMenu({ 
  type, 
  onClose, 
  transactionId , 
  transactionName, 
  transactionPrice 
}: TransactionProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // valor formatado para exibir no input
  const [currency, setCurrency] = useState("BRL");
  const [status] = useState("completed");
  const { user, isLoaded } = useUser();

  const price = (parseFloat(transactionPrice)*100).toString();

  // Inicializa os valores quando o modal abre
  useEffect(() => {
    setName(transactionName);

    // Converte string "234445" (centavos) para número
    const number = parseInt(price || "0", 10);
    // Divide por 100 e formata em moeda
    const formatted = (number / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setAmount(formatted);
  }, [transactionName, price]);

  if (!isLoaded) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  const userId = user.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Transforma o valor formatado do input em número
    const numericAmount = parseInt(amount.replace(/\D/g, ""), 10) / 100;

    const result = await editTransaction(transactionId, {
      name,
      amount: numericAmount,
      currency,
      type,
      status,
      userId,
    });

    if (result) {
      onClose();
      window.location.reload();
    }
  }

  // Função que formata o valor digitado enquanto o usuário edita
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const number = parseInt(numericValue || "0", 10);
    return (number / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setAmount(formatCurrency(rawValue));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "income" ? "Editar Receita" : "Editar Despesa"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da transação"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          
          <input
            type="text"
            placeholder="Valor"
            value={amount}
            onChange={handleAmountChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="BRL">BRL - Real</option>
            <option value="USD">USD - Dólar</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 cursor-pointer text-white rounded px-4 py-2 hover:bg-blue-600 flex-1"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 cursor-pointer text-black rounded px-4 py-2 hover:bg-gray-400 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
