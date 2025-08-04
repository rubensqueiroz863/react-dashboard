import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.pluggy.ai/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: process.env.PLUGGY_CLIENT_ID,
        clientSecret: process.env.PLUGGY_CLIENT_SECRET,
      }),
    });

    if (!res.ok) {
      const error = await res.text(); // ou .json() se for JSON
      console.error("Erro na autenticação com Pluggy:", error);
      return NextResponse.json({ error: "Erro ao autenticar com a Pluggy" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({
      apiKey: data.apiKey,
    });
  } catch (err) {
    console.error("Erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
