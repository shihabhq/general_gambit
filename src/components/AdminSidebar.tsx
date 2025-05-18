"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserPlus, Users2, User, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function AdminSidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/male", label: "Male Auction", icon: Users },
    { href: "/female", label: "Female Auction", icon: Users2 },
    { href: "/add-players", label: "Add Players", icon: UserPlus },
    { href: "/all-teams", label: "Teams", icon: Users },
    { href: "/players", label: "Players", icon: User },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-30 h-full overflow-y-auto`}
    >
      <div className="p-4 bg-[#2c5032] text-white flex justify-between items-center">
        <h2 className="text-xl font-bold">{"General's Gambit"}</h2>
        <button
          onClick={closeSidebar}
          className="text-white cursor-pointer hover:text-[#e08a42] transition-colors focus:outline-none"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href} className="mb-2">
                <Link
                  href={link.href}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-[#2c5032] transition-colors ${
                    pathname === link.href
                      ? "bg-gray-100 text-[#2c5032] border-l-4 border-[#e08a42]"
                      : ""
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
