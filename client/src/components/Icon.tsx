import type { CSSProperties } from "react";

interface IconProps {
  d: string;
  size?: number;
  style?: CSSProperties;
}

export const Icon = ({ d, size = 20, style = {} }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0, ...style }}>
    <path d={d} />
  </svg>
);