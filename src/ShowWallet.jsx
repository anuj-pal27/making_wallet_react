import React, { useState } from "react";

export const ShowWallet = ({ addresses, leftWallet, walletIndex }) => {
  function deleteHandler() {
    leftWallet(walletIndex);
  }
  return (
    <div className="border-2  border-dashed border-gray-500 relative">
      <div className="flex items-start text-xl text-white font-semibold">
        Solana Wallet {walletIndex}
      </div>
      <button
        className="flex absolute right-[0px] top-0 bg-red-700"
        onClick={deleteHandler}
      >
        Delete
      </button>
      <div className="flex items-start text-lg font-normal mt-3 text-slate-400 ">
        Public Key
      </div>

      <div className="mt-4 text-xl border-3 border-solid border-gray-900 text-blue-200 bg-slate-900 rounded-xl p-3">
        {addresses}
      </div>
    </div>
  );
};
