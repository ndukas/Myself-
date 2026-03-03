import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  isDark: boolean;
}

export default function Header({ isDark }: HeaderProps) {
  const [isConnectClicked, setIsConnectClicked] = useState(false);
  const location = useLocation();

  const handleConnectClick = () => {
    setIsConnectClicked(true);
    setTimeout(() => setIsConnectClicked(false), 800);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <Link 
        to="/contact"
        onClick={handleConnectClick}
        className={`px-6 py-2 font-bold rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 ${
          isConnectClicked 
            ? (isDark ? "bg-black text-white shadow-black/25" : "bg-white text-black shadow-white/25")
            : (isDark ? "bg-white text-black shadow-white/25 hover:bg-gray-200" : "bg-black text-white shadow-black/25 hover:bg-zinc-900")
        }`}
      >
        Connect
      </Link>
    </div>
  );
}
