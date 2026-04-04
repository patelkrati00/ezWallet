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
  public publicKey: PublicKey | null = null;
  public connected: boolean = false;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  //event listeners

  private listeners : { [key : string] : Function[] } = {};

  on(event:string,fn:Function){
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }

  emit(event:string, data?:any){
     (this.listeners[event] || []).forEach(fn=>fn(data));
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
    this.publicKey = this.wallet.publicKey;
    this.connected = true;
    this.emit("connect",this.publicKey);
    return this.publicKey;
  }

  disconnect() {
    this.wallet = null;
    this.publicKey = null;
    this.connected = false;
    this.emit("disconnect")
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