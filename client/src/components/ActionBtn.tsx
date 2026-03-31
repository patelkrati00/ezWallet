import { useState } from "react";
import { I } from "../types";
import Icon from "./Icon";
import { SANS } from "../constants/data";

interface ActionBtnProps {
  iKey: string;
  label: string;
  onClick?: () => void;
}

export default function ActionBtn({ iKey, label, onClick }: ActionBtnProps) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}
    >
      <div style={{
        width: 58, height: 58, borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.20s cubic-bezier(0.34,1.56,0.64,1)",
        transform: pressed
          ? "translateY(1px) scale(0.97)"
          : hov ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        background: hov
          ? "linear-gradient(175deg, rgba(240,235,255,0.18) 0%, rgba(220,210,255,0.11) 35%, rgba(196,181,253,0.07) 70%, rgba(130,108,210,0.05) 100%)"
          : "linear-gradient(175deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.04) 100%)",
        border: hov ? "1px solid rgba(228,220,255,0.32)" : "1px solid rgba(255,255,255,0.12)",
        boxShadow: hov
          ? "0 0 22px rgba(196,181,253,0.18), 0 0 8px rgba(196,181,253,0.10), 0 10px 28px rgba(0,0,0,0.44), 0 4px 10px rgba(0,0,0,0.26), inset 0 2px 0 rgba(255,255,255,0.22), inset 0 1px 0 rgba(240,235,255,0.16), inset 0 -1.5px 0 rgba(0,0,0,0.18)"
          : "0 2px 12px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.18), inset 0 1.5px 0 rgba(255,255,255,0.13), inset 0 -1px 0 rgba(0,0,0,0.12)",
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