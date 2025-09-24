import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContractDeployer from "./components/ContractDeployer";
import { useEffect } from "react";
import { trackPageView } from "./utils/analytics";

export default function App() {
  useEffect(() => {
    // Track page view when app loads
    trackPageView('Main App', navigator.userAgent);
  }, []);

  const btnClass =
    "bg-gradient-to-r from-sky-500 to-blue-600 " +
    "hover:from-sky-400 hover:to-blue-500 " +
    "text-white font-semibold px-5 py-2.5 rounded-xl " +
    "text-sm shadow-lg transition";

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-950 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        {/* Chỉ hiện từ md trở lên */}
        <h1 className="hidden md:block text-2xl font-bold">
          Base Sepolia Contract Deployer
        </h1>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.alchemy.com/faucets/base-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass}
          >
            ⛽️ Faucet
          </a>

          <a
            href="https://twitter.com/solotop999"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass}
          >
            🐦 Follow Me
          </a>

          <a
            href="https://github.com/solotop999/Base-Learn"
            target="_blank"
            rel="noopener noreferrer"
            className={btnClass}
          >
            ⭐ Source Code
          </a>

          <ConnectButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <ContractDeployer />
      </div>
    </div>
  );

}
