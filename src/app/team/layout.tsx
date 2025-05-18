import type React from "react";
import type { Metadata } from "next";
import "../globals.css";
import TeamNavbar from "@/components/TeamNavbar";
import { redirect } from "next/navigation";
import { getServerUser } from "../_lib/getServerUser";
import TeamProvider from "@/contexts/TeamContexts";

export const metadata: Metadata = {
  title: "My Team - Auction Platform",
  description: "Manage your team in the auction platform",
};

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUser();
  if (!user) redirect("/login");

  const teamDataRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team?email=${user.email}`
  );
  if (!teamDataRes.ok) {
    return (
      <div className="flex h-screen items-center justify-center text-4xl font-semibold">
        No data found unfortunately
      </div>
    );
  }
  const teamData = await teamDataRes.json();

  return (
    <div className="flex flex-col min-h-screen">
      <TeamNavbar team={teamData} />
      <div className="flex-1">
        <TeamProvider team={teamData}>{children}</TeamProvider>
      </div>
    </div>
  );
}
