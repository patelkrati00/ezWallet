import { useEffect, useState } from "react";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { connection } from "../services/Solana";

export const useWallet = async () => {

    const [wallet, setWallet] = useState<Keypair | null>(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("wallet");
        if (stored) {
            const secretKey = Uint8Array.from(JSON.parse(stored));
            const kp = Keypair.fromSecretKey(secretKey);
            setWallet(kp);
        }
    }, []);

    //fetch balance
    useEffect(() => {
        if (!wallet) return;

        const getBalance = async () => {

            const bal = await connection.getBalance(wallet.publicKey);
            setBalance(bal / LAMPORTS_PER_SOL);
        }
        getBalance();

    }, [wallet, connection]);

    //create wallet

    const createWallet = () => {
        const kp = Keypair.generate();
        localStorage.setItem("wallet", JSON.stringify(Array.from(kp.secretKey)));
        setWallet(kp);
    }

    const sendSol = async (to: string, amount: number) => {
        if (!wallet) return;

        try {
            const receiver = new PublicKey(to);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: receiver,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            );
            const signature = await connection.sendTransaction(transaction, [wallet]);
            await connection.confirmTransaction(signature, "finalized");
            alert("sol transferred successfully");

        } catch (err) {
            console.log(err);
        }

    }

    return{
        sendSol,
        createWallet,
        balance,
        wallet
    };

} 