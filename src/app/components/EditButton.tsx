"use client";

import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { deleteTransaction, getOneTransaction } from "../actions";  
import { TransactionResponse } from "@/types/TransactionTypes";

interface DeleteButtonProps {
  transactionId: string;
}

export default function EditButton({ transactionId }: DeleteButtonProps) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [transaction, setTransaction] = useState<TransactionResponse | null>(null);

  useEffect(() => {
    getOneTransaction(transactionId).then(setTransaction);
  }, [transactionId]);

  const handleEdit = async () => {
    await deleteTransaction(transactionId); 
    setShowEditMenu(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-end mt-4">
      <button
        onClick={() => setShowEditMenu(true)}
        className="rounded-md border cursor-pointer border-gray-200 p-1 bg-white hover:bg-neutral-100"
      >
        <img
          src="https://i.postimg.cc/136BdT4v/1354320.png"
          alt="edit transaction"
          className="w-7 h-7"
        />
      </button>

      {showEditMenu && transaction && (
        <EditMenu 
            type={transaction.type as "income" | "expense"}
            onClose={() => setShowEditMenu(false)}
            transactionId={transactionId}
        />
      )}
    </div>
  );
}
