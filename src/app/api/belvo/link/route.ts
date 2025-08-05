import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = Buffer.from(
      `${process.env.BELVO_SECRET_ID}:${process.env.BELVO_SECRET_PASSWORD}`
    ).toString("base64");

    const res = await fetch("https://sandbox.belvo.com/api/connect_widget/", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data: { token: string } = await res.json();
    return NextResponse.json({ token: data.token });
  } catch (err: unknown) {
    let message = "Erro ao gerar token";
    if (err instanceof Error) {
      message = err.message;
    }
    console.error("Erro ao gerar token Belvo:", err);
    return NextResponse.json(
      { error: "Erro ao gerar token", details: message },
      { status: 500 }
    );
  }
}
