"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface address {
    publicAd: string;
    privateAd: string;
}

export const AddressCard = ({ publicAd, privateAd }: address) => {
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedPrivate, setCopiedPrivate] = useState(false);

    const copyToClipboard = async (text: string, isPublic: boolean) => {
        try {
            await navigator.clipboard.writeText(text);
            if (isPublic) {
                setCopiedPublic(true);
                setTimeout(() => setCopiedPublic(false), 2000);
            } else {
                setCopiedPrivate(true);
                setTimeout(() => setCopiedPrivate(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const getHiddenKey = () => {
        return '*'.repeat(Math.min(privateAd.length, 40));
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4 mb-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden">
            {/* Public Address Section */}
            <div className="mb-3">
                <div className="text-sm text-gray-400 mb-1">Public Address</div>
                <div className="flex items-center justify-between gap-2 bg-gray-700 rounded-xl p-2">
                    <div 
                        className="truncate text-blue-400 cursor-pointer hover:text-blue-300 transition-colors duration-300 flex-grow"
                        onClick={() => copyToClipboard(publicAd, true)}
                    >
                        {publicAd}
                    </div>
                    <button
                        onClick={() => copyToClipboard(publicAd, true)}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex-shrink-0"
                    >
                        <FontAwesomeIcon icon={copiedPublic ? faCheck : faCopy} className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            {/* Private Key Section */}
            <div>
                <div className="text-sm text-gray-400 mb-1">Private Key</div>
                <div className="relative">
                    <div className="flex items-center justify-between gap-2 bg-gray-700 rounded-xl p-2">
                        <div 
                            className="truncate text-purple-400 cursor-pointer hover:text-purple-300 transition-colors duration-300 flex-grow"
                            onClick={() => showPrivateKey && copyToClipboard(privateAd, false)}
                        >
                            {showPrivateKey ? privateAd : getHiddenKey()}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => setShowPrivateKey(!showPrivateKey)}
                                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            >
                                <FontAwesomeIcon 
                                    icon={showPrivateKey ? faEyeSlash : faEye} 
                                    className="h-4 w-4" 
                                />
                            </button>
                            <button
                                onClick={() => showPrivateKey && copyToClipboard(privateAd, false)}
                                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            >
                                <FontAwesomeIcon 
                                    icon={copiedPrivate ? faCheck : faCopy} 
                                    className="h-4 w-4" 
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};