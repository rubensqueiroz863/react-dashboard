"use client";

import NavBarHome from "../components/NavBarHome";
import Transactions from "../components/Transactions";
import { useUser } from "@clerk/nextjs";
import TransactionsScroll from "../components/TransactionScroll";

export default function EntriesPage() {

    const { user } = useUser();

    if (!user) return <div>Usuário não encontrado</div>;

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <NavBarHome />
            <p className="p-4">Lançamentos</p>
            <div className="flex-1 overflow-auto px-4 m-4">
                <TransactionsScroll userId={user.id} limit={8} />
            </div>
        </div>

    )
}