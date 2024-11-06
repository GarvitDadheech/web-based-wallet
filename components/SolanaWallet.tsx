"use client";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import * as nacl from "tweetnacl";

interface SolanaWalletProps {
    mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<string[]>([]);

    const generateAddress = async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
        } catch (error) {
            console.error("Failed to generate address:", error);
        }
    };

    return (
        <div>
            <button onClick={generateAddress}>Add Sol wallet</button>
            {publicKeys.map((publicKey, index) => (
                <div key={index}>{publicKey}</div>
            ))}
        </div>
    );
}
