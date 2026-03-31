import { useState } from "react";
import { BORDER_1 } from "../constants/data";
import type { Token, Tx } from "../types";
import TokenRow from "./TokenRow";
import TxRow from "./TxRow";

interface ContentCardProps {
  tab: "assets" | "activity";
  tokens: Token[];
  txs: Tx[];
}

export default function ContentCard({ tab, tokens, txs }: ContentCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 22,
        background: "linear-gradient(175deg, rgba(255,255,255,0.072) 0%, rgba(255,255,255,0.038) 50%, rgba(255,255,255,0.020) 100%)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : BORDER_1}`,
        overflow: "hidden",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.20s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.20s ease, border-color 0.20s ease",
        boxShadow: hov
          ? "inset 0 1.5px 0 rgba(255,255,255,0.13), inset 0 -2px 8px rgba(0,0,0,0.10), 0 28px 70px rgba(0,0,0,0.44), 0 8px 24px rgba(0,0,0,0.26), 0 0 0 1px rgba(196,181,253,0.10), 0 0 24px rgba(196,181,253,0.07)"
          : "inset 0 1.5px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.38), 0 4px 16px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(196,181,253,0.06)",
      }}
    >
      {tab === "assets"
        ? tokens.map((tk, i) => <TokenRow key={tk.symbol} token={tk} isLast={i === tokens.length - 1} />)
        : txs.map((tx, i) => <TxRow key={i} tx={tx} isLast={i === txs.length - 1} />)
      }
    </div>
  );
}