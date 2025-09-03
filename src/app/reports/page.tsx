"use client";

import NavBarHome from "../components/NavBarHome";
import { useUser } from "@clerk/nextjs";
import TransactionsScroll from "../components/TransactionScroll";

export default function EntriesPage() {

    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div>Carregando...</div>;
    if (!user) return <div>Usuário não encontrado</div>;

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <NavBarHome />
            <p className="p-4">Lançamentos</p>
            <div className="flex-1 overflow-auto p-4">
                <TransactionsScroll userId={user.id} limit={8} />
            </div>
        </div>
    );
}