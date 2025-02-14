import { Vault } from "@/components/Vault";
import { VaultBalance } from "@/components/VaultBalance";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Strategies } from "@/components/Strategies";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-16 pt-8">
          <ConnectButton />
          <br />
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            AI-Powered Smart Vaults
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            Maximize your yields with intelligent DeFi strategies. Our AI-driven
            vaults automatically optimize your investments for the best possible
            returns.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
            <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-xl transform hover:scale-105 transition-all duration-200">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-2xl font-bold mb-2">
                Smart
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                AI-optimized strategies for maximum efficiency
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-xl transform hover:scale-105 transition-all duration-200">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-2xl font-bold mb-2">
                Secure
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Battle-tested smart contracts and regular audits
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-xl transform hover:scale-105 transition-all duration-200">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 text-2xl font-bold mb-2">
                Simple
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Easy-to-use interface for seamless investing
              </p>
            </div>
          </div>
        </div>
        {/* Vault Components */}
        <div className="max-w-4xl mx-auto">
          <VaultBalance />
          <Strategies />
          <Vault />
        </div>
      </div>
    </div>
  );
}
