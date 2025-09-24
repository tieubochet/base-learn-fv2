export default function ContractCard({
  contract,
  contractStatus,
  deployStatus,   // cần prop này từ ContractDeployer
  deployContract,
  mintBadge,
}) {
  const deployedAddress = contractStatus?.address;

  // explorer address ưu tiên từ ownerCheck.target (địa chỉ trong contractsConfig),
  // nếu chưa có thì dùng deployedAddress (địa chỉ vừa deploy).
  const explorerAddress =
    contractStatus?.ownerCheck?.target || deployedAddress || null;

  const explorerLink = explorerAddress
    ? `https://sepolia.basescan.org/token/${explorerAddress}#readContract`
    : null;

  // Điều kiện riêng cho InheritanceSubmission
  const disableDeploy =
    contract.name === "InheritanceSubmission"
      ? !deployStatus["Salesperson"]?.address ||
        !deployStatus["EngineeringManager"]?.address
      : false;

  return (
    <div
      className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 
                 shadow-xl border-2 border-blue-500 
                 hover:scale-105 hover:shadow-blue-400/40 
                 transition-transform duration-200
                 h-64 flex flex-col justify-between"
    >
      {/* Contract name (clickable → Basescan readContract nếu có address) */}
      <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
        {explorerLink ? (
          <a
            href={explorerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="decoration-dotted hover:opacity-90"
            title="Open on BaseScan (readContract)"
          >
            {contract.name}
          </a>
        ) : (
          contract.name
        )}
      </h2>

      {/* Owner check result (English) */}
      {contractStatus?.ownerCheck && (
        <p className="text-xs mt-1">
          👑 NFT Contract:{" "}
          {contractStatus.ownerCheck.target ? (
            <a
              href={`https://sepolia.basescan.org/token/${contractStatus.ownerCheck.target}#readContract`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-cyan-400 hover:text-cyan-200"
              title="Open on BaseScan (readContract)"
            >
              {contractStatus.ownerCheck.target}
            </a>
          ) : (
            "N/A"
          )}{" "}
          →{" "}
          {contractStatus.ownerCheck.isOwner === true ? (
            <span className="text-green-400 font-bold">Owned</span>
          ) : contractStatus.ownerCheck.isOwner === false ? (
            <span className="text-red-400 font-bold">Not owned</span>
          ) : (
            <span className="text-yellow-400">
              {String(contractStatus.ownerCheck.isOwner)}
            </span>
          )}
        </p>
      )}

      {/* Status */}
      {contractStatus?.step ? (
        <div className="text-sm mt-2 text-white italic drop-shadow break-words 
                        max-h-12 overflow-y-auto p-1 bg-slate-800/40 rounded">
          {contractStatus.step}
        </div>
      ) : (
        <p className="text-sm mt-2 text-white italic drop-shadow">
          ⚡ Ready to deploy
        </p>
      )}

      {/* Ghi chú riêng cho InheritanceSubmission */}
      {contract.name === "InheritanceSubmission" && disableDeploy && (
        <p className="text-xs text-yellow-400 mt-1">
          ⚠️ Please deploy <b>Salesperson</b> & <b>EngineeringManager</b> first
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        {/* Deploy */}
        <button
          onClick={() => deployContract(contract)}
          disabled={disableDeploy}
          className="flex-1 bg-gradient-to-r from-blue-500 to-sky-600 
                     hover:from-blue-400 hover:to-sky-500 
                     text-white font-bold px-5 py-2 rounded-lg text-sm shadow-lg disabled:opacity-50"
        >
          🚀 Deploy
        </button>

        {/* Mint hoặc thông báo */}
        {contract.name !== "Salesperson" &&
        contract.name !== "EngineeringManager" ? (
          <button
            onClick={() => mintBadge(contract.name, deployedAddress)}
            disabled={!contractStatus?.canMint}
            className={`flex-1 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300
              ${
                contractStatus?.canMint
                  ? "bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-400 hover:to-sky-500 text-white border border-green-400 animate-border-glow"
                  : "bg-black text-white/80 cursor-not-allowed disabled:opacity-100"
              }`}
          >
            🪙 Mint Badge
          </button>
        ) : (
          <div className="flex-1 text-center text-xs font-semibold text-yellow-300 bg-slate-800/50 rounded-lg px-3 py-2">
            🚫 No need to mint badge
          </div>
        )}
      </div>

      {/* Contract Address (clickable → Basescan readContract) */}
      {deployedAddress && (
        <p className="text-xs text-white mt-3 break-all">
          <strong>📜 Contract Address:</strong>{" "}
          <a
            href={`https://sepolia.basescan.org/token/${deployedAddress}#readContract`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-cyan-400 hover:text-cyan-200"
            title="Open on BaseScan (readContract)"
          >
            {deployedAddress}
          </a>
        </p>
      )}

      {/* Deploy Tx link */}
      {contractStatus?.tx && (
        <p className="text-xs text-white mt-1 break-all">
          🔗 Deploy Tx:&nbsp;
          <a
            href={`https://sepolia.basescan.org/tx/${contractStatus.tx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white hover:text-gray-300 font-semibold"
          >
            {contractStatus.tx}
          </a>
        </p>
      )}

      {/* Mint result */}
      {contractStatus?.minting && (
        <p className="text-xs text-emerald-300 mt-2 break-all">
          {contractStatus.minting}
          {contractStatus.mintTx && (
            <>
              {" - "}
              <a
                href={`https://sepolia.basescan.org/tx/${contractStatus.mintTx}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-cyan-400 hover:text-cyan-200"
              >
                {contractStatus.mintTx}
              </a>
            </>
          )}
        </p>
      )}

      {/* Error */}
      {contractStatus?.error && (
        <textarea
          readOnly
          value={`❌ Error: ${contractStatus.error}`}
          className="text-xs text-red-400 font-semibold break-words 
                     bg-slate-900/60 border border-red-500 rounded p-2 
                     mt-2 resize-none w-full max-h-24 overflow-auto"
        />
      )}
    </div>
  );
}
