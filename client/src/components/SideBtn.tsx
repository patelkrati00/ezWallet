import { useState } from "react";
import { I } from "../types";
import Icon from "./Icon";
import { LAV_MID } from "../constants/data";

interface SideBtnProps {
  iKey: string;
  active: boolean;
  onClick: () => void;
  label: string;
}

export default function SideBtn({ iKey, active, onClick, label }: SideBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      title={label}
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
      }}
    >
      <Icon d={I[iKey]} size={17} />
    </button>
  );
}