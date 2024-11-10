"use client"
import React, { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { AddressCard } from "./AddressCard";
interface WalletProps {
    mnemonic: string[] | null;
    resetAddresses: boolean;
}

interface Address {
    pub: string;
    priv: string;
}
export function EthWallet({ mnemonic,resetAddresses }: WalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (resetAddresses) {
            setAddresses([]);
            setCurrentIndex(0);
        }
    }, [resetAddresses]);

    const addWallet = async () => {
        try {
            setIsGenerating(true);
            if(mnemonic) {
                const seedBuffer = await mnemonicToSeed(mnemonic.join(' '));
                const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
    
                const hdNode = HDNodeWallet.fromSeed(seedBuffer);
                const childNode = hdNode.derivePath(derivationPath);
                const wallet = new Wallet(childNode.privateKey);
                const privateKey = childNode.privateKey;
                
                setAddresses([...addresses, {
                    pub: wallet.address,
                    priv: privateKey
                }]);
                setCurrentIndex(currentIndex + 1);
            }
        } catch (error) {
            console.error("Error generating wallet address:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <FontAwesomeIcon icon={faEthereum} className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-400">Ethereum Wallet</h3>
            </div>

            <button
                onClick={addWallet}
                disabled={isGenerating || !mnemonic}
                className={`w-full mb-6 px-4 py-1 md:px-6 md:py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 
                    ${!mnemonic 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                    }`}
            >
                {isGenerating ? (
                    <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                ) : (
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                )}
                Generate Ethereum Wallet
            </button>

            <div className="space-y-4">
                {addresses.map((address, index) => (
                    <div key={index} className="animate-slideIn" style={{ animationDelay: `${index * 150}ms` }}>
                        <AddressCard privateAd={address.priv} publicAd={address.pub} />
                    </div>
                ))}
            </div>
        </div>
    );
}
