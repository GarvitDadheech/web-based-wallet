"use client";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import * as nacl from "tweetnacl";
import bs58 from 'bs58';
import { AddressCard } from "./AddressCard";
interface SolanaWalletProps {
    mnemonic: string[] | null;
}

interface Address {
    pub: string;
    priv: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [addresses, setAddresses] = useState<Address[]>([]);

    const generateAddress = async () => {
        try {
            if(mnemonic) {
                const seed = await mnemonicToSeed(mnemonic.join(' '));
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, seed.toString("hex")).key;
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                const keypair = Keypair.fromSecretKey(secret);
    
                setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, {pub: keypair.publicKey.toBase58(),priv: bs58.encode(secret)}]);
            }
        } catch (error) {
            console.error("Failed to generate address:", error);
        }
    };

    return (
        <div>
            <button onClick={generateAddress}>Add Sol wallet</button>
            {addresses.map((add, index) => (
                <AddressCard privateAd={add.priv} publicAd={add.pub}/>
            ))}
        </div>
    );
}
