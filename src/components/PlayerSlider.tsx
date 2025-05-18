"use client";

import { Player } from "@/app/(auction)/players/page";
import socket from "@/app/_lib/socket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PlayerSlider({
  members,

}: {
  members: Player[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredMembers = members.filter((member) => !member.isSold);
  const [players, setPlayers] = useState<Player[]>(filteredMembers);
  const [isLoading, setIsLoading] = useState(false);

  const currentPlayer = players[currentIndex];

  const handlePrevious = () => {
    socket.emit("reset");
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    socket.emit("reset");
    setCurrentIndex((prev) => (prev < players.length - 1 ? prev + 1 : prev));
  };

  const handleCloseBid = () => {
    if (!currentPlayer) return;
    setIsLoading(true);

    socket.emit("close-bid", {
      playerId: currentPlayer._id,
      gender: currentPlayer.gender,
    });
  };

  useEffect(() => {
    const handleBidClosed = ({ playerId }: { playerId: string }) => {
      const updatedPlayers = players.filter((p) => p._id !== playerId);
      setPlayers(updatedPlayers);

      if (currentIndex >= updatedPlayers.length) {
        setCurrentIndex(Math.max(0, updatedPlayers.length - 1));
      }

      setIsLoading(false);
    };

    const handleError = (msg: string) => {
      console.error("Close bid error:", msg);
      toast.error("Bid is not placed yet");
      setIsLoading(false);
    };

    socket.on("bid-closed", handleBidClosed);
    socket.on("bid-close-error", handleError);

    return () => {
      socket.off("bid-closed", handleBidClosed);
      socket.off("bid-close-error", handleError);
    };
  }, [players, currentIndex]);

  if (players.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mb-8 p-8 bg-gray-100 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-[#2c5032]">
          No more players available
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl my-16 mx-auto px-4 mb-10">
      <div className="w-full md:w-[56%] mx-auto relative">
        <img
          src={currentPlayer.image || "/placeholder.svg?height=1280&width=916"}
          alt={currentPlayer.name}
          className="w-full h-full object-contain max-h-[80vh] mx-auto"
        />

        {currentPlayer.isStar && (
          <div className="absolute top-4 right-4 bg-[#e08a42] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            ⭐ Star Player
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isLoading}
          className={`px-6 py-3 cursor-pointer text-base font-medium rounded-lg transition ${
            currentIndex === 0 || isLoading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#f5f5f5] text-[#2c5032] hover:bg-[#e6e6e6]"
          }`}
        >
          ⬅ Previous
        </button>

        <button
          onClick={handleCloseBid}
          disabled={isLoading}
          className={`px-6 py-3 cursor-pointer text-base font-semibold rounded-lg transition ${
            isLoading
              ? "bg-gray-400 cursor-wait"
              : "bg-[#e08a42] text-white hover:bg-[#cf7933]"
          }`}
        >
          {isLoading ? "Processing..." : "🏁 Close Bid"}
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === players.length - 1 || isLoading}
          className={`cursor-pointer px-6 py-3 text-base font-medium rounded-lg transition ${
            currentIndex === players.length - 1 || isLoading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#f5f5f5] text-[#2c5032] hover:bg-[#e6e6e6]"
          }`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
