import React, { useState } from "react";
import { ethers } from "ethers";
import { contracts } from "../contracts/contractsList";

const DailyStreakButton = ({ provider }) => {
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(null);

  const handleCheckIn = async () => {
    try {
      setLoading(true);

      // Lấy signer từ provider
      const signer = await provider.getSigner();

      // Khởi tạo contract với signer
      const contract = new ethers.Contract(
        contracts.dailyStreak.address,
        contracts.dailyStreak.abi,
        signer
      );

      // Gửi tx
      const tx = await contract.checkIn();
      await tx.wait();

      // Đọc lại streak
      const streakValue = await contract.getStreak(await signer.getAddress());
      setStreak(streakValue.toString());
    } catch (err) {
      console.error("Check-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Checking in..." : "Daily Streak"}
      </button>
      {streak && (
        <p className="mt-2 text-sm text-gray-600">
          Streak: <span className="font-bold">{streak} 🔥</span>
        </p>
      )}
    </div>
  );
};

export default DailyStreakButton;
