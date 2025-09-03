import { SubscriptionType } from "@/types/SubscriptionType"
import SubscriptionsCheckout from "../components/SubscriptionsCheckout"
import { fetchSubscriptions } from "../actions"
import NavBarHome from "../components/NavBarHome"

export default async function SubscriptionsPage() {
  const { subscriptions }: { subscriptions: SubscriptionType[] } = await fetchSubscriptions()

  // Inverte a ordem de forma segura
  const ordered = subscriptions.slice().reverse()

  return (
    <div>
      <NavBarHome />
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4">
        <div className="flex flex-wrap justify-center gap-6 w-full items-stretch">
          {ordered.map((sub, index) => (
            <SubscriptionsCheckout
              key={index}
              sub={{
              ...sub,
              description: sub.description ?? "",
              price: sub.price ?? 0, // garante número
            }}
            index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
