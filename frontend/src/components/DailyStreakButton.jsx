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
        className="px-5 py-2.5 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:scale-95 transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isPending ? "Confirming in wallet..." : "Daily Streak Check-in"}
      </button>

      {isStreakLoading && <p className="mt-2 text-sm text-gray-600">Loading streak...</p>}

      {streak !== null && streak !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Your current streak: <span className="font-bold">{streak.toString()} 🔥</span>
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