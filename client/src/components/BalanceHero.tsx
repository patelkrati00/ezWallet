import { I } from "../types";
import Icon from "./Icon";
import { MONO } from "../constants/data";

interface BalanceHeroProps {
  balance: number;
}

export default function BalanceHero({ balance }: BalanceHeroProps) {
  return (
    <div style={{ textAlign: "center", paddingTop: 62, paddingBottom: 54, position: "relative" }}>
      <p style={{
        fontSize: 11, fontWeight: 500,
        color: "rgba(255,255,255,0.38)",
        textTransform: "uppercase", letterSpacing: "0.22em",
        marginBottom: 24,
      }}>
        Total Balance
      </p>

      <div style={{ position: "relative", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
        <span style={{
          fontSize: "clamp(4rem, 9vw, 6rem)",
          lineHeight: 1, fontWeight: 600, letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
          background: "linear-gradient(175deg, rgba(255,253,255,1) 0%, rgba(238,230,255,0.96) 42%, rgba(216,205,255,0.90) 66%, rgba(196,181,253,0.80) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          filter: "drop-shadow(0 0 20px rgba(212,198,255,0.26)) drop-shadow(0 0 7px rgba(196,181,253,0.16))",
        }}>
          {balance}
        </span>
        <span style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)", lineHeight: 1, fontWeight: 500, color: "rgba(196,181,253,0.20)", paddingBottom: 4 }}>
          .55
        </span>
      </div>

      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginTop: 20, padding: "7px 16px", borderRadius: 100,
        background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.16)",
        boxShadow: "0 0 14px rgba(52,211,153,0.07), inset 0 1px 0 rgba(110,231,183,0.08)",
      }}>
        <Icon d={I.up} size={11} style={{ color: "rgba(110,231,183,0.75)" }} />
        <span style={{ fontSize: 13, fontFamily: MONO, color: "rgba(110,231,183,0.78)" }}>
          +$942.20 · +2.6% today
        </span>
      </div>
    </div>
  );
}