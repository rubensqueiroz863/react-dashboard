import { getOneTransaction } from "@/app/actions";
import NavBarHome from "@/app/components/NavBarHome";

export default async function transactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transaction = await getOneTransaction(id);

  if (!transaction) {
    return <div>Transação não encontrada.</div>;
  }

  console.log("transactions:", transaction);
  console.log("transaction ID:", id);

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
      <div className="p-10 flex items-center justify-center cursor-pointer">
        <div
          key={transaction.id}
          className="rounded-2xl h-96 w-full m-auto border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
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
              {transaction.status}
            </span>
          </div>

          <p className={`mt-2 text-gray-600 ${typeColor}`}>
            {transaction.type.toUpperCase()} —{" "}
            <span className="font-medium">{formattedAmount}</span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(transaction.createdAt).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
    
  );
}
