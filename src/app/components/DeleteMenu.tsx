"use client";

import React, { useEffect, useRef } from "react";

interface DeleteMenuProps {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function DeleteMenu({ onConfirm, onCancel, loading = false }: DeleteMenuProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);  
  
  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-80 max-w-[90%] shadow-lg text-center">
        <p className="text-gray-800 font-semibold mb-4">
          Tem certeza que deseja excluir?
        </p>
        <div className="flex justify-around gap-4">
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50`}
          >
            {loading ? "Excluindo..." : "Sim"}
          </button>
          <button
            onClick={onCancel}
            ref={cancelButtonRef}
            disabled={loading}
            className={`cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50`}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
