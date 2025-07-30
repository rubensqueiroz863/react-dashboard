'use client';

import Link from "next/link";
import Menu from "@/app/components/Menu";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
function NavBar() {
  return (
    <div>
      <nav className="flex fixed top-0 items-center py-2 px-8 justify-between z-50 bg-neutral-800 w-full h-20">
        <Link href="/" className="text-white font-bold text-xl h-12 flex items-center">
          FinanX
        </Link>
        <div className="flex gap-8 items-center">
            <Menu/>
            <SignedIn>
                <UserButton/>
            </SignedIn>
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className="border rounded-md text-white cursor-pointer border-gray-400 px-3 py-2">
                        Fazer Login
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;