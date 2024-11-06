"use client";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

interface EthWalletProps {
    mnemonic: string[] | null;
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    const addWallet = async () => {
        try {
            if(mnemonic) {
                const seedBuffer = await mnemonicToSeed(mnemonic.join(' '));
                const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
    
                const hdNode = HDNodeWallet.fromSeed(seedBuffer);
                const childNode = hdNode.derivePath(derivationPath);
    
                const wallet = new Wallet(childNode.privateKey);
                setAddresses([...addresses, wallet.address]);
    
                setCurrentIndex(currentIndex + 1);
            }
        } catch (error) {
            console.error("Error generating wallet address:", error);
        }
    };

    return (
        <div>
            <button onClick={addWallet}>Add ETH Wallet</button>
            {addresses.map((address, index) => (
                <div key={index}>Eth - {address}</div>
            ))}
        </div>
    );
};
