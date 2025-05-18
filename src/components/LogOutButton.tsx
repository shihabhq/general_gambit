"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { SignOutAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const { error } = await SignOutAction();
    setLoading(false);
    const errorMsg = error;
    if (!errorMsg) {
      toast.success("Logged out successfully");
      router.refresh();
    } else {
      toast.error("Unexpected error occured");
    }
  };
  return (
    <button
      className="bg-[#e08a42] cursor-pointer hover:bg-[#d07a32] text-white px-4 py-2 rounded-md font-medium transition-colors"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log out"}
    </button>
  );
};

export default LogoutButton;
