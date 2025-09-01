"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/app/actions";
import { TransactionResponse } from "@/types/TransactionTypes";
import Link from "next/link";

const statusMap: Record<string, string> = {
  completed: "Concluída",
  pending: "Pendente",
  failed: "Falha",
};

export default function Transactions({ userId, limit }: { userId: string, limit: number }) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      const data = await getTransactions(userId, limit);
      setTransactions(data);
      setLoading(false);
    }
    fetchTransactions();
  }, [userId, limit]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Carregando...</div>;
  }

  if (!transactions.length) {
    return <div className="p-6 text-center text-gray-500">Nenhuma transação encontrada.</div>;
  }

  return (
    <div className="grid gap-4 p-6 w-full">
      {transactions.map((tx) => {
        const formattedAmount = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: tx.currency,
        }).format(tx.amount);

        const typeColor = tx.type === "income" ? "text-green-600" : "text-red-600";

        const statusColor =
          tx.status === "completed"
            ? "bg-green-100 text-green-700"
            : tx.status === "pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700";

        return (
          <Link href={`/transaction/${tx.id}`} key={tx.id} className="block">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">{tx.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                >
                  {statusMap[tx.status] || tx.status}
                </span>
              </div>

              <p className={`mt-2 text-gray-600 ${typeColor}`}>
                {tx.type === "income" ? "Receita" : "Despesa"} — <span className="font-medium">{formattedAmount}</span>
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}