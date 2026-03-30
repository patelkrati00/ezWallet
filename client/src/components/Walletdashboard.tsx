import { useState } from "react";
import type { CSSProperties } from "react";

// ─── SVG Icon primitive ───────────────────────────────────────────────────────
interface IconProps {
  d: string;
  size?: number;
  style?: CSSProperties;
}

const Icon = ({ d, size = 20, style = {} }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0, ...style }}>
    <path d={d} />
  </svg>
);

const I: Record<string, string> = {
  send:    "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  receive: "M12 5v14 M5 12l7 7 7-7",
  swap:    "M7 16V4m0 0L3 8m4-4l4 4 M17 8v12m0 0l4-4m-4 4l-4-4",
  buy:     "M12 19V5 M5 12l7-7 7 7",
  copy:    "M8 4H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2 M8 4a2 2 0 0 1 2-2h4a2 2 0 1 1 0 4H10a2 2 0 0 1-2-2z",
  check:   "M20 6L9 17l-5-5",
  up:      "M18 15l-6-6-6 6",
  home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  explore: "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z",
  cog:     "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Token {
  symbol: string;
  name: string;
  balance: string;
  usd: string;
  change: string;
  up: boolean;
  hex: string;
}

interface Tx {
  type: string;
  amount: string;
  from: string;
  time: string;
  up: boolean;
}

const TOKENS: Token[] = [
  { symbol: "ETH",  name: "Ethereum",  balance: "4.2819",   usd: "$14,823.40", change: "+2.4%",  up: true,  hex: "#a5b4fc" },
  { symbol: "SOL",  name: "Solana",    balance: "182.50",   usd: "$18,204.75", change: "+5.1%",  up: true,  hex: "#c4b5fd" },
  { symbol: "USDC", name: "USD Coin",  balance: "3,210.00", usd: "$3,210.00",  change: "0.0%",   up: true,  hex: "#93c5fd" },
  { symbol: "ARB",  name: "Arbitrum",  balance: "920.00",   usd: "$892.40",    change: "-1.2%",  up: false, hex: "#7dd3fc" },
  { symbol: "OP",   name: "Optimism",  balance: "540.00",   usd: "$756.00",    change: "+3.8%",  up: true,  hex: "#fda4af" },
];

const TXS: Tx[] = [
  { type: "Received", amount: "+0.42 ETH", from: "0x3f…d91c", time: "2 min ago",   up: true  },
  { type: "Sent",     amount: "-500 USDC", from: "0xa1…88bf", time: "1 hour ago",  up: false },
  { type: "Swap",     amount: "+12.5 SOL", from: "Jupiter",   time: "3 hours ago", up: true  },
  { type: "Sent",     amount: "-100 ARB",  from: "0x7c…4412", time: "Yesterday",   up: false },
];

// ─── Design tokens ────────────────────────────────────────────────────────────
const MONO = "'JetBrains Mono','Fira Code','Courier New',monospace";
const SANS = "'DM Sans','Inter',sans-serif";

const LAV_MID  = "rgba(196,181,253,0.82)";
const BORDER_1 = "rgba(255,255,255,0.09)";
const DIVIDER  = "rgba(196,181,253,0.07)";

// ─── TokenRow ─────────────────────────────────────────────────────────────────
interface TokenRowProps { token: Token; isLast: boolean; }

function TokenRow({ token, isLast }: TokenRowProps) {
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

// ─── TxRow ────────────────────────────────────────────────────────────────────
interface TxRowProps { tx: Tx; isLast: boolean; }

function TxRow({ tx, isLast }: TxRowProps) {
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

// ─── SidebarBtn ───────────────────────────────────────────────────────────────
interface SideBtnProps { iKey: string; active: boolean; onClick: () => void; label: string; }

function SideBtn({ iKey, active, onClick, label }: SideBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 44, height: 44, borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.18s ease",
        background: active
          ? "linear-gradient(160deg, rgba(196,181,253,0.18) 0%, rgba(167,139,250,0.09) 100%)"
          : hov ? "rgba(255,255,255,0.06)" : "transparent",
        border: active
          ? "1px solid rgba(196,181,253,0.24)"
          : hov ? "1px solid rgba(255,255,255,0.09)" : "1px solid transparent",
        boxShadow: active
          ? "0 0 16px rgba(196,181,253,0.14), inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.10)"
          : "none",
        color: active ? LAV_MID : hov ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.24)",
        transform: hov && !active ? "translateY(-1px)" : "translateY(0)",
      }}>
      <Icon d={I[iKey]} size={17} />
    </button>
  );
}

// ─── ActionBtn ────────────────────────────────────────────────────────────────
interface ActionBtnProps { iKey: string; label: string; }

function ActionBtn({ iKey, label }: ActionBtnProps) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
      <div style={{
        width: 58, height: 58, borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.20s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pressed
          ? "translateY(1px) scale(0.97)"
          : hov ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        // Top-down light gradient: clearly brighter at top (catches overhead light)
        background: hov
          ? "linear-gradient(175deg, rgba(240,235,255,0.18) 0%, rgba(220,210,255,0.11) 35%, rgba(196,181,253,0.07) 70%, rgba(130,108,210,0.05) 100%)"
          : "linear-gradient(175deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 100%)",
        border: hov
          ? "1px solid rgba(228,220,255,0.32)"
          : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hov
          ? [
              // Lavender outer glow
              "0 0 22px rgba(196,181,253,0.18)",
              "0 0 8px rgba(196,181,253,0.10)",
              // Drop shadow for lift illusion
              "0 10px 28px rgba(0,0,0,0.44)",
              "0 4px 10px rgba(0,0,0,0.26)",
              // Inner top highlight — key detail: simulates top-down light
              "inset 0 2px 0 rgba(255,255,255,0.22)",
              "inset 0 1px 0 rgba(240,235,255,0.16)",
              // Inner bottom shadow — depth
              "inset 0 -1.5px 0 rgba(0,0,0,0.18)",
            ].join(", ")
          : [
              "0 2px 12px rgba(0,0,0,0.30)",
              "0 1px 4px rgba(0,0,0,0.18)",
              // Resting inner highlight — always present, just softer
              "inset 0 1.5px 0 rgba(255,255,255,0.13)",
              "inset 0 -1px 0 rgba(0,0,0,0.12)",
            ].join(", "),
        color: hov ? "rgba(232,224,255,0.96)" : "rgba(255,255,255,0.62)",
      }}>
        <Icon d={I[iKey]} size={20} />
      </div>
      <span style={{
        fontSize: 12, letterSpacing: "0.025em", fontFamily: SANS,
        color: hov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.34)",
        transition: "color 0.18s ease",
      }}>
        {label}
      </span>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WalletDashboard() {
  const [tab, setTab]         = useState<"assets" | "activity">("assets");
  const [copied, setCopy]     = useState(false);
  const [nav, setNav]         = useState("home");
  const [cardHov, setCardHov] = useState(false);

  const copy = () => { setCopy(true); setTimeout(() => setCopy(false), 1800); };

  return (
    <div style={{
      display: "flex", height: "100vh", overflow: "hidden",
      // Refined background: radial — lighter top-center, dark edges
      background: "radial-gradient(ellipse 90% 55% at 50% 0%, #131020 0%, #0e0c18 30%, #0b0910 58%, #080810 100%)",
      fontFamily: SANS, position: "relative",
    }}>

      {/* ── Scene lighting ───────────────────────────────────────────────── */}

      {/* Top-edge hairline — light source bleed */}
      <div style={{
        position: "fixed", inset: "0 0 auto 0", height: 1, zIndex: 30, pointerEvents: "none",
        background: "linear-gradient(90deg, transparent 0%, rgba(220,210,255,0.45) 35%, rgba(244,240,255,0.72) 50%, rgba(220,210,255,0.45) 65%, transparent 100%)",
      }} />

      {/* Wide soft ambient from top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 440, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(200,190,255,0.042) 0%, rgba(196,181,253,0.014) 50%, transparent 100%)",
      }} />

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside style={{
        position: "relative", zIndex: 10,
        width: 70, flexShrink: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 28, paddingBottom: 28, gap: 6,
        background: "linear-gradient(180deg, rgba(255,255,255,0.030) 0%, rgba(255,255,255,0.016) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.055)",
        boxShadow: "inset -1px 0 0 rgba(196,181,253,0.04)",
      }}>
        {/* Logo */}
        <div style={{
          width: 36, height: 36, borderRadius: 12, marginBottom: 30,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(145deg, rgba(216,205,255,0.24) 0%, rgba(167,139,250,0.13) 100%)",
          border: "1px solid rgba(216,205,255,0.26)",
          boxShadow: "0 0 20px rgba(196,181,253,0.16), inset 0 1.5px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.12)",
        }}>
          <div style={{ width: 15, height: 15, borderRadius: 5, background: "linear-gradient(135deg, rgba(248,246,255,0.92) 0%, rgba(196,181,253,0.75) 100%)" }} />
        </div>

        <SideBtn iKey="home"    active={nav==="home"}     onClick={() => setNav("home")}     label="Home"     />
        <SideBtn iKey="explore" active={nav==="explore"}  onClick={() => setNav("explore")}  label="Explore"  />
        <SideBtn iKey="swap"    active={nav==="swap"}     onClick={() => setNav("swap")}     label="Swap"     />
        <div style={{ marginTop: "auto" }}>
          <SideBtn iKey="cog"   active={nav==="settings"} onClick={() => setNav("settings")} label="Settings" />
        </div>
      </aside>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, zIndex: 10, overflow: "hidden" }}>

        {/* Topbar */}
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

          <button onClick={copy} style={{
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

        {/* Scroll body */}
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div style={{ maxWidth: 468, margin: "0 auto", padding: "0 22px 88px" }}>

            {/* ── Balance hero ─────────────────────────────────────────── */}
            <div style={{ textAlign: "center", paddingTop: 62, paddingBottom: 54, position: "relative" }}>

              <p style={{
                fontSize: 11, fontWeight: 500,
                color: "rgba(255,255,255,0.38)",
                textTransform: "uppercase", letterSpacing: "0.22em",
                marginBottom: 24, position: "relative",
              }}>
                Total Balance
              </p>

              {/* Number — enhanced gradient + subtle drop-shadow glow */}
              <div style={{ position: "relative", display: "inline-flex", alignItems: "baseline", gap: 4 }}>
                <span style={{
                  fontSize: "clamp(4rem, 9vw, 6rem)",
                  lineHeight: 1, fontWeight: 600,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                  // Richer gradient: pure near-white at top, lavender at bottom
                  background: "linear-gradient(175deg, rgba(255,253,255,1) 0%, rgba(238,230,255,0.96) 42%, rgba(216,205,255,0.90) 66%, rgba(196,181,253,0.80) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  // Soft glow — filter drop-shadow works on gradient text
                  filter: "drop-shadow(0 0 20px rgba(212,198,255,0.26)) drop-shadow(0 0 7px rgba(196,181,253,0.16))",
                }}>
                  $37,886
                </span>
                <span style={{
                  fontSize: "clamp(1.7rem, 3.6vw, 2.5rem)",
                  lineHeight: 1, fontWeight: 500,
                  color: "rgba(196,181,253,0.20)",
                  paddingBottom: 4,
                }}>
                  .55
                </span>
              </div>

              {/* Change pill */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                marginTop: 20, padding: "7px 16px", borderRadius: 100,
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.16)",
                boxShadow: "0 0 14px rgba(52,211,153,0.07), inset 0 1px 0 rgba(110,231,183,0.08)",
              }}>
                <Icon d={I.up} size={11} style={{ color: "rgba(110,231,183,0.75)" }} />
                <span style={{ fontSize: 13, fontFamily: MONO, color: "rgba(110,231,183,0.78)" }}>
                  +$942.20 · +2.6% today
                </span>
              </div>
            </div>

            {/* ── Actions ──────────────────────────────────────────────── */}
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 56 }}>
              {[
                { iKey: "send",    label: "Send"    },
                { iKey: "receive", label: "Receive" },
                { iKey: "swap",    label: "Swap"    },
                { iKey: "buy",     label: "Buy"     },
              ].map(p => <ActionBtn key={p.label} {...p} />)}
            </div>

            {/* ── Tab bar ──────────────────────────────────────────────── */}
            <div style={{
              display: "flex", gap: 4, padding: "5px",
              borderRadius: 17, marginBottom: 10,
              background: "rgba(255,255,255,0.026)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.06)",
            }}>
              {(["assets", "activity"] as const).map(t => {
                const active = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: "11px 0",
                    borderRadius: 12,
                    fontSize: 14, fontWeight: 500,
                    textTransform: "capitalize", fontFamily: SANS,
                    cursor: "pointer", transition: "all 0.20s ease",
                    color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.33)",
                    background: active
                      ? "linear-gradient(175deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.055) 100%)"
                      : "transparent",
                    border: active ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
                    boxShadow: active
                      ? [
                          "inset 0 1.5px 0 rgba(255,255,255,0.12)",
                          "inset 0 -1px 0 rgba(0,0,0,0.10)",
                          "0 2px 10px rgba(0,0,0,0.22)",
                          "0 0 16px rgba(196,181,253,0.07)",
                        ].join(", ")
                      : "none",
                  }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* ── Content card — refined glass surface ─────────────────── */}
            <div
              onMouseEnter={() => setCardHov(true)}
              onMouseLeave={() => setCardHov(false)}
              style={{
                borderRadius: 22,
                // Richer glass: more pronounced gradient top-to-bottom
                background: "linear-gradient(175deg, rgba(255,255,255,0.072) 0%, rgba(255,255,255,0.038) 50%, rgba(255,255,255,0.020) 100%)",
                border: `1px solid ${cardHov ? "rgba(255,255,255,0.12)" : BORDER_1}`,
                overflow: "hidden",
                // Micro-interaction: subtle lift on hover
                transform: cardHov ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 0.20s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.20s ease, border-color 0.20s ease",
                boxShadow: cardHov
                  ? [
                      // Inner top highlight — glass edge catches light
                      "inset 0 1.5px 0 rgba(255,255,255,0.13)",
                      // Inner bottom shadow — depth inside the glass
                      "inset 0 -2px 8px rgba(0,0,0,0.10)",
                      // Stronger drop shadow on hover (card is lifted)
                      "0 28px 70px rgba(0,0,0,0.44)",
                      "0 8px 24px rgba(0,0,0,0.26)",
                      // Faint lavender outer border glow
                      "0 0 0 1px rgba(196,181,253,0.10)",
                      "0 0 24px rgba(196,181,253,0.07)",
                    ].join(", ")
                  : [
                      "inset 0 1.5px 0 rgba(255,255,255,0.09)",
                      "inset 0 -1px 0 rgba(0,0,0,0.08)",
                      "0 20px 60px rgba(0,0,0,0.38)",
                      "0 4px 16px rgba(0,0,0,0.22)",
                      "0 0 0 0.5px rgba(196,181,253,0.06)",
                    ].join(", "),
              }}>
              {tab === "assets"
                ? TOKENS.map((tk, i) => <TokenRow key={tk.symbol} token={tk} isLast={i === TOKENS.length - 1} />)
                : TXS.map((tx, i) => <TxRow key={i} tx={tx} isLast={i === TXS.length - 1} />)
              }
            </div>

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