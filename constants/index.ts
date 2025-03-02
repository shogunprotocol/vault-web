export const USDC_ADDRESS = "0x29219dd400f2Bf60E5a23d13Be72B486D4038894";
export const CONTRACT_ADDRESS = "0x4BdE0740740b8dBb5f6Eb8c9ccB4Fc01171e953C";
export const VAULT_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "shares", type: "uint256" }],
    outputs: [],
  },
  {
    name: "totalAssets",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getPoolAddress",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "poolName", type: "string" }],
    outputs: [{ name: "", type: "address" }],
  },
  {
    name: "getPoolBalance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "poolName", type: "string" },
      { name: "asset", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
