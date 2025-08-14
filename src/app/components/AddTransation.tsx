"use client";

import { useState } from "react";
import { TransactionInput, TransactionResponse } from "@/types/TransactionTypes";
import { useUser } from "@clerk/nextjs";

type TransactionProps = {
  type: "income" | "expense";
  onClose: () => void;
};

// Função para adicionar transação via API
export async function addTransaction(input: TransactionInput): Promise<TransactionResponse | null> {
  const { amount, currency, type, status, userId } = input;

  if (!amount || !currency || !type || !userId) {
    console.error("Parâmetros obrigatórios ausentes:", input);
    return null;
  }

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, type, status, userId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Erro ao criar transação:", errorText);
      return null;
    }

    const data: TransactionResponse = await res.json();
    console.log("Nova transação criada:", data);
    return data;
  } catch (err) {
    console.error("Erro ao chamar API de transação:", err);
    return null;
  }
};

// Componente de modal
export default function Transaction({ type, onClose }: TransactionProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BRL");
  const [status, setStatus] = useState("completed");
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  const userId = user.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Insira um valor válido.");
      return;
    }

    const result = await addTransaction({
      amount: parsedAmount,
      currency,
      type,
      status,
      userId,
    });

    if (result) onClose(); // fecha modal só se a transação for criada
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "income" ? "Adicionar Receita" : "Adicionar Despesa"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 flex-1"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400 flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
