import { SANS } from "../constants/data";

interface TabBarProps {
  tab: "assets" | "activity";
  setTab: (t: "assets" | "activity") => void;
}

export default function TabBar({ tab, setTab }: TabBarProps) {
  return (
    <div style={{
      display: "flex", gap: 4, padding: "5px", borderRadius: 17, marginBottom: 10,
      background: "rgba(255,255,255,0.026)", border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.06)",
    }}>
      {(["assets", "activity"] as const).map(t => {
        const active = tab === t;
        return (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "11px 0", borderRadius: 12,
            fontSize: 14, fontWeight: 500, textTransform: "capitalize", fontFamily: SANS,
            cursor: "pointer", transition: "all 0.20s ease",
            color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.33)",
            background: active
              ? "linear-gradient(175deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.055) 100%)"
              : "transparent",
            border: active ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
            boxShadow: active
              ? "inset 0 1.5px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.10), 0 2px 10px rgba(0,0,0,0.22), 0 0 16px rgba(196,181,253,0.07)"
              : "none",
          }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        );
      })}
    </div>
  );
}