import { MyWalletAdapter } from "./MyWalletAdapter";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = new MyWalletAdapter(connection);

const myWalletStandard = {
  name: "K2",
  version: "1.0.0",
  icon: "https://raw.githubusercontent.com/patelkrati00/k2-wallet-assets/main/K2icon.jpg",

  accounts: [],

  features: {
    "standard:connect": {
      version: "1.0.0",
      connect: async () => {
        const pubkey = await wallet.connect();
        return [{ address: pubkey.toBase58() }];
      },
    },

    "standard:disconnect": {
      version: "1.0.0",
      disconnect: async () => {
        await wallet.disconnect();
      },
    },

    "solana:signTransaction": {
      version: "1.0.0",
      signTransaction: async ({ transaction }: any) => {
        return wallet.signTransaction(transaction);
      },
    },
  },
};

(window as any).navigator.wallets = 
  (window as any).navigator.wallets || [];

(window as any).navigator.wallets.push(myWalletStandard);