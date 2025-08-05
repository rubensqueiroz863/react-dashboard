"use client";
import { useEffect, useState } from "react";

// Tipagem para o belvoSDK global
declare global {
  interface Window {
    belvoSDK: {
      createWidget: (
        token: string,
        options: {
          callback: (link: string) => void;
          onExit: () => void;
        }
      ) => { build: () => void; open: () => void };
      open: () => void;
    };
  }
}

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/belvo/link")
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  }, []);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://cdn.belvo.io/belvo-widget.js";
    script.async = true;
    script.onload = () => {
      window.belvoSDK.createWidget(token, {
        callback: (link: string) => {
          console.log("Link criado:", link);
          fetch(`/api/belvo/accounts?link=${link}`)
            .then((res) => res.json())
            .then((data) => console.log("Contas:", data.accounts));
        },
        onExit: () => console.log("Usuário saiu"),
      }).build();
      setSdkLoaded(true);
    };
    document.body.appendChild(script);
  }, [token]);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Integração com Belvo</h1>
      {sdkLoaded && (
        <button onClick={() => window.belvoSDK.open()}>
          Conectar banco
        </button>
      )}
    </main>
  );
}
