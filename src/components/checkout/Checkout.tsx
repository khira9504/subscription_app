import { getStripePrices } from "@/feature/stripe/stripe";
import SubscriptionItem from "./SubscriptionItem";

export default async function Checkout() {
  const prices = await getStripePrices();
  console.log(prices);
  

  return (
    <div className="w-full flex justify-center space-x-4">
      <>
        {prices.map((price, i) => (
          <div key={`price${i}`}>
            <SubscriptionItem price={ price } />
          </div>
        ))}
      </>
    </div>
  )
}
