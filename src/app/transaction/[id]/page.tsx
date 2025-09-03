import { getOneTransaction } from "@/lib/transaction";
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

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(transaction.createdAt))


  const statusMap: Record<string, { text: string; className: string }> = {
    completed: { text: "Concluída", className: "bg-green-100 text-green-700" },
    pending: { text: "Pendente", className: "bg-yellow-100 text-yellow-700" },
    canceled: { text: "Cancelada", className: "bg-red-100 text-red-700" },
  }
  
  const status = statusMap[transaction.status] ?? {
    text: "Desconhecido",
    className: "bg-gray-100 text-gray-700",
  }

  const typeMap: Record<string, { label: string; className: string }> = {
    income: { label: "Receita", className: "text-green-600" },
    expense: { label: "Despesa", className: "text-red-600" },
  }

  const typeInfo = typeMap[transaction.type] ?? { label: "", className: "text-gray-600" }

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
                className={`px-3 py-1 rounded-full text-sm font-medium ${status.className}`}
              >
                {status.text}
              </span>
            </div>

            <p className={`mt-2 text-gray-600 ${typeInfo.className}`}>
              {typeInfo.label} — <span className="font-medium">{formattedAmount}</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {formattedDate}
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
