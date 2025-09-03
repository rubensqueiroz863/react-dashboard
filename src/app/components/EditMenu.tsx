"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { editTransaction } from "@/lib/transaction";

type TransactionProps = {
  transactionId: string;
  transactionName: string;
  transactionPrice: string; // vem no formato "234445" (centavos)
  type: "income" | "expense";
  onClose: () => void;
  onUpdated?: () => void;
};

export default function EditMenu({ 
  type, 
  onClose, 
  transactionId , 
  transactionName, 
  transactionPrice,
}: TransactionProps) {
  const { user, isLoaded } = useUser();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // valor formatado para exibir no input
  const [currency, setCurrency] = useState("BRL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa os valores
  useEffect(() => {
    setName(transactionName);
    const formatted = (parseFloat(transactionPrice)).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setAmount(formatted);
  }, [transactionName, transactionPrice]);

  // Função que formata o valor digitado enquanto o usuário edita
  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    return (parseFloat(numeric || "0") / 100 ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatCurrency(e.target.value));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const numericAmount = parseInt(amount.replace(/\D/g, ""), 10) / 100;
      
      const success = await editTransaction(transactionId, {
        name,
        amount: numericAmount,
        currency,
        type,
        status: "completed",
        userId: user!.id,
      });

      if (success) {
        onClose();
        window.location.reload();
      } else {
        setError("Não foi possível salvar a transação.")
      }
    } catch(err) {
      console.error(err);
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "income" ? "Editar Receita" : "Editar Despesa"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da transação"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
          
          <input
            type="text"
            placeholder="Valor"
            value={amount}
            onChange={handleAmountChange}
            className="border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
          
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          >
            <option value="BRL">BRL - Real</option>
            <option value="USD">USD - Dólar</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 cursor-pointer text-white rounded px-4 py-2 hover:bg-blue-600 flex-1 disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 cursor-pointer text-black rounded px-4 py-2 hover:bg-gray-400 flex-1 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
