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
    <div className="mb-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onToggleVisibility}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-2xl transition-all duration-300 flex items-center gap-2"
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
            className={`px-4 py-2 rounded-2xl transition-all duration-300 flex items-center gap-2
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
          className="grid grid-cols-3 gap-4 p-6 bg-gray-700/50 rounded-xl border border-purple-500/20 cursor-pointer group hover:bg-gray-700/70 transition-all duration-300"
        >
          {mnemonics.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-2 px-6 bg-gray-800 rounded-xl border border-purple-500/20 animate-slideIn select-none"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className="text-gray-200">{word}</span>
            </div>
          ))}
            <div className="col-span-3 flex justify-end mt-2 text-gray-300">
                <span>Click anywhere to copy</span>
            </div>
        </div>
      )}

      {isVisible && (
          <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-2xl flex items-start gap-3">
            <FontAwesomeIcon
              icon={faWarning}
              className="h-5 w-5 text-yellow-500"
            />
            <p className="text-sm text-yellow-200">
              Never share your secret phrase. Anyone with access to it can
              control your wallet.
            </p>
        </div>
      )}
    </div>
  );
};
