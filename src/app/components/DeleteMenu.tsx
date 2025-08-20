"use client";

import React from "react";

interface DeleteMenuProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteMenu({ onConfirm, onCancel }: DeleteMenuProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-80 max-w-[90%] shadow-lg text-center">
        <p className="text-gray-800 font-semibold mb-4">
          Tem certeza que deseja excluir?
        </p>
        <div className="flex justify-around gap-4">
          <button
            onClick={onConfirm}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Sim
          </button>
          <button
            onClick={onCancel}
            className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
}
