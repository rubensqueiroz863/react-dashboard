import { currentUser } from "@clerk/nextjs/server";
import NavBarHome from "../components/NavBarHome";
import TransactionsMenu from "../components/TransactionMenu";
import { getTransactionsTotal } from "@/lib/transaction";
import { formatTransactions } from "@/lib/utils";

function SummaryCard({ title, value, color, bgColor }: { title: string; value: string; color: string; bgColor: string }) {
  return (
    <div className={`flex flex-col items-center ${bgColor} border rounded-2xl p-5 w-full md:w-1/2 shadow-sm hover:shadow-md transition`}>
      <p className="text-md text-gray-700">{title}</p>
      <p className={`text-xl font-semibold ${color} mt-2`}>{value}</p>
    </div>
  );
}


export default async function OverviewPage() {
  const user = await currentUser(); // pega direto no servidor

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  const userId = user.id;

  const totalIncome = await getTransactionsTotal(userId, "income");
  const totalExpense = await getTransactionsTotal(userId, "expense");

  return (
    <div className="min-h-screen bg-neutral-100">
      <NavBarHome />

      <div className="flex flex-col items-center w-full p-6 gap-6">
        {/* Painel de boas-vindas e resumo financeiro */}
        <div className="w-full xl:w-1/2 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center xl:text-left">
            Olá, {user.firstName}!
          </h1>

          <div className="flex flex-col md:flex-row justify-around items-center gap-4">
            <SummaryCard title="Receitas no mês" value={formatTransactions(totalIncome)} color="text-green-600" bgColor="bg-green-50 border-green-200" />
            
            <SummaryCard title="Despesas no mês" value={formatTransactions(totalExpense)} color="text-red-600" bgColor="bg-red-50 border-red-200" />
          </div>
        </div>

        {/* Menu de transações */}
        <div className="w-full xl:w-1/2">
          <TransactionsMenu />
        </div>
      </div>
    </div>
  );
}