import React, { useEffect, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { contracts } from "../contracts/contractsList";
import { base, baseSepolia } from 'wagmi/chains';

const DailyStreakButton = () => {
  // Hook để lấy thông tin tài khoản và trạng thái kết nối
  const { address, isConnected } = useAccount();
  
  // Hook để lấy chainId của mạng lưới hiện tại mà ví đang kết nối
  const chainId = useChainId();

  // Hook để cung cấp chức năng yêu cầu ví chuyển mạng
  const { switchChain } = useSwitchChain();

  // Tự động chọn địa chỉ smart contract dựa trên chainId hiện tại.
  // useMemo được dùng để tối ưu, chỉ tính toán lại khi chainId thay đổi.
  const contractAddress = useMemo(() => {
    // Nếu chưa có chainId (ví dụ khi đang tải trang), trả về undefined
    if (!chainId) return undefined;
    // Tra cứu địa chỉ trong file config bằng chainId
    return contracts.dailyStreak.address[chainId];
  }, [chainId]);

  // Hook để thực hiện hành động GHI vào smart contract (gửi giao dịch)
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  // Hook để thực hiện hành động ĐỌC từ smart contract
  const { data: streak, isLoading: isStreakLoading, refetch } = useReadContract({
    address: contractAddress, // Sử dụng địa chỉ đã được chọn tự động
    abi: contracts.dailyStreak.abi,
    functionName: 'getStreak',
    args: [address], // Truyền địa chỉ của người dùng làm tham số
    // Điều kiện để hook này chạy: người dùng phải kết nối ví,
    // và phải có một địa chỉ contract hợp lệ cho mạng hiện tại.
    enabled: isConnected && !!address && !!contractAddress,
  });

  // Hàm xử lý logic khi người dùng nhấn nút
  const handleCheckIn = () => {
    // Đảm bảo có địa chỉ contract trước khi thực hiện
    if (!contractAddress) return;

    // Gọi hàm writeContract do wagmi cung cấp, truyền vào các thông tin cần thiết
    writeContract({
      address: contractAddress,
      abi: contracts.dailyStreak.abi,
      functionName: 'checkIn',
      args: [], // Hàm checkIn này không có tham số
    });
  };

  // Sử dụng useEffect để theo dõi sự thay đổi của `hash` (mã giao dịch)
  // Khi có `hash` mới (giao dịch thành công), tự động gọi `refetch` để cập nhật streak
  useEffect(() => {
    if (hash) {
      console.log('Check-in successful, transaction hash:', hash);
      refetch();
    }
  }, [hash, refetch]);

  // --- RENDER LOGIC ---

  // Trường hợp 1: Người dùng đã kết nối ví nhưng đang ở mạng không được hỗ trợ
  // (không tìm thấy contractAddress cho chainId hiện tại)
  if (isConnected && !contractAddress) {
    return (
      <div className="mt-2 p-4 border border-yellow-400 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700 font-semibold">
          Network Not Supported
        </p>
        <p className="text-yellow-600 text-sm mt-1">
          Please switch to a supported network to continue.
        </p>
        <div className="mt-3 space-x-2">
            {/* Nút yêu cầu chuyển sang Base Mainnet */}
            <button
                onClick={() => switchChain({ chainId: base.id })}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
                Switch to Base Mainnet
            </button>
            {/* Nút yêu cầu chuyển sang Base Sepolia Testnet */}
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

  // Trường hợp 2: Giao diện chính khi mọi thứ đều hợp lệ
  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        // Vô hiệu hóa nút khi:
        // 1. Ví chưa kết nối
        // 2. Giao dịch đang chờ xử lý
        // 3. (An toàn kép) Không có địa chỉ contract hợp lệ
        disabled={!isConnected || isPending || !contractAddress}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? "Confirming in wallet..." : "Daily Streak Check-in"}
      </button>

      {/* Hiển thị trạng thái tải streak */}
      {isStreakLoading && <p className="mt-2 text-sm text-gray-600">Loading streak...</p>}

      {/* Hiển thị streak sau khi tải xong */}
      {streak !== null && streak !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Your current streak: <span className="font-bold">{streak.toString()} 🔥</span>
        </p>
      )}

      {/* Hiển thị lỗi nếu giao dịch thất bại */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error.shortMessage || error.message}
        </p>
      )}
    </div>
  );
};

export default DailyStreakButton;