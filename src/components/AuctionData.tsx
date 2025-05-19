"use client";

import { useEffect, useState } from "react";
import socket from "@/app/_lib/socket";
const Auction = () => {
  const [currentBid, setCurrentBid] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);
  const [currentCaptain, setCurrentCaptain] = useState<string | null>(null);

  useEffect(() => {
    // Join the auction to get the initial data
    socket.emit("join-auction");

    // Listen for current bid updates
    const handleCurrentBid = ({
      bid,
      team,
      captain,
    }: {
      bid: number;
      team: string | null;
      captain: string | null;
    }) => {
      setCurrentBid(bid);
      setCurrentTeam(team);
      setCurrentCaptain(captain);
    };

    socket.on("current-bid", handleCurrentBid);

    return () => {
      socket.off("current-bid", handleCurrentBid);
    };
  }, []);

  const handleReset = () => {
    socket.emit("reset");
  };

  return (
    <div className="max-w-xl min-w-[25%] xl:absolute top-20 right-20 mx-auto my-6">
      <div className="border-3 relative border-[#2c5032] rounded-lg overflow-hidden shadow-lg">
        <button
          onClick={handleReset}
          className="absolute bottom-3 hover:opacity-95 transition-all
         right-3 py-1 px-3 font-semibold cursor-pointer  rounded-sm bg-secondary text-white"
        >
          reset
        </button>
        <div className="flex">
          {/* Left side - Current bid */}
          <div className="w-2/5 bg-[#2c5032] text-white flex p-2 items-center justify-center">
            <div className="text-center">
              <div className="text-lg uppercase font-semibold opacity-80 mb-1">
                Current Bid
              </div>
              <div className="text-5xl font-bold">{currentBid}</div>
            </div>
          </div>

          {/* Right side - Team and Captain info */}
          <div className="w-3/5 p-2 bg-white">
            <div className="mb-4">
              <div className="text-base text-gray-600 uppercase font-medium">
                Team
              </div>
              <div className="text-3xl font-bold text-[#2c5032] mt-1">
                {currentTeam || "N/A"}
              </div>
            </div>

            <div>
              <div className="text-base text-gray-600 uppercase font-medium">
                Captain
              </div>
              <div className="text-2xl font-semibold text-[#e08a42] mt-1">
                {currentCaptain || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auction;
