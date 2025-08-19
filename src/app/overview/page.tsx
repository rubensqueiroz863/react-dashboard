import { auth, currentUser } from "@clerk/nextjs/server";
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

  return (
    <div className="min-h-screen bg-neutral-300">
      <NavBarHome />

      <div className="flex flex-col xl:flex-row xl:items-start items-center w-full rounded-xl bg-white text-center p-5 gap-5">
        <div className="w-full xl:w-1/2">
          <div className="mb-6 mt-6 font-bold text-2xl">
            <p>Seja bem vindo, {user.firstName}!</p>
          </div>

          <div className="flex justify-between items-center my-4 flex-wrap">
            <div className="flex flex-col items-center flex-1 min-w-[140px]">
              <p className="text-md">Receitas no mês atual</p>
              <p>{formatTransactions(await getTransactionsTotal(userId, "income"))}</p>
            </div>
            <div className="w-px h-10 bg-neutral-200 hidden md:block"></div>
            <div className="flex flex-col items-center flex-1 min-w-[140px]">
              <p className="text-md">Despesas no mês atual</p>
              <p>{formatTransactions(await getTransactionsTotal(userId, "expense"))}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center md:w-fit sm:w-fit">
          <div
            className="xl:w-px xl:h-40 md:h-px md:w-40 sm:h-px sm:w-40 bg-neutral-200"
          />
        </div>

        <TransactionsMenu />
      </div>
    </div>
  );
}
