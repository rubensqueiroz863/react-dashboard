'use client';
import { useEffect, useState, useRef, useCallback } from "react";
import { getTransactionsScroll } from "@/app/actions";
import { TransactionResponse } from "@/types/TransactionTypes";
import Link from "next/link";

export default function TransactionsScroll({ userId, limit }: { userId: string; limit: number }) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const statusMap: Record<string, string> = {
    completed: "Concluída",
    pending: "Pendente",
    failed: "Falha",
  };

  const loadTransactions = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const data = await getTransactionsScroll(userId, limit, page * limit);
    setTransactions(prev => [...prev, ...data]);
    setHasMore(data.length === limit);
    setPage(prev => prev + 1);

    setLoading(false);
  }, [userId, page, limit, hasMore, loading]);

  // Primeira carga ou troca de usuário
  useEffect(() => {
    setTransactions([]);
    setPage(0);
    setHasMore(true);
  }, [userId]);

  // Scroll infinito usando IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadTransactions();
      }
    }, { root: containerRef.current, rootMargin: "100px" });

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadTransactions]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <div ref={containerRef} className="overflow-auto h-[80vh]">
      {transactions.map(tx => {
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(tx.status)}`}>
                  {statusMap[tx.status] || tx.status}
                </span>
              </div>
              <p className={`mt-2 text-gray-600 ${typeColor}`}>
                {tx.type === "income" ? "Receita" : "Despesa"} — <span className="font-medium">{formattedAmount}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">{new Date(tx.createdAt).toLocaleString("pt-BR")}</p>
            </div>
          </Link>
        );
      })}

      {loading && <p className="text-center text-gray-500">Carregando...</p>}
      {!hasMore && <p className="text-center text-gray-400">Não há mais transações</p>}

      <div ref={sentinelRef} />
    </div>
  );
}
