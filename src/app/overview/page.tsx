import { currentUser } from "@clerk/nextjs/server";
import NavBarHome from "../components/NavBarHome";
import TransactionsMenu from "../components/TransactionMenu";
import { getTransactionsTotal } from "../actions";
import { formatTransactions } from "@/lib/utils";

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

      <div className="flex flex-col xl:flex-row xl:items-start items-center w-full p-6 gap-6">
        {/* Painel de boas-vindas e resumo financeiro */}
        <div className="w-full xl:w-1/2 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center xl:text-left">
            Olá, {user.firstName}!
          </h1>

          <div className="flex flex-col md:flex-row justify-around items-center gap-4">
            {/* Receita */}
            <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-2xl p-5 w-full md:w-1/2 shadow-sm hover:shadow-md transition">
              <p className="text-md text-gray-700">Receitas no mês</p>
              <p className="text-xl font-semibold text-green-600 mt-2">
                {formatTransactions(totalIncome)}
              </p>
            </div>

            {/* Despesa */}
            <div className="flex flex-col items-center bg-red-50 border border-red-200 rounded-2xl p-5 w-full md:w-1/2 shadow-sm hover:shadow-md transition">
              <p className="text-md text-gray-700">Despesas no mês</p>
              <p className="text-xl font-semibold text-red-600 mt-2">
                {formatTransactions(totalExpense)}
              </p>
            </div>
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
