import PlayerCard from "@/components/PlayerCard";
import { Users, Users2 } from "lucide-react";

export interface Player {
  _id: string;
  name: string;
  image: string;
  price: number | null;
  isSold: boolean;
  soldTo: string | null;
  isStar: boolean;
  gender: string;
  number: number;
}

export default async function PlayersPage() {
  const maleRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/male`
  );
  const femaleRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/female`
  );

  const malePlayers: Player[] = await maleRes.json();
  const femalePlayers: Player[] = await femaleRes.json();

  return (
    <div className="p-6 mx-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2c5032] mb-6">Players</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-[#2c5032] mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Male Players
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {malePlayers.length > 0 &&
                malePlayers.map((player) => (
                  <PlayerCard key={player._id} player={player} />
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#2c5032] mb-4 flex items-center">
              <Users2 className="h-5 w-5 mr-2" />
              Female Players
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {femalePlayers.length > 0 &&
                femalePlayers.map((player) => (
                  <PlayerCard key={player._id} player={player} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
