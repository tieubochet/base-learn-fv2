import React, { useEffect, useMemo } from "react";
// 1. Import thêm hook `useChainId` và `useSwitchChain`
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { contracts } from "../contracts/contractsList";
import { base, baseSepolia } from 'wagmi/chains';

const DailyStreakButton = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId(); // Lấy chainId của mạng hiện tại

  // 2. Tự động chọn địa chỉ contract dựa vào chainId
  const contractAddress = useMemo(() => {
    return contracts.dailyStreak.address[chainId];
  }, [chainId]);

  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { switchChain } = useSwitchChain(); // Hook để yêu cầu chuyển mạng

  const { data: streak, isLoading: isStreakLoading, refetch } = useReadContract({
    // 3. Sử dụng địa chỉ contract đã được chọn tự động
    address: contractAddress,
    abi: contracts.dailyStreak.abi,
    functionName: 'getStreak',
    args: [address],
    // Chỉ chạy hook này khi đã kết nối và có địa chỉ contract hợp lệ
    enabled: isConnected && !!address && !!contractAddress,
  });

  const handleCheckIn = () => {
    // Chỉ gọi khi có địa chỉ contract hợp lệ
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

  // 4. Xử lý trường hợp người dùng ở sai mạng
  if (isConnected && !contractAddress) {
    return (
      <div className="mt-2 p-4 border border-yellow-400 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">
          Network not supported. Please switch to a supported network.
        </p>
        <div className="mt-2 space-x-2">
            {/* Nút chuyển sang Base Mainnet */}
            <button
                onClick={() => switchChain({ chainId: base.id })}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Switch to Base Mainnet
            </button>
            {/* Nút chuyển sang Base Sepolia */}
            <button
                onClick={() => switchChain({ chainId: baseSepolia.id })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
                Switch to Base Sepolia
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        // Vô hiệu hóa nếu ví chưa kết nối, đang chờ xử lý, hoặc ở sai mạng
        disabled={!isConnected || isPending || !contractAddress}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? "Checking in..." : "Daily Streak"}
      </button>

      {isStreakLoading && <p className="mt-2 text-sm text-gray-600">Loading streak...</p>}
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