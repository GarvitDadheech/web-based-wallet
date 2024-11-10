import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy,faCheck,faEyeSlash,faEye,faKey } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
interface address{
    publicAd : string;
    privateAd : string;
}
export const AddressCard = ({ publicAd, privateAd } : address) => {
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async (text : string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4 mb-4 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden">
            {/* Public Address Section */}
            <div className="mb-3">
                <div className="text-sm text-gray-400 mb-1">Public Address</div>
                <div className="flex items-center justify-between gap-2 bg-gray-700 rounded-lg p-2">
                    <div className="truncate text-blue-400">{publicAd}</div>
                    <button
                        onClick={() => copyToClipboard(publicAd)}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            {/* Private Key Section */}
            <div>
                <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-400">Private Key</div>
                    <button
                        onClick={() => setShowPrivateKey(!showPrivateKey)}
                        className="text-xs px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-300 flex items-center gap-1"
                    >
                        <FontAwesomeIcon icon={showPrivateKey ? faEyeSlash : faEye} className="h-3 w-3" />
                        {showPrivateKey ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="relative">
                    <div className={`flex items-center justify-between gap-2 bg-gray-700 rounded-lg p-2 ${showPrivateKey ? '' : 'blur-xl select-none'}`}>
                        <div className="truncate text-purple-400">{privateAd}</div>
                        {showPrivateKey && (
                            <button
                                onClick={() => copyToClipboard(privateAd)}
                                className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    {!showPrivateKey && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FontAwesomeIcon icon={faKey} className="h-4 w-4 text-gray-500" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};