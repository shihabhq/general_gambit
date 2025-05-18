"use client";
import Link from "next/link";
import { Menu, Dices } from "lucide-react";
import LogoutButton from "./LogOutButton";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
}

export default function AdminNavbar({
  toggleSidebar,
  sidebarOpen = false,
}: NavbarProps) {
  return (
    <nav className="bg-[#2c5032] text-white h-16 flex items-center justify-between px-4 shadow-md z-10">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="mr-4 focus:outline-none cursor-pointer transition-colors hover:text-[#e08a42]"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link href="/" className="flex items-center">
          <Dices className="h-8 w-8 text-[#e08a42] mr-2" />
          <span className="text-xl font-bold">{"General's Gambit"}</span>
        </Link>
      </div>
      <LogoutButton />
    </nav>
  );
}
