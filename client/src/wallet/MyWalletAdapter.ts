import {
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
} from "@solana/web3.js";

export class MyWalletAdapter {
  private wallet: Keypair | null = null;
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  connect(): PublicKey {
    const stored = localStorage.getItem("wallet");

    if (stored) {
      const secretKey = Uint8Array.from(JSON.parse(stored));
      this.wallet = Keypair.fromSecretKey(secretKey);
    } else {
      this.wallet = Keypair.generate();
      localStorage.setItem(
        "wallet",
        JSON.stringify(Array.from(this.wallet.secretKey))
      );
    }

    return this.wallet.publicKey;
  }

  disconnect() {
    this.wallet = null;
  }

  getPublicKey(): PublicKey | null {
    return this.wallet?.publicKey || null;
  }

  async getBalance(): Promise<number> {
    if (!this.wallet) throw new Error("Not connected");

    const bal = await this.connection.getBalance(this.wallet.publicKey);
    return bal / LAMPORTS_PER_SOL;
  }

  async sendSol(to: string, amount: number) {
    if (!this.wallet) throw new Error("Not connected");

    const receiver = new PublicKey(to);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: this.wallet.publicKey,
        toPubkey: receiver,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const sig = await this.connection.sendTransaction(tx, [this.wallet]);
    await this.connection.confirmTransaction(sig, "finalized");

    return sig;
  }

  signTransaction(tx: Transaction): Transaction {
    if (!this.wallet) throw new Error("Not connected");
    tx.sign(this.wallet);
    return tx;
  }
}