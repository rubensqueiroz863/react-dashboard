import { fetchSubscriptions } from "../actions";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Subscriptions from "../components/Subscriptions";
import type { SubscriptionType } from "@/types/SubscriptionType";

export default async function SubscriptionsPage() {
  const { subscriptions }: { subscriptions: SubscriptionType[] } = await fetchSubscriptions();

  const ordered = [subscriptions[2], subscriptions[1], subscriptions[0]];

  return (
    <div>
      <Header/>
      <div className="w-full h-0.5 bg-neutral-400 mx-5 xl:mb-0 md:mb-10"></div>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4">
        <div className="flex flex-col my-10 justify-center gap-6 w-full items-center">
          {ordered.map((sub, index) => (
            <Subscriptions
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
      <Footer />
    </div>
  );
}
