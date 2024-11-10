"use client";
import React, { useState } from "react";
import { generateMnemonic} from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { SecretPhraseDisplay } from "./SecretPhraseDisplay";

export const MnemonicGeneration = () => {
  const [mnemonics, setMnemonics] = useState<string[] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [resetAddresses, setResetAddresses] = useState(false);

  const handleGenerateMnemonic = async () => {
    setIsSecretVisible(false);
    setResetAddresses(true);
    if (inputValue.trim() === "") {
      const mn = await generateMnemonic();
      const mnArray = mn.split(" ");
      setMnemonics(mnArray);
      setInputValue("");
    } else {
      setMnemonics(inputValue.trim().split(" "));
    }
    setTimeout(() => setResetAddresses(false), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSecretVisible(false);
    if (value.trim()) {
      setMnemonics(value.trim().split(" "));
    } else {
      setMnemonics(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-800 rounded-2xl p-4 md:p-8 shadow-2xl border border-blue-500/20 backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            VaultX - Crypto Wallet Generator
          </h2>
          <div className="flex flex-col sm:flex-row items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Enter your secret phrase or click on generate wallet"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 bg-gray-700 border-2 border-blue-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
            />
            <button
              onClick={handleGenerateMnemonic}
              className="w-full sm:w-auto px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FontAwesomeIcon icon={faWallet} className="h-4 w-4" />
              {inputValue ? "Add Wallet" : "Generate Wallet"}
            </button>
          </div>

          {mnemonics && (
            <SecretPhraseDisplay
              mnemonics={mnemonics}
              isVisible={isSecretVisible}
              onToggleVisibility={() => setIsSecretVisible(!isSecretVisible)}
            />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 ">
            <SolanaWallet mnemonic={mnemonics} resetAddresses={resetAddresses} />
            <EthWallet mnemonic={mnemonics} resetAddresses={resetAddresses} />
          </div>
        </div>
      </div>
    </div>
  );
};
