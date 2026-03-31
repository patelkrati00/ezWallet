import { useState } from "react";
import  Icon from "./Icon";
import { I } from "../types";

const DIVIDER = "rgba(196,181,253,0.07)";
const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";

interface Tx {
  type: string;
  amount: string;
  from: string;
  time: string;
  up: boolean;
}
interface TxRowProps { tx: Tx; isLast: boolean; }

export default function TxRow({ tx, isLast }: TxRowProps) {
  const [hov, setHov] = useState(false);
  const iconD = tx.type === "Received" ? I.receive : tx.type === "Swap" ? I.swap : I.send;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "15px 22px",
        transform: hov ? "translateX(3px)" : "translateX(0px)",
        background: hov
          ? "linear-gradient(90deg, rgba(196,181,253,0.050) 0%, rgba(255,255,255,0.022) 100%)"
          : "transparent",
        borderBottom: isLast ? "none" : `1px solid ${DIVIDER}`,
        transition: "background 0.17s ease, transform 0.16s cubic-bezier(0.25,0.46,0.45,0.94)",
        cursor: "pointer",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: tx.up ? "rgba(110,231,183,0.08)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${tx.up ? "rgba(110,231,183,0.18)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hov && tx.up ? "0 0 12px rgba(110,231,183,0.12)" : "none",
          transition: "box-shadow 0.18s ease",
        }}>
          <Icon d={iconD} size={15}
            style={{ color: tx.up ? "rgba(110,231,183,0.75)" : "rgba(255,255,255,0.35)" }} />
        </div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.84)", marginBottom: 4 }}>
            {tx.type}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: MONO }}>
            {tx.from}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", lineHeight: 1 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, fontFamily: MONO, marginBottom: 4,
          color: tx.up ? "rgba(110,231,183,0.85)" : "rgba(255,255,255,0.58)",
        }}>
          {tx.amount}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)" }}>
          {tx.time}
        </div>
      </div>
    </div>
  );
}