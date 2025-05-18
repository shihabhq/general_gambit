import Auction from "@/components/AuctionData";
import PlayerSlider from "@/components/PlayerSlider";
import { Player } from "../players/page";

const FemaleAuction = async () => {
  const maleRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/female`
  );

  const femalePlayers: Player[] = await maleRes.json();

  if (!femalePlayers || femalePlayers.length === 0) {
    return (
      <h1 className="font-bold text-6xl text-center my-24">
        No Players available to auction
      </h1>
    );
  }

  return (
    <div className="">
      <Auction />
      <PlayerSlider members={femalePlayers} />
    </div>
  );
};

export default FemaleAuction;
