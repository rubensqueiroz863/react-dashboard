import { fetchSubscriptions } from "../actions";
import NavBar from "../components/NavBar";
import Subscription from "../components/Subscription";



export default async function Subscriptions() {
  const { subscriptions } = await fetchSubscriptions();

  const sortedSubscriptions = subscriptions.sort((a, b) => a.price - b.price);

  return (
    <div>
      <NavBar />
      
      <div className="flex flex-col items-center justify-center p-5">
        {sortedSubscriptions.map((subscription) => (
          <Subscription key={subscription.id} subscription={subscription} />
        ))}
      </div>
    </div>
  );
}
