"use client";
import { useState } from "react";
import "../globals.css";
import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

export default function AuctionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
    console.log("Toggling sidebar, new state:", !sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    console.log("Closing sidebar");
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 flex-col relative">
        <AdminSidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

        {/* Overlay to close sidebar when clicking outside */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-[#00000054] opaci bg-opacity-50 z-20"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    </div>
  );
}
