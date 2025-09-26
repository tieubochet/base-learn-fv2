import React, { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { contracts } from "../contracts/contractsList";
import { base, baseSepolia } from 'wagmi/chains';

const DailyStreakButton = () => {
  // ... (toàn bộ logic hooks giữ nguyên) ...
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const contractAddress = useMemo(() => {
    if (!chainId) return undefined;
    return contracts.dailyStreak.address[chainId];
  }, [chainId]);
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { data: streak, isLoading: isStreakLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: contracts.dailyStreak.abi,
    functionName: 'getStreak',
    args: [address],
    enabled: isConnected && !!address && !!contractAddress,
  });

  const handleCheckIn = () => {
    if (!contractAddress) return;
    writeContract({
      address: contractAddress,
      abi: contracts.dailyStreak.abi,
      functionName: 'checkIn',
      args: [],
    });
  };

  useEffect(() => {
    if (hash) {
      console.log('Check-in successful, transaction hash:', hash);
      refetch();
    }
  }, [hash, refetch]);
  
  // ... (phần render cảnh báo mạng giữ nguyên) ...
  if (isConnected && !contractAddress) {
    return (
      <div className="mt-2 p-4 border border-yellow-400 bg-yellow-50 rounded-lg">
        {/* ... */}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        disabled={!isConnected || isPending || !contractAddress}
        // == THAY ĐỔI CLASSNAME Ở ĐÂY ==
        className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-lg shadow-cyan-500/50 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed disabled:bg-gradient-to-r"
      >
        {isPending ? "Confirming..." : "Streak"}
      </button>


      {streak !== null && streak !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Streak: <span className="font-bold">{streak.toString()} 🔥</span>
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error.shortMessage || error.message}
        </p>
      )}
    </div>
  );
};

export default DailyStreakButton;