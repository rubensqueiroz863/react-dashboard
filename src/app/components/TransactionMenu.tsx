"use client";

import Link from "next/link";
import Transaction from "./AddTransation"; // modal
import Transactions from "./Transactions";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function TransactionsMenu() {
    const [menuType, setMenuType] = useState<"income" | "expense" | null>(null);
    
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Carregando...</div>;
    if (!user) return <div>Usuário não encontrado</div>;

    const userId = user.id;
    console.log("User ID:", userId);

    return (
        <div>
            {/* Bloco de Acesso Rápido */}
            <div className="w-full xl:w-1/2">
                <div className="mb-6 mt-6 font-bold text-2xl">
                    <p>Acesso rápido</p>
                </div>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    {/* Botão de Despesa */}
                    <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                    <button onClick={() => setMenuType("expense")} className="cursor-pointer m-1">
                        <img
                        src="https://i.postimg.cc/7hjfMpkW/images.png"
                        alt="Add expense icon"
                        className="w-8 h-8 mx-auto"
                        />
                    </button>
                    <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                        Adicionar Despesa
                    </span>
                    </div>

                    {/* Botão de Receita */}
                    <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                    <button onClick={() => setMenuType("income")} className="cursor-pointer m-1">
                        <img
                        src="https://i.postimg.cc/nrXXmn6m/images-1.png"
                        alt="Add revenue icon"
                        className="w-8 h-8 mx-auto"
                        />
                    </button>
                    <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                        Adicionar Receita
                    </span>
                    </div>

                    {/* Botão de Relatórios */}
                    <Link href="/reports">
                    <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                        <button className="cursor-pointer m-1">
                        <img
                            src="https://i.postimg.cc/mrTWq8Zp/383f43305de4fbc3c6a3bdfb25a1b758-icone-de-grafico-de-marketing.webp"
                            alt="Graphic image"
                            className="w-8 h-8 mx-auto"
                        />
                        </button>
                        <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                        Ver Relatórios
                        </span>
                    </div>
                    </Link>
                </div>
                </div>
                <div>
                <Transactions userId={userId} />
                </div>
                {menuType && <Transaction type={menuType as "income" | "expense"} onClose={() => setMenuType(null)} />}
            </div>
    );
}