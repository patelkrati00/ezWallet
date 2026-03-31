import type { Token, Tx } from "../types";

export const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";
export const SANS = "'DM Sans','Inter',sans-serif";
export const LAV_MID = "rgba(196,181,253,0.82)";
export const BORDER_1 = "rgba(255,255,255,0.09)";

export const TOKENS: Token[] = [
  { symbol: "ETH",  name: "Ethereum", balance: "4.2819",   usd: "$14,823.40", change: "+2.4%", up: true,  hex: "#a5b4fc" },
  { symbol: "SOL",  name: "Solana",   balance: "182.50",   usd: "$18,204.75", change: "+5.1%", up: true,  hex: "#c4b5fd" },
  { symbol: "USDC", name: "USD Coin", balance: "3,210.00", usd: "$3,210.00",  change: "0.0%",  up: true,  hex: "#93c5fd" },
  { symbol: "ARB",  name: "Arbitrum", balance: "920.00",   usd: "$892.40",    change: "-1.2%", up: false, hex: "#7dd3fc" },
  { symbol: "OP",   name: "Optimism", balance: "540.00",   usd: "$756.00",    change: "+3.8%", up: true,  hex: "#fda4af" },
];

export const TXS: Tx[] = [
  { type: "Received", amount: "+0.42 ETH",  from: "0x3f…d91c", time: "2 min ago",   up: true  },
  { type: "Sent",     amount: "-500 USDC",  from: "0xa1…88bf", time: "1 hour ago",  up: false },
  { type: "Swap",     amount: "+12.5 SOL",  from: "Jupiter",   time: "3 hours ago", up: true  },
  { type: "Sent",     amount: "-100 ARB",   from: "0x7c…4412", time: "Yesterday",   up: false },
];