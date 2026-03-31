import SideBtn from "./SideBtn";

interface SidebarProps {
  nav: string;
  setNav: (v: string) => void;
}

export default function Sidebar({ nav, setNav }: SidebarProps) {
  return (
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

      <SideBtn iKey="home"    active={nav === "home"}     onClick={() => setNav("home")}     label="Home"    />
      <SideBtn iKey="explore" active={nav === "explore"}  onClick={() => setNav("explore")}  label="Explore" />
      <SideBtn iKey="swap"    active={nav === "swap"}     onClick={() => setNav("swap")}     label="Swap"    />

      <div style={{ marginTop: "auto" }}>
        <SideBtn iKey="cog" active={nav === "settings"} onClick={() => setNav("settings")} label="Settings" />
      </div>
    </aside>
  );
}