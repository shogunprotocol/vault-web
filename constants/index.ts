export const USDC_ADDRESS = "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E";
export const CONTRACT_ADDRESS = "0x85cbB40e56F19789012B0F1fE5d49c71148B99dC";
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
