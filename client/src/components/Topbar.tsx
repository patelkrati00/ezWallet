import { I } from "../types";
import Icon from "./Icon";
import { MONO, LAV_MID } from "../constants/data";

interface TopbarProps {
  copied: boolean;
  onCopy: () => void;
}

export default function Topbar({ copied, onCopy }: TopbarProps) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 44px 0", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: "linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)",
          boxShadow: "0 0 14px rgba(196,181,253,0.32), 0 0 4px rgba(196,181,253,0.16)",
          flexShrink: 0,
        }} />
        <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>My Wallet</span>
      </div>

      <button onClick={onCopy} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 18px", borderRadius: 13,
        fontSize: 13, fontFamily: MONO,
        color: copied ? LAV_MID : "rgba(255,255,255,0.42)",
        background: "linear-gradient(175deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.030) 100%)",
        border: `1px solid ${copied ? "rgba(196,181,253,0.28)" : "rgba(255,255,255,0.09)"}`,
        boxShadow: copied
          ? "0 0 12px rgba(196,181,253,0.14), inset 0 1.5px 0 rgba(255,255,255,0.10), 0 1px 4px rgba(0,0,0,0.2)"
          : "inset 0 1.5px 0 rgba(255,255,255,0.08), 0 1px 4px rgba(0,0,0,0.2)",
        cursor: "pointer", transition: "all 0.2s ease",
      }}>
        0x3fA8…d91c
        <Icon d={copied ? I.check : I.copy} size={12} style={{ color: copied ? LAV_MID : "rgba(255,255,255,0.28)" }} />
      </button>
    </header>
  );
}