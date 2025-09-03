"use client"

import { useState, useEffect } from "react"
import TermsOfUse from "../components/TermsOfUse"
import NavBar from "../components/NavBar"

const STORAGE_KEY = "acceptedTerms"

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false)
  const [alreadyAccepted, setAlreadyAccepted] = useState(false)

  // Checar se já aceitou anteriormente
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setAlreadyAccepted(true)
    }
  }, [])

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setAlreadyAccepted(true)
  }

  if (alreadyAccepted) {
    return (
      <div className="p-4 text-center">
        <p className="text-green-600 font-medium">
          ✅ Você já aceitou os Termos de Uso.
        </p>
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="p-4 mx-auto my-10 border rounded-md max-w-md space-y-4 overflow-y-auto">
        <TermsOfUse />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="accent-blue-500 cursor-pointer"
          />
          <span className="font-bold">Eu li e aceito os Termos de Uso</span>
        </label>

        <button
          onClick={handleConfirm}
          disabled={!accepted}
          className="bg-blue-600 disabled:bg-blue-400 cursor-pointer text-white px-4 py-2 rounded transition"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}
