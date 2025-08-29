// fetchSubscriptions.ts
"use server";

import { stripe } from "@/lib/stripe";
import { SubscriptionType } from "@/types/SubscriptionType";
import { prisma } from "@/lib/prisma";
import { TransactionInput, TransactionResponse } from "@/types/TransactionTypes";

export async function fetchSubscriptions(): Promise<{ subscriptions: SubscriptionType[] }> {
  const { data: products } = await stripe.products.list();

  const subscriptions: SubscriptionType[] = [];

  for (const product of products) {
    const prices = await stripe.prices.list({ product: product.id, limit: 1 });

    const price = prices.data[0];

    if (price && price.unit_amount !== null) {
      subscriptions.push({
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: price.unit_amount / 100, // geralmente o Stripe usa centavos
      });
    }
  }

  return { subscriptions };
}

export async function fetchSubscriptionById(productId: string): Promise<SubscriptionType | null> {
  try {
    const product = await stripe.products.retrieve(productId);
    const prices = await stripe.prices.list({ product: product.id, limit: 1 });

    const price = prices.data[0];

    if (price && price.unit_amount !== null) {
      return {
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        price: price.unit_amount / 100, // centavos -> reais
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar assinatura:", error);
    return null;
  }
}

export async function completePayment(payment_intent_id: string) {
  if (!payment_intent_id || typeof payment_intent_id !== "string") {
    throw new Error("ID da transação é obrigatório e deve ser uma string");
  }
  try {
    const updatePaymentIntent = await prisma.order.update({
      where: { paymentIntentID: payment_intent_id },
      data: { status: "completed"},
    })
    return true;
    console.log("Sucesso!");
  } catch (err) {
    console.error("Erro ao editar transação: ", err);
    return false;
  }
}

export async function existsOrder(productId: string, userId: string) {
  if (!productId || typeof productId !== "string") {
    throw new Error("ID do produto é obrigatório e deve ser uma string");
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        products: {
          some: { id: productId }, // procura orders que tenham pelo menos esse produto
        },
        status: "completed",
        userId: userId,
      },
    });

    return !!order; // true se encontrou, false se não
  } catch (err) {
    console.error("Erro ao buscar order:", err);
    return false;
  }
}

export async function getTransactions(userId: string, limit: number): Promise<TransactionResponse[]> {
  if (!userId || typeof userId !== "string") {
    throw new Error("ID do usuário é obrigatório e deve ser uma string");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return transactions.map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      currency: tx.currency,
      type: tx.type === "income" ? "income" : "expense",
      status: tx.status,
      userId: tx.userId,
      createdAt: tx.createdAt.toISOString(),
      name: tx.name ?? "", // converter Date para string
    }));
  } catch (err) {
    console.error("Erro ao buscar transações:", err);
    return [];
  }
}

export async function getTransactionsScroll(
  userId: string,
  limit: number,
  skip = 0 // <-- adiciona parâmetro
): Promise<TransactionResponse[]> {
  if (!userId || typeof userId !== "string") {
    throw new Error("ID do usuário é obrigatório e deve ser uma string");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,   // pula registros já carregados
      take: limit,
    });

    return transactions.map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      currency: tx.currency,
      type: tx.type === "income" ? "income" : "expense",
      status: tx.status,
      userId: tx.userId,
      createdAt: tx.createdAt.toISOString(),
      name: tx.name ?? "",
    }));
  } catch (err) {
    console.error("Erro ao buscar transações:", err);
    return [];
  }
}


export async function getTransactionsTotal(userId: string, type: string) {
  if (!userId || typeof userId !== "string" || (!type || typeof type !== "string")) {
    throw new Error("Erro ID do usuário e tipo de transação são obrigatórios e devem ser strings");
  }
  if (type === "income") {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId, type: "income" },
      });

      const total = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
      return total;
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
      return 0;
    }
  } else if (type === "expense") {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { userId, type: "expense" },
      });
      const total = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);
      return total;
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
      return 0;
    }
  }
  return 0;
}

export async function getOneTransaction(transactionId: string): Promise<TransactionResponse> {
  if (!transactionId || typeof transactionId !== "string") {
    throw new Error("ID da transação é obrigatório e deve ser uma string");
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    return {
      id: transaction.id,
      name: transaction.name ?? null,
      amount: transaction.amount,
      currency: transaction.currency,
      type: transaction.type,
      status: transaction.status,
      createdAt: transaction.createdAt.toISOString(),
      userId: transaction.userId,
    };
  } catch (err) {
    console.error("Erro ao buscar transação:", err);
    throw err; // propaga o erro em vez de retornar null
  }
}


export async function deleteTransaction(transactionId: string): Promise<boolean> {
  if (!transactionId || typeof transactionId !== "string") {
    throw new Error("ID da transação é obrigatório e deve ser uma string");
  }
  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: { id: transactionId },
    });

    return !!deletedTransaction;
  } catch (err) {
    console.error("Erro ao excluir transação:", err);
    return false;
  }
}

export async function editTransaction(transactionId: string, transaction: TransactionInput) {
  if (!transactionId || typeof transactionId !== "string") {
    throw new Error("ID da transação é obrigatório e deve ser uma string");
  }
  try {
    const updateTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: transaction,
    })
    return true;
    console.log("Sucesso!");
  } catch (err) {
    console.error("Erro ao editar transação: ", err);
    return false;
  }
}