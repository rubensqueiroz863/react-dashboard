'use client';

import { useEffect, useState } from "react";
import Script from "next/script";

interface PluggyConnectOptions {
  connectToken: string;
  onSuccess: (item: unknown) => void;
  onError: (error: unknown) => void;
}

interface PluggyConnectInstance {
  open: () => void;
}

declare global {
  interface Window {
    PluggyConnect?: new (options: PluggyConnectOptions) => PluggyConnectInstance;
  }
}

export default function PluggyConnectPage() {
  const [apiKey, setApiKey] = useState<string>("");
  const [connectInstance, setConnectInstance] = useState<PluggyConnectInstance | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

  // Carrega o token da API
  useEffect(() => {
    fetch("/api/pluggy-token")
      .then(res => res.json())
      .then(data => {
        console.log("API Key recebida:", data.apiKey);
        setApiKey(data.apiKey);
      });
  }, []);

  // Cria instância do PluggyConnect quando o script e o token estiverem prontos
  useEffect(() => {
    if (apiKey && isScriptLoaded && typeof window !== "undefined" && window.PluggyConnect) {
      const PluggyConnect = window.PluggyConnect;
      console.log("Criando instância do PluggyConnect");
      const connect = new PluggyConnect({
        connectToken: apiKey,
        onSuccess: (item) => {
          console.log("Conexão bem-sucedida:", item);
        },
        onError: (error) => {
          console.error("Erro:", error);
        }
      });
      setConnectInstance(connect);
    }
  }, [apiKey, isScriptLoaded]);

  const handleOpenWidget = () => {
    if (connectInstance) {
      connectInstance.open();
    } else {
      console.warn("Widget ainda não está pronto.");
    }
  };

  return (
    <>
      <Script
        src="https://connect.pluggy.ai/connect.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Pluggy script carregado");
          setIsScriptLoaded(true);
        }}
        onError={() => console.error("Erro ao carregar script Pluggy")}
      />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Conectar Conta Bancária</h1>
        <button
          onClick={handleOpenWidget}
          disabled={!connectInstance}
          className={`px-6 py-3 rounded-lg text-white transition ${
            connectInstance ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Conectar com Pluggy
        </button>
      </div>
    </>
  );
}
