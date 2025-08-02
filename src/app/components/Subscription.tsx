'use client';

import { formatPrice } from "@/lib/utils";
import { SubscripitionType } from "@/types/SubscriptionTpe";

type SubscripitionProps = {
    subscription: SubscripitionType;
}

export default function Subscription({ subscription }: SubscripitionProps) {
    return (
        <div className="h-50 w-full items-center cursor-pointer flex flex-col">
            <div className="flex flex-col font-bold my-3">
                <p className="w-50">{subscription.name}</p>
                <p className="w-75">{subscription.description}</p>
                <p className="text-md text-green-600">{formatPrice(subscription.price)}</p>
            </div>
        </div>
    )
}