import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const strategies = [
  {
    name: "Silo Finance",
    description: "Lending and borrowing optimization on Aave protocol",
    icon: "💰",
    details: "Automated lending position management for optimal yields",
  },
  {
    name: "Beets",
    description: "Dex and yield farming on Beets",
    icon: "⚖️",
    details: "Strategic liquidity deployment across various pools",
  },
  {
    name: "Origin Sonic",
    description: "Liquid staking and validator rewards optimization",
    icon: "🌊",
    details: "Efficient management of staking positions",
  },
];

export function Strategies() {
  return (
    <Card className="bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90 backdrop-blur-sm border border-white/20 shadow-xl mb-10">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          Active Strategies
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          Our AI agent automatically allocates funds between these strategies
          for optimal returns. Your funds never leave the secure vault contracts
          - they are only reallocated between strategies.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-4">
        {strategies.map((strategy) => (
          <div
            key={strategy.name}
            className="p-6 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-black/40 dark:to-black/20 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{strategy.icon}</span>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {strategy.name}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {strategy.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-3">
              {strategy.details}
            </p>
          </div>
        ))}
      </CardContent>
      <div className="px-6 pb-6">
        <div className="p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            <span className="font-semibold">Security Note:</span> Your funds
            always remain within our secure smart contracts. The AI agent only
            optimizes the allocation between different yield-generating
            strategies, never withdrawing funds from the protocol.
          </p>
        </div>
      </div>
    </Card>
  );
}
