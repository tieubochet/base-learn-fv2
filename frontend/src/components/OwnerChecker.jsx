import { ethers } from "ethers";
import { useState } from "react";
// Đổi đường dẫn nếu file config của bạn ở nơi khác:
import contractAddresses from "../contracts/contractsConfig";

export default function OwnerChecker({ getSigner, setDeployStatus }) {
  const [checking, setChecking] = useState(false);
  const [summary, setSummary] = useState(null);

  const checkOwners = async () => {
    try {
      setChecking(true);

      const signer = await getSigner();
      if (!signer) {
        alert("⚠️ Please connect wallet first!");
        return;
      }

      const account = await signer.getAddress();
      const entries = Object.entries(contractAddresses);
      const totalCount = entries.length;
      let ownedCount = 0;

      for (const [name, cfg] of entries) {
        const target = cfg?.contractAddress_verify;
        if (!target) continue;

        try {
          const iface = new ethers.Interface([
            "function owners(address) view returns (bool)",
          ]);
          const data = iface.encodeFunctionData("owners", [account]);
          const raw = await signer.call({ to: target, data });
          const [isOwner] = iface.decodeFunctionResult("owners", raw);
          if (isOwner) ownedCount += 1;

          setDeployStatus((prev) => ({
            ...prev,
            [name]: {
              ...prev?.[name],
              ownerCheck: { address: account, isOwner, target, source: "contractsConfig" },
            },
          }));
        } catch {
          setDeployStatus((prev) => ({
            ...prev,
            [name]: {
              ...prev?.[name],
              ownerCheck: { address: account, isOwner: "❌ call reverted", target, source: "contractsConfig" },
            },
          }));
        }
      }

      setSummary({ address: account, ownedCount, totalCount });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center gap-2">
      <button
        onClick={checkOwners}
        disabled={checking}
        className="bg-gradient-to-r from-purple-500 to-pink-600 
                   hover:from-purple-400 hover:to-pink-500 
                   text-white font-bold px-6 py-3 rounded-xl shadow-lg 
                   disabled:opacity-60"
      >
        {checking ? "⏳ Checking..." : "Check My Base Learn Pins NFT"}
      </button>

      {summary && (
        <div className="text-white text-sm bg-slate-800/70 rounded-lg px-4 py-2 mt-1">
          <div>
            Base Learn Pins: <b>{summary.ownedCount}</b> / <b>{summary.totalCount}</b>
          </div>
          {/* <div className="text-xs text-slate-400">for {summary.address}</div> */}
        </div>
      )}

      <div className="mt-4 text-center">
        <a
          href="https://guild.xyz/base/base-learn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-lg font-semibold text-cyan-300 hover:text-cyan-200 leading-tight underline underline-offset-4 decoration-cyan-400/40 hover:decoration-cyan-200"
        >
          <span className="text-xl">🥳</span>
          <span className="px-1">Base Learn Role on Guild.xyz</span>
          <span className="text-xl">🥳</span>
        </a>
        <div className="mt-1 text-sm text-gray-400">
          (It may take up to 1 hour for your Guild role to update!)
        </div>
      </div>
    </div>
  );
}
