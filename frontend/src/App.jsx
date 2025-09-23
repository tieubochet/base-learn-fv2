import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContractDeployer from "./components/ContractDeployer";

export default function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-950 to-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">Base Sepolia Contract Deployer</h1>
        <ConnectButton />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <ContractDeployer />
      </div>
    </div>
  );
}
