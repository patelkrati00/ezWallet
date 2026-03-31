import { useState } from "react";
import { useWallet } from "./hooks/useWallet";
import { TOKENS, TXS, SANS } from "./constants/data";
import Sidebar from "./components/Sidebar.tsx";
import Topbar from "./components/Topbar";
import BalanceHero from "./components/BalanceHero";
// import ActionRow from "./components/ActionRow";
import TabBar from "./components/TabBar";
import ContentCard from "./components/ContentCard";
import ActionBtn from "./components/ActionBtn";

export default function WalletDashboard() {
  const [tab, setTab] = useState<"assets" | "activity">("assets");
  const [copied, setCopy] = useState(false);
  const [nav, setNav] = useState("home");
  const { balance, sendSol } = useWallet();

  const handleCopy = () => { setCopy(true); setTimeout(() => setCopy(false), 1800); };

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      background: "radial-gradient(ellipse 90% 55% at 50% 0%, #131020 0%, #0e0c18 30%, #0b0910 58%, #080810 100%)",
      fontFamily: SANS, position: "relative",
    }}>
      {/* Scene lighting */}
      <div style={{
        position: "fixed", inset: "0 0 auto 0", height: 1, zIndex: 30, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 0%, rgba(220,210,255,0.45) 35%, rgba(244,240,255,0.72) 50%, rgba(220,210,255,0.45) 65%, transparent 100%)"
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 440, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(200,190,255,0.042) 0%, rgba(196,181,253,0.014) 50%, transparent 100%)"
      }} />

      <Sidebar nav={nav} setNav={setNav} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, zIndex: 10, overflow: "hidden" }}>
        <Topbar copied={copied} onCopy={handleCopy} />

        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div style={{ maxWidth: 468, margin: "0 auto", padding: "0 22px 88px" }}>
            <BalanceHero balance={balance} />
{/* // In WalletDashboard.tsx, replace <ActionRow onSend={...} /> with: */}

            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 56 }}>
              <ActionBtn iKey="send" label="Send" onClick={() => sendSol("receiver-address", 1)} />
              <ActionBtn iKey="receive" label="Receive" />
              <ActionBtn iKey="swap" label="Swap" />
              <ActionBtn iKey="buy" label="Buy" />
            </div>            <TabBar tab={tab} setTab={setTab} />
            <ContentCard tab={tab} tokens={TOKENS} txs={TXS} />
          </div>
        </main>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        button { font-family: ${SANS}; }
      `}</style>
    </div>
  );
}