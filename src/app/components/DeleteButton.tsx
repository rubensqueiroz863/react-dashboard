"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ next/navigation para App Router
import DeleteMenu from "./DeleteMenu";
import { deleteTransaction } from "../actions";  // ✅ Server Action em arquivo separado
import Image from "next/image";

interface DeleteButtonProps {
  transactionId: string;
}

export default function DeleteButton({ transactionId }: DeleteButtonProps) {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTransaction(transactionId); // chama Server Action
      setShowDeleteMenu(false);
      router.push("/overview"); // redireciona após exclusão
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="flex flex-col items-end mt-4">
      <button
        onClick={() => setShowDeleteMenu(true)}
        aria-label="Excluir transação"
        className="rounded-md border cursor-pointer border-gray-200 p-1 bg-white hover:bg-neutral-100"
        disabled={loading}
      >
        {loading ? (
          <span className="text-sm text-gray-500">Excluindo...</span>
        ) : (
          <Image
            src="https://i.postimg.cc/P53XV5vb/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat.webp"
            alt="delete transaction"
            width={28}
            height={28}
          />
        )}
      </button>

      {showDeleteMenu && (
        <DeleteMenu
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteMenu(false)}
          loading={loading}
        />
      )}
    </div>
  );
}
