import { useEffect } from "react";
import WalletDashboard from "./Walletdashboard";
import { Connection } from "@solana/web3.js";
import { MyWalletAdapter } from "./wallet/MyWalletAdapter";
import "./wallet/injectWallet"

function App() {
  
  useEffect(()=>{
    const connection = new Connection("https://api.devnet.solana.com");
    const wallet = new MyWalletAdapter(connection);

    //inject into window
    (window as any).mywallet = wallet;
  },[])

  return (
    <div >
      <WalletDashboard/>
    </div>
  );
}

export default App;