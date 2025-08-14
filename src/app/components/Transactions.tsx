"use client";
import { useEffect, useState } from "react";
import { getTransactions } from "@/app/actions";
import { TransactionResponse } from "@/types/TransactionTypes";

export default function Transactions({ userId }: { userId: string }) {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await getTransactions(userId);
      setTransactions(data);
    }

    fetchTransactions();
  }, [userId]);

  return (
    <div>
      {transactions.map(tx => (
        <div key={tx.id}>
          <p>{tx.type.toUpperCase()}: {tx.amount} {tx.currency}</p>
          <p>Status: {tx.status}</p>
          <p>Data: {new Date(tx.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
