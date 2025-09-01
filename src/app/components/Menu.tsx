import { useMenu } from "@/menu";
import MenuDrawer from "./MenuDrawer";
import { AnimatePresence } from "framer-motion";

export default function Menu() {
  const menu = useMenu();

  const baseClass = "block h-1 w-full bg-white rounded transition-transform duration-300 ease-in-out";
  return (
    <>
      <button
        className="relative cursor-pointer w-6 h-6 flex flex-col justify-between items-center"
        onClick={menu.toggleMenu}
        aria-label="Menu"
      >
        <span
          className={`${baseClass} ${menu.isOpen ? "rotate-45 translate-y-2.5" : ""}`}
        />
        <span
          className={`${baseClass} ${menu.isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`${baseClass} ${menu.isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
        />
      </button>

      <AnimatePresence>
        {menu.isOpen && <MenuDrawer />}
      </AnimatePresence>
    </>
  );
}
