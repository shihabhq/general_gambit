import {  User, User2 } from "lucide-react";
import { Player } from "../players/page";
import TeamCard from "@/components/TeamCard";

export type Team = {
  _id: string;
  name: string;
  gender: string;
  captain: string;
  captainImage: string;
  email: string;
  balance: number;
  type: string;
  players: Player[];
};

const AllTeams = async () => {
  const teamRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teams`
  );
  const teams: Team[] = await teamRes.json();

  const maleTeams = teams.filter((team) => team.gender === "male");
  const femaleTeams = teams.filter((team) => team.gender === "female");

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2c5032] mb-6">Teams</h1>

        <div className="space-y-10">
          {/* Male Teams Section */}
          <div>
            <h2 className="text-xl font-semibold text-[#2c5032] mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Male Teams
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {maleTeams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))}
            </div>
          </div>

          {/* Female Teams Section */}
          <div>
            <h2 className="text-xl font-semibold text-[#2c5032] mb-4 flex items-center">
              <User2 className="h-5 w-5 mr-2" />
              Female Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {femaleTeams.map((team) => (
                <TeamCard key={team._id} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTeams;
