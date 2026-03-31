import { Keypair, Transaction } from "@solana/web3.js";

export class MyWalletAdapter {
    private keypair: Keypair | null = null;
    private connected = false;

    connect(): string {
        this.keypair = Keypair.generate();
        this.connected = true;

        return this.keypair.publicKey.toBase58();
    }

    disconnect(): void {
        this.keypair = null;
        this.connected = false;
    }

    isconnected(): boolean {
        return this.connected;
    }

    getpublicKey(): string | null {
        return this.keypair?.publicKey.toBase58() || null;
    }

    signTransaction(tx: Transaction): Transaction {
        if (!this.keypair) throw new Error("wallet not connected");
        tx.sign(this.keypair);
        return tx;
    }

}