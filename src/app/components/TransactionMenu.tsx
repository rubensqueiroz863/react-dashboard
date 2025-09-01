"use client";

import Link from "next/link";
import Transaction from "./AddTransation";
import Transactions from "./Transactions";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

type MenuType = "income" | "expense";

interface MenuButtonProps {
  icon: string;
  alt: string;
  label: string;
  onClick: () => void;
}

const MenuButton = ({ icon, alt, label, onClick }: MenuButtonProps) => (
  <button
    className="relative group border p-2 rounded-md cursor-pointer hover:bg-neutral-100 border-neutral-200"
    onClick={onClick}
  >
    <img src={icon} alt={alt} className="w-8 h-8 mx-auto" />
    <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
      {label}
    </span>
  </button>
);

export default function TransactionsMenu() {
  const [menuType, setMenuType] = useState<MenuType | null>(null);
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div>
      <div className="w-full bg-white p-6 rounded-xl shadow-md">
        <div className="mb-6 mt-6 font-bold text-2xl">
          <p>Acesso rápido</p>
        </div>

        <div className="flex flex-wrap gap-6 items-center justify-center">
          <MenuButton
            icon="https://i.postimg.cc/7hjfMpkW/images.png"
            alt="Add expense icon"
            label="Adicionar Despesa"
            onClick={() => setMenuType("expense")}
          />

          <MenuButton
            icon="https://i.postimg.cc/nrXXmn6m/images-1.png"
            alt="Add revenue icon"
            label="Adicionar Receita"
            onClick={() => setMenuType("income")}
          />

          <Link href="/reports">
            <button className="cursor-pointer relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
              <img
                src="https://i.postimg.cc/mrTWq8Zp/383f43305de4fbc3c6a3bdfb25a1b758-icone-de-grafico-de-marketing.webp"
                alt="Graphic image"
                className="w-8 h-8 mx-auto"
              />
              <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                Ver Relatórios
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col shadow-md bg-white rounded-xl items-center mt-6">
        <div className="mb-6 mt-6 font-bold text-2xl">
          <p>Transações mais recentes</p>
        </div>
        <Transactions userId={user.id} limit={3} />
      </div>

      {menuType && <Transaction type={menuType} onClose={() => setMenuType(null)} />}
    </div>
  );
}
