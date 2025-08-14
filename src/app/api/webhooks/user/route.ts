import { prisma } from '@/lib/prisma';
import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { stripe } from '@/lib/stripe';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: EventDataType;
  object: 'event';
  type: EventType;
};

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
};

type EmailAddressType = {
  id: string;
  email_address: string;
};

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  console.log('✅ Webhook recebido:', JSON.stringify(payload, null, 2));

  const heads = {
    'svix-id': (await headersList).get('svix-id'),
    'svix-timestamp': (await headersList).get('svix-timestamp'),
    'svix-signature': (await headersList).get('svix-signature'),
  };

  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error('Falha na verificação do webhook:', (err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, ...attributes } = evt.data;

    try {
      // Cria/atualiza cliente no Stripe
      const customer = await stripe.customers.create({
        name: `${first_name} ${last_name}`,
        email: email_addresses?.[0]?.email_address || '',
      });

      // Upsert no banco, sem passar o ID manualmente
      const user = await prisma.user.upsert({
        where: { externalId: id },
        create: {
          externalId: id,
          stripeCustomerId: customer.id,
          attributes: attributes || {},
        },
        update: {
          attributes: attributes || {},
        },
      });

      console.log('✅ Usuário criado/atualizado:', user.id);
    } catch (err) {
      console.error('Erro ao gravar no banco:', err);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export const POST = handler;
