import Auction from "@/components/AuctionData";
import PlayerSlider from "@/components/PlayerSlider";
import { Player } from "../players/page";

const MaleAuction = async () => {
  const maleRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/male`,{ next: { revalidate: 0 } }
  );

  const malePlayers: Player[] = await maleRes.json();

  if (!malePlayers || malePlayers.length === 0) {
    return (
      <h1 className="font-bold text-6xl text-center my-24">
        No Players available to auction
      </h1>
    );
  }

  return (
    <div className="">
      <Auction />
      <PlayerSlider members={malePlayers} />
    </div>
  );
};

export default MaleAuction;
