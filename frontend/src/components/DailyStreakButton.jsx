import React, { useEffect } from "react";
// 1. Import các hook cần thiết từ wagmi
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { contracts } from "../contracts/contractsList";

// 2. Xóa prop "provider" vì wagmi sẽ quản lý kết nối tự động
const DailyStreakButton = () => {
  // 3. Lấy thông tin tài khoản và trạng thái kết nối
  const { address, isConnected } = useAccount();

  // 4. Hook để GỌI HÀM "checkIn" (ghi vào blockchain)
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  // 5. Hook để ĐỌC DỮ LIỆU "getStreak" (đọc từ blockchain)
  // Nó sẽ tự động cập nhật khi 'address' thay đổi
  const { data: streak, isLoading: isStreakLoading, refetch } = useReadContract({
    address: contracts.dailyStreak.address,
    abi: contracts.dailyStreak.abi,
    functionName: 'getStreak',
    args: [address], // Truyền địa chỉ người dùng vào làm tham số
    // Chỉ chạy hook này khi người dùng đã kết nối ví
    enabled: isConnected && !!address,
  });

  // Hàm xử lý khi nhấn nút
  const handleCheckIn = () => {
    // wagmi sẽ tự động lấy signer và xử lý giao dịch
    writeContract({
      address: contracts.dailyStreak.address,
      abi: contracts.dailyStreak.abi,
      functionName: 'checkIn',
      args: [], // Hàm checkIn không cần tham số
    });
  };

  // 6. Tự động đọc lại streak sau khi check-in thành công
  useEffect(() => {
    // Nếu có hash (giao dịch thành công)
    if (hash) {
      console.log('Check-in successful, transaction hash:', hash);
      // Yêu cầu hook useReadContract chạy lại để lấy giá trị streak mới nhất
      refetch();
    }
  }, [hash, refetch]);


  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        // Vô hiệu hóa nút nếu ví chưa kết nối HOẶC đang có giao dịch chờ xử lý
        disabled={!isConnected || isPending}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isPending ? "Checking in..." : "Daily Streak"}
      </button>

      {/* Hiển thị streak lấy từ hook useReadContract */}
      {isStreakLoading && <p className="mt-2 text-sm text-gray-600">Loading streak...</p>}
      {streak !== null && streak !== undefined && (
        <p className="mt-2 text-sm text-gray-600">
          Streak: <span className="font-bold">{streak.toString()} 🔥</span>
        </p>
      )}

      {/* (Tùy chọn) Hiển thị thông báo lỗi để debug */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          Error: {error.shortMessage || error.message}
        </p>
      )}
    </div>
  );
};

export default DailyStreakButton;