"use client";

import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import { getOneTransaction } from "../actions";  
import { TransactionResponse } from "@/types/TransactionTypes";
import Image from "next/image";

interface DeleteButtonProps {
  transactionId: string;
}

export default function EditButton({ transactionId }: DeleteButtonProps) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [transaction, setTransaction] = useState<TransactionResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchTransaction = async () => {
      try {
        const data = await getOneTransaction(transactionId);
        if (isMounted) setTransaction(data);
      } catch (err: unknown) {
        console.error("Erro ao buscar transação: ", err);
      }
    };
    fetchTransaction();
    
    return () => { isMounted = false; };
  }, [transactionId]);

  return (
    <div className="flex flex-col items-end mt-4">
      <button
        onClick={() => setShowEditMenu(true)}
        className="rounded-md border cursor-pointer border-gray-200 p-1 bg-white hover:bg-neutral-100"
      >
        <Image
          src="https://i.postimg.cc/136BdT4v/1354320.png"
          alt="delete transaction"
          width={28}
          height={28}
        />
      </button>

      {showEditMenu ?
        transaction ? (
          <EditMenu 
              type={transaction.type as "income" | "expense"}
              onClose={() => setShowEditMenu(false)}
              transactionId={transactionId}
              transactionName={transaction.name!}
              transactionPrice={transaction.amount.toString()}
          />
        ) : (
          <div>Carregando...</div>
      ) : null}
    </div>
  );
}
