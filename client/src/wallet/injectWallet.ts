import { MyWalletAdapter } from "./MyWalletAdapter";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = new MyWalletAdapter(connection);

// Inject into window

if (!(window as any).mywallet) {
    (window as any).mywallet = {
  isMyWallet: true,

  connect: wallet.connect.bind(wallet),
  disconnect: wallet.disconnect.bind(wallet),

  publicKey: wallet.publicKey,

  signTransaction: wallet.signTransaction.bind(wallet),

  sendTransaction: async (tx: any) => {
    return wallet.signTransaction(tx);
  },

  on: wallet.on.bind(wallet),
};
}