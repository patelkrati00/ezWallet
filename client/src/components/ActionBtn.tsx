import { useState } from "react";
import { Icon } from "./Icon";
import { ICONS } from "../constants/icons";

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
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}>
      <div style={{
        width: 58, height: 58, borderRadius: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: pressed ? "scale(0.97)" : hov ? "scale(1.07)" : "scale(1)",
        background: "rgba(255,255,255,0.08)",
      }}>
        <Icon d={ICONS[iKey]} size={20} />
      </div>

      <span style={{ fontSize: 12, color: "#aaa" }}>
        {label}
      </span>
    </button>
  );
}