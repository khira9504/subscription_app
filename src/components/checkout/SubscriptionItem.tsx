import Stripe from "stripe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getLevelFromMetadata } from "@/feature/stripe/stripe";
import { Button } from "../ui/button";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

type SubscriptionItemProps = {
  price: Stripe.Price;
};

export default function SubscriptionItem({ price }: SubscriptionItemProps) {
  const product = price.product as Stripe.Product;
  const buttonVariant = getLevelFromMetadata(price.metadata) === "Premium" ? "premium" : "standard";

  return (
    <Card className="bg-white max-w-xs flex flex-col items-center h-[500px] hover:scale-[1.05] transition duration-300">
      <CardHeader className="space-y-2 h-32">
        <CardTitle className="text-center">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-12">
        <div className="text-xl font-bold text-gray-700">
          ￥{(price.unit_amount || 0).toLocaleString("en-US")}円/月
        </div>
      </CardContent>
      <CardFooter className="mt-auto w-full">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <Button className="w-full cursor-pointer font-bold text-base" variant={buttonVariant} asChild>
            <a>コースに登録する</a>
          </Button>
        </Suspense>
      </CardFooter>
    </Card>
  )
}
