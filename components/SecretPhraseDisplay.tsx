import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faEyeSlash,
  faEye,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

interface MnemonicDisplayProps {
  mnemonics: string[] | null;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export const SecretPhraseDisplay = ({
  mnemonics,
  isVisible,
  onToggleVisibility,
}: MnemonicDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyPhrase = async () => {
    if (!mnemonics || !isVisible) return;
    try {
      await navigator.clipboard.writeText(mnemonics.join(" "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!mnemonics) return null;

  return (
    <div className="mb-8 animate-fadeIn px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <button
          onClick={onToggleVisibility}
          className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FontAwesomeIcon
            icon={isVisible ? faEyeSlash : faEye}
            className="h-4 w-4"
          />
          {isVisible ? "Hide Secret Phrase" : "Show Secret Phrase"}
        </button>

        {isVisible && (
          <button
            onClick={copyPhrase}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base
                            ${
                              copied
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            }`}
          >
            <FontAwesomeIcon
              icon={copied ? faCheck : faCopy}
              className="h-4 w-4"
            />
            {copied ? "Copied!" : "Copy Phrase"}
          </button>
        )}
      </div>

      {isVisible && (
        <div
          onClick={copyPhrase}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 sm:p-6  rounded-xl borderursor-pointer group  transition-all duration-300" 
        >
          {mnemonics.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-2 px-4 sm:px-6 bg-gray-800 rounded-xl border border-purple-500/20 animate-slideIn select-none"
              style={{
                animationDelay: `${index * 50}ms`,
                position: "relative", // To position the shadow
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3))", // Simulate light from the top-right
                
              }}
            >
              <span className="text-gray-200 text-sm md:text-base font-semibold font-sans">{word}</span>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3 flex justify-end mt-2 text-white text-xs sm:text-sm ">
            <span>Click anywhere to copy</span>
          </div>
        </div>
      )}

      {isVisible && (
        <div className="mt-4 p-3 sm:p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-2xl flex items-start gap-3">
          <FontAwesomeIcon
            icon={faWarning}
            className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500"
          />
          <p className="text-xs sm:text-sm text-yellow-200">
            Never share your secret phrase. Anyone with access to it can control
            your wallet.
          </p>
        </div>
      )}
    </div>
  );
};
