import { Users, Users2 } from "lucide-react";
import Link from "next/link";

export default function AllPlayers() {
  return (
    <main className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2c5032] mb-6">
          Welcome to Gambit
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/male" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-32 bg-[#2c5032] flex items-center justify-center text-white">
                <Users className="h-16 w-16" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Male Auction
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse and bid on male players.
                </p>
                <button className="w-full cursor-pointer bg-[#e08a42] hover:bg-[#d07a32] text-white py-2 rounded-md font-medium transition-colors">
                  Start Auction
                </button>
              </div>
            </div>
          </Link>

          <Link href="/female" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="h-32 bg-[#2c5032] flex items-center justify-center text-white">
                <Users2 className="h-16 w-16" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Female Auction
                </h2>
                <p className="text-gray-600 mb-4">
                  Browse and bid on female players.
                </p>
                <button className="w-full cursor-pointer bg-[#e08a42] hover:bg-[#d07a32] text-white py-2 rounded-md font-medium transition-colors">
                  Start Auction
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
