"use client";
import { Team } from "@/app/(auction)/all-teams/page";
import { DollarSign, User } from "lucide-react";

function TeamCard({ team }: { team: Team }) {
  return (
    <div
      key={team._id}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="p-4 bg-[#2c5032] text-white">
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-[#e08a42] mr-3">
            <img
              src={team.captainImage || "/placeholder.svg"}
              alt={team.captain}
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/placeholder.svg?height=48&width=48`;
              }}
            />
          </div>
          <div>
            <h3 className="font-bold text-lg">{team.name}</h3>
            <p className="text-sm text-gray-200 flex items-center">
              <User className="h-3 w-3 mr-1" />
              Captain: {team.captain}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500">Team Balance</div>
        <div className="font-medium text-[#2c5032] flex items-center">
          <DollarSign className="h-4 w-4 mr-1 text-[#e08a42]" />
          {team.balance.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-medium text-gray-700 mb-3">
          Players ({team.players.length})
        </h4>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {team.players.map((player) => (
            <div
              key={player?.name}
              className="flex items-center border-b border-gray-100 pb-2"
            >
              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                <img
                  src={player?.image || "/placeholder.svg"}
                  alt={player?.name}
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/placeholder.svg?height=32&width=32`;
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{player?.name}</span>
                  {player?.isStar && (
                    <span className="ml-1 text-yellow-500 text-xs">★</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">#{player?.number}</div>
              </div>
              <div className="text-sm font-medium text-[#e08a42]">
                ${player?.price?.toLocaleString() || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
