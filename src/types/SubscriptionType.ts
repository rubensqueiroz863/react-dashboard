export type SubscriptionType = {
    id: string;
    price: number | null;
    name: string;
    description: string | null;
    currency?: string;
}