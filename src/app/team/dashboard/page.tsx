import { Team } from "@/app/(auction)/all-teams/page";
import { Player } from "@/app/(auction)/players/page";
import { getServerUser } from "@/app/_lib/getServerUser";
import { Star } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getServerUser();
  if (!user) redirect("/login");

  const PlayerRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teamplayers?email=${user.email}`,{ next: { revalidate: 0 } }
  );

  const fullData: { team: Team; players: Player[] } = await PlayerRes.json();
  

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Captain Image */}
            <img
              src={fullData.team.captainImage || "/placeholder.svg"}
              alt={fullData.team.captain}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#2c5032] shadow-sm"
            />

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#2c5032]">
                {fullData.team.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Captain:{" "}
                <span className="capitalize font-medium">
                  {fullData.team.captain}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Gender: {fullData.team.gender}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center sm:text-left text-sm text-gray-700">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Balance</p>
              <p className="font-semibold text-[#e08a42] text-lg">
                ${fullData.team.balance.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Total Players</p>
              <p className="font-semibold text-gray-800 text-lg">
                {fullData.players.length}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Star Players</p>
              <p className="font-semibold text-yellow-600 text-lg">
                {fullData.players.filter((player) => player.isStar).length}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500">Positions</p>
              <p className="font-semibold text-gray-800 text-lg">
                {
                  Array.from(
                    new Set(fullData.players.map((player) => player.position))
                  ).length
                }{" "}
                types
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#2c5032] mb-6">Team Members</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {fullData.players.length === 0 && (
            <h1 className=" col-span-2 lg:col-span-6 text-center my-16 text-3xl font-bold text-[#2c5032] mb-6">
              No players bought yet
            </h1>
          )}
          {fullData.players.map((player) => (
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
