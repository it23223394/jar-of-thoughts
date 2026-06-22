export default function JarSVG({ color, count, isOpen = false, width = 80, height = 110 }) {
  const fillLevel = Math.min(0.82, Math.max(0.05, count * 0.11))
  const jarBodyTop = 32
  const jarBodyBottom = height - 8
  const jarBodyHeight = jarBodyBottom - jarBodyTop
  const fillHeight = Math.round(jarBodyHeight * fillLevel)
  const fillY = jarBodyBottom - fillHeight
  const jarId = `jar-${color.replace('#', '')}-${width}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Jar body clip path */}
        <clipPath id={`body-${jarId}`}>
          <path d={`
            M ${width * 0.18} ${jarBodyTop}
            Q ${width * 0.15} ${jarBodyTop + 4} ${width * 0.12} ${jarBodyTop + 10}
            L ${width * 0.08} ${jarBodyBottom - 6}
            Q ${width * 0.08} ${jarBodyBottom} ${width * 0.5} ${jarBodyBottom}
            Q ${width * 0.92} ${jarBodyBottom} ${width * 0.92} ${jarBodyBottom - 6}
            L ${width * 0.88} ${jarBodyTop + 10}
            Q ${width * 0.85} ${jarBodyTop + 4} ${width * 0.82} ${jarBodyTop}
            Z
          `} />
        </clipPath>

        {/* Glass gradient */}
        <linearGradient id={`glass-${jarId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>

        {/* Fill gradient */}
        <linearGradient id={`fill-${jarId}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.7" />
          <stop offset="50%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.65" />
        </linearGradient>

        {/* Lid gradient */}
        <linearGradient id={`lid-${jarId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="100%" stopColor="#5C4A2A" />
        </linearGradient>

        {/* Shine gradient */}
        <linearGradient id={`shine-${jarId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* === JAR BODY === */}

      {/* Body shadow */}
      <path
        d={`
          M ${width * 0.18} ${jarBodyTop}
          Q ${width * 0.15} ${jarBodyTop + 4} ${width * 0.12} ${jarBodyTop + 10}
          L ${width * 0.08} ${jarBodyBottom - 6}
          Q ${width * 0.08} ${jarBodyBottom} ${width * 0.5} ${jarBodyBottom}
          Q ${width * 0.92} ${jarBodyBottom} ${width * 0.92} ${jarBodyBottom - 6}
          L ${width * 0.88} ${jarBodyTop + 10}
          Q ${width * 0.85} ${jarBodyTop + 4} ${width * 0.82} ${jarBodyTop}
          Z
        `}
        fill="rgba(0,0,0,0.08)"
        transform="translate(2, 3)"
      />

      {/* Body base (glass color) */}
      <path
        d={`
          M ${width * 0.18} ${jarBodyTop}
          Q ${width * 0.15} ${jarBodyTop + 4} ${width * 0.12} ${jarBodyTop + 10}
          L ${width * 0.08} ${jarBodyBottom - 6}
          Q ${width * 0.08} ${jarBodyBottom} ${width * 0.5} ${jarBodyBottom}
          Q ${width * 0.92} ${jarBodyBottom} ${width * 0.92} ${jarBodyBottom - 6}
          L ${width * 0.88} ${jarBodyTop + 10}
          Q ${width * 0.85} ${jarBodyTop + 4} ${width * 0.82} ${jarBodyTop}
          Z
        `}
        fill="rgba(220, 240, 255, 0.25)"
        stroke="rgba(180,210,240,0.5)"
        strokeWidth="1"
      />

      {/* Liquid fill */}
      {count > 0 && (
        <g clipPath={`url(#body-${jarId})`}>
          <rect
            x={width * 0.08}
            y={fillY}
            width={width * 0.84}
            height={fillHeight + 10}
            fill={`url(#fill-${jarId})`}
          />
          {/* Liquid surface wave */}
          <path
            d={`
              M ${width * 0.08} ${fillY}
              Q ${width * 0.3} ${fillY - 4} ${width * 0.5} ${fillY}
              Q ${width * 0.7} ${fillY + 4} ${width * 0.92} ${fillY}
            `}
            fill="none"
            stroke={color}
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* Glass overlay */}
      <path
        d={`
          M ${width * 0.18} ${jarBodyTop}
          Q ${width * 0.15} ${jarBodyTop + 4} ${width * 0.12} ${jarBodyTop + 10}
          L ${width * 0.08} ${jarBodyBottom - 6}
          Q ${width * 0.08} ${jarBodyBottom} ${width * 0.5} ${jarBodyBottom}
          Q ${width * 0.92} ${jarBodyBottom} ${width * 0.92} ${jarBodyBottom - 6}
          L ${width * 0.88} ${jarBodyTop + 10}
          Q ${width * 0.85} ${jarBodyTop + 4} ${width * 0.82} ${jarBodyTop}
          Z
        `}
        fill={`url(#glass-${jarId})`}
      />

      {/* Glass outline */}
      <path
        d={`
          M ${width * 0.18} ${jarBodyTop}
          Q ${width * 0.15} ${jarBodyTop + 4} ${width * 0.12} ${jarBodyTop + 10}
          L ${width * 0.08} ${jarBodyBottom - 6}
          Q ${width * 0.08} ${jarBodyBottom} ${width * 0.5} ${jarBodyBottom}
          Q ${width * 0.92} ${jarBodyBottom} ${width * 0.92} ${jarBodyBottom - 6}
          L ${width * 0.88} ${jarBodyTop + 10}
          Q ${width * 0.85} ${jarBodyTop + 4} ${width * 0.82} ${jarBodyTop}
          Z
        `}
        fill="none"
        stroke="rgba(180,210,240,0.7)"
        strokeWidth="1.2"
      />

      {/* Left shine streak */}
      <path
        d={`M ${width * 0.22} ${jarBodyTop + 8} Q ${width * 0.2} ${jarBodyTop + jarBodyHeight * 0.4} ${width * 0.22} ${jarBodyTop + jarBodyHeight * 0.65}`}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small right shine */}
      <path
        d={`M ${width * 0.75} ${jarBodyTop + 12} Q ${width * 0.74} ${jarBodyTop + 20} ${width * 0.75} ${jarBodyTop + 30}`}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom rim */}
      <ellipse
        cx={width * 0.5}
        cy={jarBodyBottom}
        rx={width * 0.42}
        ry="3"
        fill="rgba(0,0,0,0.06)"
      />

      {/* === NECK === */}
      <rect
        x={width * 0.22}
        y={jarBodyTop - 8}
        width={width * 0.56}
        height="10"
        rx="2"
        fill="rgba(200,230,255,0.3)"
        stroke="rgba(180,210,240,0.6)"
        strokeWidth="1"
      />

      {/* === LID === */}
      <g
        style={{
          transform: isOpen ? `translateY(-18px) rotate(-15deg)` : 'translateY(0px)',
          transformOrigin: `${width * 0.5}px ${jarBodyTop - 10}px`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Lid shadow */}
        <rect
          x={width * 0.18}
          y={jarBodyTop - 18}
          width={width * 0.64}
          height="12"
          rx="4"
          fill="rgba(0,0,0,0.1)"
          transform="translate(1,2)"
        />
        {/* Lid body */}
        <rect
          x={width * 0.18}
          y={jarBodyTop - 18}
          width={width * 0.64}
          height="12"
          rx="4"
          fill={`url(#lid-${jarId})`}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="0.8"
        />
        {/* Lid shine */}
        <rect
          x={width * 0.2}
          y={jarBodyTop - 17}
          width={width * 0.25}
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.2)"
        />
        {/* Lid knob */}
        <rect
          x={width * 0.38}
          y={jarBodyTop - 22}
          width={width * 0.24}
          height="6"
          rx="3"
          fill="#6B5230"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="0.5"
        />
      </g>

      {/* === LABEL === */}
      <rect
        x={width * 0.2}
        y={jarBodyTop + jarBodyHeight * 0.25}
        width={width * 0.6}
        height={jarBodyHeight * 0.3}
        rx="4"
        fill="rgba(255,250,240,0.7)"
        stroke="rgba(180,150,100,0.3)"
        strokeWidth="0.8"
      />
    </svg>
  )
}