import React, { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain } from "wagmi";
// Chú ý: Đảm bảo đường dẫn này là chính xác
import { contracts } from "../contracts/contractsList"; 
import { base, baseSepolia } from 'wagmi/chains';

// ==================================================================
// === DÒNG DEBUG QUAN TRỌNG NHẤT ===
// Chúng ta sẽ kiểm tra xem đối tượng 'contracts' được import vào có đúng cấu trúc không
console.log("DEBUG: contracts object imported into DailyStreakButton:", contracts);
// ==================================================================


const DailyStreakButton = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const contractAddress = useMemo(() => {
    if (!chainId) return undefined;
    // Dòng này sẽ gây lỗi nếu contracts.dailyStreak.address không phải là một object
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

  if (isConnected && !contractAddress) {
    return (
      <div className="mt-2 p-4 border border-yellow-400 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700 font-semibold">Network Not Supported</p>
        <p className="text-yellow-600 text-sm mt-1">Please switch to a supported network to continue.</p>
        <div className="mt-3 space-x-2">
            <button
                onClick={() => switchChain({ chainId: base.id })}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
                Switch to Base Mainnet
            </button>
            <button
                onClick={() => switchChain({ chainId: baseSepolia.id })}
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700"
            >
                Switch to Base Sepolia
            </button>
        </div>
      </div>
    );
  }

  // ... phần render còn lại giữ nguyên ...
  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        disabled={!isConnected || isPending || !contractAddress}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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