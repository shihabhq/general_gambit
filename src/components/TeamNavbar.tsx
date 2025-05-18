"use client";

import { useState } from "react";

import Link from "next/link";
import { Home, LogOut, Menu, X, SquareDashedMousePointer } from "lucide-react";
import LogoutButton from "./LogOutButton";

interface Team {
  _id: string;
  name: string;
  balance: number;
  captain: string;
  captainImage: string;
}

interface TeamNavbarProps {
  team: Team;
}

export default function TeamNavbar({ team }: TeamNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#2c5032] text-white shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between h-16 px-4">
          {/* Left: Team Info */}
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-[#e08a42] mr-3">
              <img
                src={team.captainImage || "/placeholder.svg"}
                alt={team.captain}
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `/placeholder.svg?height=40&width=40`;
                }}
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">{team.name}</h1>
              <p className="text-xs text-gray-200">Captain: {team.captain}</p>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/team"
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#3c6142] transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              <span>Home</span>
            </Link>
            <Link
              href="/team/dashboard"
              className="flex items-center px-3 py-2 rounded-md hover:bg-[#3c6142] transition-colors"
            >
              <SquareDashedMousePointer className="h-5 w-5 mr-2" />
              <span>Dashboard</span>
            </Link>
          </nav>

          {/* Right: Balance and Logout */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 rounded-md bg-[#e08a42] hover:bg-[#d07a32] transition-colors">
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Left: Team Info */}
            <div className="flex items-center">
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-[#e08a42] mr-2">
                <img
                  src={team.captainImage || "/placeholder.svg"}
                  alt={team.captain}
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=32&width=32`;
                  }}
                />
              </div>
              <div>
                <h1 className="font-bold text-sm">{team.name}</h1>
                <p className="text-xs text-gray-200">Captain: {team.captain}</p>
              </div>
            </div>

            {/* Right: Balance and Menu Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md hover:bg-[#3c6142] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="px-4 pb-4 space-y-2">
              <Link
                href="/team"
                className="flex items-center px-3 py-2 rounded-md hover:bg-[#3c6142] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </Link>
              <Link
                href="/my-team/dashboard"
                className="flex items-center px-3 py-2 rounded-md hover:bg-[#3c6142] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <SquareDashedMousePointer className="h-5 w-5 mr-2" />
                <span>Dashboard</span>
              </Link>
              <LogoutButton />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
