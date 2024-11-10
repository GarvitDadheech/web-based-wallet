"use client";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { AddressCard } from "./AddressCard";

interface EthWalletProps {
    mnemonic: string[] | null;
}

interface Address {
    pub: string,
    priv: string
}

export const EthWallet = ({ mnemonic }: EthWalletProps) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const addWallet = async () => {
        try {
            if(mnemonic) {
                const seedBuffer = await mnemonicToSeed(mnemonic.join(' '));
                const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
    
                const hdNode = HDNodeWallet.fromSeed(seedBuffer);
                const childNode = hdNode.derivePath(derivationPath);
                const wallet = new Wallet(childNode.privateKey);
                const privateKey = childNode.privateKey;
                setAddresses([...addresses, {pub: wallet.address,priv: privateKey}]);

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
                <AddressCard privateAd={address.priv} publicAd={address.pub}/>
            ))}
        </div>
    );
};
