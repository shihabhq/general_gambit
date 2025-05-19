"use client";

import { TeamContext } from "@/contexts/TeamContexts";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import socket from "../_lib/socket";

const Team = () => {
  const teamData = useContext(TeamContext);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    socket.emit("bid-update");

    const checkCurrentBid = ({ bid }: { bid: number }) => {
      setBidAmount(bid);
    };

    socket.on("current-bid", checkCurrentBid);

    return () => {
      socket.off("current-bid", checkCurrentBid);
    };
  }, []);

  const handleChange = (amount: number) => {
    setBidAmount((prev) => Math.max(prev + amount, 0));
  };

  const handleGiveBid = () => {
    if (!teamData?.name || !teamData?.captain) {
      toast.error("Team data is incomplete.");
      return;
    }
    if (bidAmount <= 0 || bidAmount > teamData?.balance) {
      toast.error("Not enough balance");
      console.log(bidAmount, teamData?.balance);
      return;
    }

    const payload = {
      team: teamData.name,
      captain: teamData.captain,
      bid: bidAmount,
    };

    // Emit the bid event to the backend
    socket.emit("place-bid", payload);
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8">
      <h1 className="text-6xl font-semibold text-gray-800">Bid: {bidAmount}</h1>

      <div className="flex gap-4 flex-wrap items-center justify-center">
        <button
          onClick={() => handleChange(-50)}
          className="px-6 py-3 bg-red-500 hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          -50
        </button>
        <button
          onClick={() => handleChange(-25)}
          className="px-6 py-3 bg-red-500 hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          -25
        </button>
        <button
          onClick={() => handleChange(10)}
          className="px-6 py-3 bg-primary hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          +10
        </button>
        <button
          onClick={() => handleChange(20)}
          className="px-6 py-3 bg-primary hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          +20
        </button>
        <button
          onClick={() => handleChange(50)}
          className="px-6 py-3 bg-primary hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          +50
        </button>
        <button
          onClick={() => handleChange(100)}
          className="px-6 py-3 bg-primary hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
        >
          +100
        </button>
      </div>
      <button
        onClick={handleGiveBid}
        className="px-6 py-3 bg-secondary hover:opacity-85 cursor-pointer text-white text-lg rounded-xl shadow-md transition"
      >
        Give Bid
      </button>
    </div>
  );
};

export default Team;
