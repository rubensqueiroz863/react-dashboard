import { fetchSubscriptions } from "../actions";
import NavBar from "../components/NavBar";
import Subscriptions from "../components/Subscriptions";
import type { SubscriptionType } from "@/types/SubscriptionType";

export default async function Subscription() {
  const { subscriptions }: { subscriptions: SubscriptionType[] } = await fetchSubscriptions();

  const ordered = [subscriptions[2], subscriptions[1], subscriptions[0]];

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-10">
        <div className="flex flex-wrap justify-center gap-6 w-full items-stretch">
          {ordered.map((sub, index) => (
            <Subscriptions key={index} sub={sub} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
