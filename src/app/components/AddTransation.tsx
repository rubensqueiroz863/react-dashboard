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
  const { name, amount, currency, type, status, userId } = input;

  if (!name || !amount || !currency || !type || !userId) {
    console.error("Parâmetros obrigatórios ausentes:", input);
    return null;
  }

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, amount, currency, type, status, userId }),
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
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BRL");
  const [status] = useState("completed");
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  const userId = user.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numericAmount = parseInt(amount.replace(/\D/g, ""), 10) / 100;

    const result = await addTransaction({
      name,
      amount: numericAmount,
      currency,
      type,
      status,
      userId,
    });

    if (result) {
      onClose(); // fecha modal só se a transação for criada
      window.location.reload();
    } 
  }

  // Dentro do seu componente Transaction
  const formatCurrency = (value: string) => {
    // Remove tudo que não seja número
    const numericValue = value.replace(/\D/g, "");

    // Converte para centavos e formata
    const number = parseInt(numericValue || "0", 10);
    const formatted = (number / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formatted = formatCurrency(rawValue);
    setAmount(formatted);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "income" ? "Adicionar Receita" : "Adicionar Despesa"}
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
