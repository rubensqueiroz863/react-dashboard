import { SubscriptionType } from "@/types/SubscriptionType";
import SubscriptionsCheckout from "../components/SubscriptionsCheckout";
import { fetchSubscriptions } from "../actions";
import NavBarHome from "../components/NavBarHome";

export default async function SubscriptionsPage() {
    const { subscriptions }: { subscriptions: SubscriptionType[] } = await fetchSubscriptions();
    
    const ordered = [subscriptions[2], subscriptions[1], subscriptions[0]];
    return (
        <div>
            <NavBarHome />
            <div className="w-full h-0.5 bg-neutral-400 mx-5 xl:mb-0 md:mb-10">
                
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
        </div>
        
    )
}