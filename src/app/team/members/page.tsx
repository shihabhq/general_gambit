import { Player } from "@/app/(auction)/players/page";
import { getServerUser } from "@/app/_lib/getServerUser";
import { Star } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  const user = await getServerUser();
  if (!user) redirect("/login");

  const PlayerRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teamplayers?email=${user.email}`
  );

  const players: Player[] = await PlayerRes.json();
  console.log(players);

  if (players.length === 0) {
    return (
      <h1 className="text-center my-16 text-3xl font-bold text-[#2c5032] mb-6">
        No players bought yet
      </h1>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2c5032] mb-6">Team Members</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {players.map((player) => (
            <div
              key={player._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="relative">
                {/* Square image container */}
                <div className="aspect-square relative">
                  <img
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    className="object-cover"
                  />

                  {/* Star indicator */}
                  {player.isStar && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 p-1 rounded-full">
                      <Star className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-medium text-gray-800 truncate">
                  {player.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 capitalize">
                    {player.position}
                  </span>
                  <span className="text-xs font-medium text-[#e08a42]">
                    {player.price
                      ? `$${player.price.toLocaleString()}`
                      : "Not sold"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
