export default function JarSVG({ color, count }) {
  const fill = Math.min(0.85, Math.max(0.06, count * 0.12))
  const bodyH = 72
  const fillH = Math.round(bodyH * fill)
  const fillY = 100 - fillH

  return (
    <svg width="64" height="90" viewBox="0 0 64 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lid */}
      <rect x="18" y="4" width="28" height="10" rx="3" fill={color} opacity="0.6" stroke="rgba(44,36,22,0.2)" strokeWidth="0.8"/>
      {/* Jar body clip */}
      <clipPath id={`jar-${color.replace('#','')}`}>
        <path d="M10 20 Q10 16 14 15 L50 15 Q54 16 54 20 L58 78 Q58 84 32 86 Q6 84 6 78 Z"/>
      </clipPath>
      {/* Fill */}
      <rect
        x="6" y={fillY - 10} width="52" height={fillH + 20}
        fill={color} opacity="0.45"
        clipPath={`url(#jar-${color.replace('#','')})`}
      />
      {/* Jar outline */}
      <path
        d="M10 20 Q10 16 14 15 L50 15 Q54 16 54 20 L58 78 Q58 84 32 86 Q6 84 6 78 Z"
        fill="rgba(255,253,248,0.3)" stroke="rgba(44,36,22,0.2)" strokeWidth="1"
      />
      {/* Shine */}
      <path d="M14 22 Q13 40 15 58" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}