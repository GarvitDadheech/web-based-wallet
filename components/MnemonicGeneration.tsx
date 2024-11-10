"use client"
import React, { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faWallet } from '@fortawesome/free-solid-svg-icons';
import { SecretPhraseDisplay } from "./SecretPhraseDisplay";

export const MnemonicGeneration = () => {
    const [mnemonics, setMnemonics] = useState<string[] | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isSecretVisible, setIsSecretVisible] = useState(false);

    const handleGenerateMnemonic = async () => {
        if (inputValue.trim() === "") {
            const mn = await generateMnemonic();
            const mnArray = mn.split(" ");
            setMnemonics(mnArray);
            setInputValue("");
        } else {
            setMnemonics(inputValue.trim().split(" "));
        }
    };

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        
        if (value.trim()) {
            setMnemonics(value.trim().split(" "));
        } else {
            setMnemonics(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className=" mx-auto">
                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-blue-500/20 backdrop-blur-xl">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        VaultX - Crypto Wallet Generator
                    </h2>
                    
                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Enter your secret phrase or click generate"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border-2 border-blue-500/30 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-400"
                        />
                        <button
                            onClick={handleGenerateMnemonic}
                            className="absolute right-2 top-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 flex items-center gap-2"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SolanaWallet mnemonic={mnemonics} />
                        <EthWallet mnemonic={mnemonics} />
                    </div>
                </div>
            </div>
        </div>
    );
};