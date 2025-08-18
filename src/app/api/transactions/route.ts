import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const { name, amount, currency, type, status, userId: externalId } = await req.json();

    if (!amount || !currency || !type || !externalId) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    // Busca o usuário pelo externalId (Clerk)
    const user = await prisma.user.findUnique({
      where: { externalId },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 400 });
    }

    console.log("Criando transação para o usuário:", user.id);

    const transaction = await prisma.transaction.create({
      data: {
        name,
        amount: parseFloat(amount),
        currency,
        type,
        status: status || "pending",
        userId: externalId, // usa o ID interno do Prisma
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar transação" }, { status: 500 });
  }
}
