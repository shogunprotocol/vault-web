import { Vault } from "@/components/Vault";
import { VaultBalance } from "@/components/VaultBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-blue-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-16 pt-8">
          <ConnectButton />
          <br />
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text">
            AI-Powered Smart Vaults
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Maximize your yields with intelligent DeFi strategies. Our AI-driven
            vaults automatically optimize your investments for the best possible
            returns.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-blue-600 dark:text-blue-400 text-2xl font-bold mb-2">
                Smart
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                AI-optimized strategies for maximum efficiency
              </p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-purple-600 dark:text-purple-400 text-2xl font-bold mb-2">
                Secure
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Battle-tested smart contracts and regular audits
              </p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold mb-2">
                Simple
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Easy-to-use interface for seamless investing
              </p>
            </div>
          </div>
        </div>
        {/* Vault Components */}
        <div className="max-w-2xl mx-auto">
          <VaultBalance />
          <Vault />
        </div>
      </div>
    </div>
  );
}
