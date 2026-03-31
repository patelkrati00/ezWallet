const DIVIDER = "rgba(196,181,253,0.07)";
const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";

interface Token {
  symbol: string;
  name: string;
  balance: string;
  usd: string;
  change: string;
  up: boolean;
  hex: string;
}

interface TokenRowProps { token: Token; isLast: boolean; }

import { useState } from "react";

export default function TokenRow({ token, isLast }: TokenRowProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "15px 22px",
        // Micro-interaction: horizontal nudge on hover
        transform: hov ? "translateX(3px)" : "translateX(0px)",
        background: hov
          ? "linear-gradient(90deg, rgba(196,181,253,0.072) 0%, rgba(255,255,255,0.028) 100%)"
          : "transparent",
        borderBottom: isLast ? "none" : `1px solid ${DIVIDER}`,
        transition: "background 0.17s ease, transform 0.16s cubic-bezier(0.25,0.46,0.45,0.94)",
        cursor: "pointer",
        position: "relative",
      }}>
      {/* Left-edge accent — fades in on hover */}
      <div style={{
        position: "absolute", left: 0, top: "18%", bottom: "18%",
        width: 2, borderRadius: 2,
        background: "linear-gradient(180deg, transparent, rgba(196,181,253,0.60), transparent)",
        opacity: hov ? 1 : 0,
        transition: "opacity 0.16s ease",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.02em", flexShrink: 0,
          background: `${token.hex}14`,
          color: token.hex,
          border: `1px solid ${token.hex}30`,
          boxShadow: hov
            ? `0 0 14px ${token.hex}22, 0 0 5px ${token.hex}16`
            : `0 0 10px ${token.hex}12`,
          transition: "box-shadow 0.18s ease",
        }}>
          {token.symbol.slice(0, 2)}
        </div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", marginBottom: 4 }}>
            {token.symbol}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.42)" }}>
            {token.name}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right", lineHeight: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)", fontFamily: MONO, marginBottom: 4 }}>
          {token.usd}
        </div>
        <div style={{
          fontSize: 12, fontFamily: MONO,
          color: token.up ? "rgba(110,231,183,0.78)" : "rgba(252,165,165,0.78)",
        }}>
          {token.balance} · {token.change}
        </div>
      </div>
    </div>
  );
}