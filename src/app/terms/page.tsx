"use client";

import { useState, useEffect } from "react";
import TermsOfUse from "../components/TermsOfUse";
import NavBar from "../components/NavBar";

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  // Checar se já aceitou anteriormente
  useEffect(() => {
    const acceptedBefore = localStorage.getItem("accptedTerms");
    if (acceptedBefore === "true") {
      setIsAccepted(true);
    }
  }, []);

  const handleConfirm = () => {
    if (accepted) {
      localStorage.setItem("accptedTerms", "true");
      alert("Termos aceitos com sucesso!");
      
    } else {
      alert("Você precisa aceitar os Termos de Uso.");
    }
  };

  if (isAccepted) {
    return (
      <p className="text-green-600 text-sm">
        Você já aceitou os Termos de Uso.
      </p>
    );
  }

  return (
    <div>
      <NavBar/>
      <div className="p-4 mx-auto my-10 border h-150 rounded-md max-w-md space-y-4 overflow-y-auto">
        <TermsOfUse/>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="accent-blue-500 cursor-pointer"
          />
          <span className="font-bold flex">
            <p>Eu li e aceito os Termos de Uso</p>
          </span>
        </label>

        <button
          onClick={handleConfirm}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Continuar
        </button>
      </div>    
    </div>
  );
}
