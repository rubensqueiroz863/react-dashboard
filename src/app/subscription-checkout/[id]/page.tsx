import { fetchSubscriptionById } from "@/app/actions";
import CheckoutButton from "@/app/components/CheckoutButton";
import { formatPrice } from "@/lib/utils";

export default async function TransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subscription = await fetchSubscriptionById(id);

  const features = [
    "Sem conexão bancária",
    "Controle manual de contas e cartões",
    "Criação de categorias e subcategorias",
    "Limite de gastos ilimitados",
    "Alerta de contas a pagar",
    "Relatórios completos e fáceis de entender",
    "Teste por 7 dias grátis",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="flex flex-col rounded-2xl border shadow-lg w-full max-w-md px-8 py-10 bg-white">
        <div className="flex flex-col items-center text-center flex-1">
          <h1 className="text-2xl font-bold text-neutral-900">
            {subscription?.name}
          </h1>
          <p className="py-2 text-md text-neutral-600">
            {subscription?.description ?? "Sem descrição"}
          </p>

          {/* lista de features */}
          <ul className="mt-4 space-y-2 text-sm text-neutral-700 text-left w-full">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-blue-600 font-bold">•</span>
                {feature}
              </li>
            ))}
          </ul>

          {/* preço */}
          <div className="flex items-end justify-center pt-6 mt-auto">
            <p className="text-3xl font-bold text-neutral-900">
              {formatPrice(subscription!.price)}
            </p>
            <p className="ml-1 text-lg font-semibold text-neutral-600">/mês</p>
          </div>
        </div>
        <CheckoutButton item={subscription!} />
      </div>
    </div>
  );
}
