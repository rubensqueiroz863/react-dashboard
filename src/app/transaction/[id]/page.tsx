import { getOneTransaction } from "@/app/actions";
import DeleteButton from "@/app/components/DeleteButton";
import EditButton from "@/app/components/EditButton";
import NavBarHome from "@/app/components/NavBarHome";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = await getOneTransaction(id);

  if (!transaction) {
    return (
      <div>
        <NavBarHome />
        <div className="p-10 text-center text-gray-600 font-semibold">
          Transação não encontrada.
        </div>
      </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: transaction.currency,
  }).format(transaction.amount);

  const typeColor =
    transaction.type === "income"
      ? "text-green-600"
      : transaction.type === "expense"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div>
      <NavBarHome />
      <div className="p-10 flex items-center justify-center">
        <div
          key={transaction.id}
          className="rounded-2xl h-96 w-full max-w-xl m-auto border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {transaction.name || "Sem nome"}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  transaction.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : transaction.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {transaction.status === "completed"
                  ? "Concluída"
                  : transaction.status === "pending"
                  ? "Pendente"
                  : "Cancelada"}
              </span>
            </div>

            <p className={`mt-2 text-gray-600 ${typeColor}`}>
              {transaction.type === "income"
                ? "Receita"
                : transaction.type === "expense"
                ? "Despesa"
                : ""}{" "}
              — <span className="font-medium">{formattedAmount}</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {new Date(transaction.createdAt).toLocaleString("pt-BR")}
            </p>
          </div>

          {/* Botão de exclusão */}
          <div className="mt-4 gap-2 flex justify-end">
            <EditButton transactionId={transaction.id} />
            <DeleteButton transactionId={transaction.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
