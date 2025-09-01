import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMenu } from "@/menu";
import Link from "next/link";

export default function MenuDrawer() {
  const menu = useMenu();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menu.closeMenu();
      }
    }

    if (menu.isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("mousedown", handleClickOutside);

    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menu.isOpen, menu.closeMenu]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-2/5 bg-white shadow-2xl z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button
          className="cursor-pointer w-8" 
          onClick={menu.closeMenu}
          aria-label="Fechar menu"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col p-2">
        <Link 
          href="/" 
          className="px-4 py-3 rounded hover:bg-gray-100 transition"
          onClick={menu.closeMenu}
        >
          Início
        </Link>
        <Link 
          href="/about"
          className="px-4 py-3 rounded hover:bg-gray-100 transition"
          onClick={menu.closeMenu}
        >
          Quem somos
        </Link>
        <Link 
          href="/subscriptions-info" 
          className="px-4 py-3 rounded hover:bg-gray-100 transition"
          onClick={menu.closeMenu}
        >
          Planos e preços
        </Link>
        <Link 
          href="/bank-connection"
          className="px-4 py-3 rounded hover:bg-gray-100 transition"
          onClick={menu.closeMenu}
        >
          Conexão Bancária
        </Link>
        <Link 
          href="#"
          className="px-4 py-3 rounded hover:bg-gray-100 transition"
          onClick={menu.closeMenu}
        >
          Teste
        </Link>
      </nav>
    </motion.div>
  );
}
