"use client";
import { useEffect, useState, useRef } from "react";
import { getTransactionsScroll } from "@/app/actions";
import { TransactionResponse } from "@/types/TransactionTypes";
import Link from "next/link";

export default function TransactionsScroll({ userId, limit }: { userId: string; limit: number }) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const fetching = useRef(false);

  const statusMap: Record<string, string> = {
    completed: "Concluída",
    pending: "Pendente",
    failed: "Falha",
  };

  async function loadTransactions() {
    if (loading || !hasMore || fetching.current) return;
    fetching.current = true;
    setLoading(true);

    const data = await getTransactionsScroll(userId, limit, page * limit);
    setTransactions((prev) => [...prev, ...data]);
    setHasMore(data.length === limit);
    setPage((prev) => prev + 1);

    setLoading(false);
    fetching.current = false;
  }

  // 🔹 primeira carga
  useEffect(() => {
    setTransactions([]);
    setPage(0);
    setHasMore(true);
    loadTransactions();
  }, [userId]);

  // 🔹 scroll infinito na div interna
  function handleScroll() {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadTransactions();
    }
  }

  return (
    <div
      ref={containerRef}
      className="overflow-auto h-[80vh]"
      onScroll={handleScroll}
    >
      {transactions.map((tx) => {
        const formattedAmount = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: tx.currency,
        }).format(tx.amount);
        const typeColor = tx.type === "income" ? "text-green-600" : "text-red-600";

        return (
          <Link href={`/transaction/${tx.id}`} key={tx.id}>
            <div className="rounded-2xl border border-gray-200 mb-4 bg-white p-4 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">{tx.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tx.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : tx.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {statusMap[tx.status] || tx.status}
                </span>
              </div>
              <p className={`mt-2 text-gray-600 ${typeColor}`}>
                {tx.type === "income" ? "Receita" : "Despesa"} —{" "}
                <span className="font-medium">{formattedAmount}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(tx.createdAt).toLocaleString("pt-BR")}
              </p>
            </div>
          </Link>
        );
      })}

      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {!hasMore && <p className="text-center text-gray-400">Não há mais transações</p>}
    </div>
  );
}
