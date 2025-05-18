"use client";
import { createContext } from "react";

export interface Team {
  name: string;
  gender: "male" | "female";
  balance: number;
  captain: string;
  email: string;
  type: string;
  captainImage: string;
}

export const TeamContext = createContext<Team | null>(null);

export default function TeamProvider({
  team,
  children,
}: {
  team: Team;
  children: React.ReactNode;
}) {
  return <TeamContext.Provider value={team}>{children}</TeamContext.Provider>;
}
