import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMenu } from "@/menu";

export default function MenuDrawer() {
  const menu = useMenu();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menu.closeMenu(); // fechar explicitamente
      }
    }

    if (menu.isOpen) {
      document.addEventListener("click", handleClickOutside);
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
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg z-40"
    >
      <h2 className="text-xl font-bold p-4">Menu</h2>
      {/* Conteúdo */}
    </motion.div>
  );
}
