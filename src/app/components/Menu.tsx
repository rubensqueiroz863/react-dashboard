import { useState } from "react";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      className="relative w-6 h-6 flex flex-col justify-between items-center"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="Menu"
    >
      <span
        className={`block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out
          ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
      />
      <span
        className={`block h-1 w-full bg-white rounded transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out
          ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
      />
    </button>
  );
}
