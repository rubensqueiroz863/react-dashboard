import { prisma} from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

async function handler(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature") || '';

    if (!sig) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
        case 'payment_intent.created':
            const payment_intent = event.data.object as Stripe.PaymentIntent;
            console.log(`PaymentIntent created: ${payment_intent.id}`);
            break;
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge;
            if (typeof charge.payment_intent === 'string') {
                const order = await prisma.order.update({
                    where: { paymentIntentID: charge.payment_intent },
                    data: { status: 'complete' },
                });
            }
            break;
        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({}, { status: 200 });

}
export const POST = handler;