"use client";
import { useState } from "react";
import { addTransaction } from "@/app/actions"; // função tipada

type TransactionProps = {
  type: "income" | "expense";
  onClose: () => void;
};

export default function Transaction({ type, onClose }: TransactionProps) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BRL");
  const [status, setStatus] = useState("completed");
  const userId = 1; // pegar ID do usuário logado

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Insira um valor válido.");
      return;
    }

    await addTransaction({
      amount: parsedAmount,
      currency,
      type,
      status,
      userId,
    });

    onClose();
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

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
