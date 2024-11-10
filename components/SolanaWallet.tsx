"use client"
import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet, HDNodeWallet } from "ethers";
import * as nacl from "tweetnacl";
import bs58 from 'bs58';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AddressCard } from "./AddressCard";

interface WalletProps {
    mnemonic: string[] | null;
}

interface Address {
    pub: string;
    priv: string;
}

export function SolanaWallet({ mnemonic }: WalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateAddress = async () => {
        try {
            setIsGenerating(true);
            if(mnemonic) {
                const seed = await mnemonicToSeed(mnemonic.join(' '));
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, seed.toString("hex")).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
    
                setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, {
                    pub: keypair.publicKey.toBase58(),
                    priv: bs58.encode(secret)
                }]);
            }
        } catch (error) {
            console.error("Failed to generate address:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                    {/* <FontAwesomeIcon icon={faSolid} className="h-5 w-5 text-purple-400" /> */}
                </div>
                <h3 className="text-xl font-semibold text-purple-400">Solana Wallet</h3>
            </div>

            <button
                onClick={generateAddress}
                disabled={isGenerating || !mnemonic}
                className={`w-full mb-6 px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 
                    ${!mnemonic 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                    }`}
            >
                {isGenerating ? (
                    <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                )}
                Generate Solana Wallet
            </button>

            <div className="space-y-4">
                {addresses.map((add, index) => (
                    <div key={index} className="animate-slideIn" style={{ animationDelay: `${index * 150}ms` }}>
                        <AddressCard privateAd={add.priv} publicAd={add.pub} />
                    </div>
                ))}
            </div>
        </div>
    );
}