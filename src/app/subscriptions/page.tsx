import { fetchSubscriptions } from "../actions";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Subscriptions from "../components/Subscriptions";
import type { SubscriptionType } from "@/types/SubscriptionType";

export default async function SubscriptionPage() {
  const { subscriptions }: { subscriptions: SubscriptionType[] } = await fetchSubscriptions();

  const ordered = [subscriptions[2], subscriptions[1], subscriptions[0]];

  return (
    <div>
      <Header/>
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-4">
        <div className="flex flex-wrap justify-center gap-6 w-full items-stretch">
          {ordered.map((sub, index) => (
            <Subscriptions key={index} sub={sub} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
