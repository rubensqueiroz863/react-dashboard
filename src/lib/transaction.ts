"use server";

import { prisma } from "@/lib/prisma";
import { TransactionInput, TransactionResponse } from "@/types/TransactionTypes";

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
    await prisma.transaction.update({
      where: { id: transactionId },
      data: transaction,
    })
    return true;
  } catch (err) {
    console.error("Erro ao editar transação: ", err);
    return false;
  }
}