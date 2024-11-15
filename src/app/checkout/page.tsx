import Checkout from "@/components/checkout/Checkout";
import { createCustomerId,  } from "@/feature/stripe/stripe";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  if(!session) {
    redirect("/login");
  };
  await createCustomerId({ userId: session.user.id });

  return (
    <div>
      <Checkout />
    </div>
  );
};