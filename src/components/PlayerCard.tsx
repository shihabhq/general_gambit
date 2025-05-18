"use client";
import { Player } from "@/app/(auction)/players/page";
import { Star, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${player.name}?`
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/players/${player._id}?gender=${player.gender}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete player");
      }

      toast.success("Player deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the player.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
      {/* Image & Badges */}
      <div className="relative">
        <div className="h-36 bg-gray-200 relative">
          <img
            src={player.image || "/placeholder.svg"}
            alt={player.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/placeholder.svg?height=144&width=256`;
            }}
          />
        </div>

        <div className="absolute top-2 right-2 flex gap-1">
          {player.isStar && (
            <span
              className="bg-yellow-400 text-yellow-800 p-1 rounded-full"
              title="Star Player"
            >
              <Star className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-800 truncate">
              {player.name}
            </h3>
          </div>

          <div className="mt-2 text-sm min-h-[40px]">
            {player.isSold ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center text-green-700">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  <span>{player.price?.toLocaleString()}</span>
                </div>
                <div className="text-gray-500 text-xs">
                  Sold to: <span className="font-medium">{player.soldTo}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Available for auction</div>
            )}
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            disabled={loading}
            onClick={handleDelete}
            className="text-xs bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
