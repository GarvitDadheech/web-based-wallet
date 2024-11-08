"use client"
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
export const MnemonicGeneration = () => {
    const[mnemomics,setMnemonics] = useState<null | string []>(null);

    const handleGenerateMnemonic = async () => {
        const mn = await generateMnemonic();
        const mnArray = mn.split(' ');
        setMnemonics(mnArray);
    }

    return (
        <div>
            <div>
                <div>
                    <input type="text" placeholder="Enter your secret phrase or click on generate to have one"/>
                    <button onClick={handleGenerateMnemonic}>Generate Seed Phrase</button>
                    <button className=""></button>
                </div>
                <div>
                    <div className="grid grid-cols-3">
                        {
                            mnemomics?.map((word,index) => {
                                return (
                                    <div key={index}>{word}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <SolanaWallet mnemonic={mnemomics}/>
                <EthWallet mnemonic={mnemomics}/>
            </div>
        </div>
    )
}