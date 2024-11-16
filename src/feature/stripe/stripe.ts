import { stripe } from "@/lib/stripe";
import { SubscriptionLevelType } from "@prisma/client";
import Stripe from "stripe";
import { getUserById, updateUserCustomerId } from "../store/user";

export const createCustomerId = async ({ userId } : { userId: string }) => {
  try {
    const user = await getUserById({ userId });
    if(!user) {
      throw new Error(`ユーザーが存在しません。userId: ${userId}`);
    };
    if(user.customerId) {
      return;
    };
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      preferred_locales: ["ja"],
      metadata: {
        userId,
      },
    });
    await updateUserCustomerId({ userId, customerId: customer.id });
    return;
  } catch(err) {
    throw err;
  };
};

export const getStripePrices = async () => {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: ["premium", "standard"],
      expand: ["data.product"],
    });
    return prices.data;
  } catch(err) {
    throw err;
  };
};

export const getLevelFromMetadata = (metadata: Stripe.Metadata): SubscriptionLevelType => {
  switch(metadata.level) {
    case "Premium": {
      return SubscriptionLevelType.Premium;
    };
    case "Standard": {
      return SubscriptionLevelType.Standard;
    };
    default: {
      throw new Error("Metadata.level が存在しません。metadata:", metadata);
    }
  };
};

export const getSubscriptionCheckoutURL = async({ userId, priceId }: { userId: string; priceId: string; }) => {
  try {
    const user = await getUserById({ userId });
    if (!user) {
      throw new Error(`ユーザーが存在しません。userId: ${userId}`);
    };
    if(!user.customerId) {
      throw new Error(`カスタマーIDが存在しません。userId: ${userId}`);
    };
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      payment_method_types: ["card"],
      mode: "subscription",
      customer: user.customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      billing_address_collection: "auto",
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    return session.url;
  } catch(err) {
    throw err;
  };
};