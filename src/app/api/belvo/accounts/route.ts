import { NextRequest, NextResponse } from "next/server";
import Belvo from "belvo";

const belvoClient = new Belvo(
  process.env.BELVO_SECRET_ID!,
  process.env.BELVO_SECRET_PASSWORD!,
  process.env.BELVO_ENVIRONMENT!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const link = searchParams.get("link");

  try {
    const accounts = await new Promise<object[]>((resolve, reject) => {
      belvoClient.accounts.list({ link })
        .then((res: unknown) => resolve(res as object[]))
        .catch((err: unknown) => reject(err));
    });

    return NextResponse.json({ accounts });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar contas" }, { status: 500 });
  }
}