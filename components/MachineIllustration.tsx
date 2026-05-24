export default function MachineIllustration() {
  return (
    <svg
      viewBox="0 0 400 480"
      className="relative h-full w-full"
      role="img"
      aria-label="Industrial packaging machine illustration"
    >
      <defs>
        <linearGradient id="machineBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E10600" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#7a0300" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="metal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fafafa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#27272a" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="conveyor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525B" />
          <stop offset="100%" stopColor="#27272A" />
        </linearGradient>
        <linearGradient id="bottle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d4d4d8" stopOpacity="0.9" />
        </linearGradient>
        <filter id="machineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Floor reflection */}
      <ellipse cx="200" cy="430" rx="140" ry="14" fill="#000" opacity="0.5" />

      {/* Conveyor */}
      <rect x="40" y="370" width="320" height="32" rx="6" fill="url(#conveyor)" />
      <rect x="40" y="396" width="320" height="6" fill="#0A0A0A" />
      {[...Array(10)].map((_, i) => (
        <rect
          key={i}
          x={60 + i * 30}
          y={372}
          width={18}
          height={28}
          rx={2}
          fill="#3F3F46"
        />
      ))}

      {/* Main machine body */}
      <rect x="80" y="120" width="240" height="240" rx="12" fill="url(#machineBody)" />
      <rect
        x="80"
        y="120"
        width="240"
        height="240"
        rx="12"
        fill="url(#metal)"
        opacity="0.15"
      />

      {/* Machine top hopper */}
      <path
        d="M140 120 L260 120 L240 60 L160 60 Z"
        fill="#1a1a1a"
        stroke="#3F3F46"
        strokeWidth="2"
      />
      <ellipse cx="200" cy="60" rx="40" ry="8" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
      <ellipse cx="200" cy="58" rx="36" ry="6" fill="#0A0A0A" />

      {/* HMI screen */}
      <rect x="110" y="150" width="80" height="60" rx="6" fill="#0A0A0A" stroke="#27272A" strokeWidth="1" />
      <rect x="116" y="156" width="68" height="48" rx="3" fill="#0A0A0A" />
      <rect x="120" y="160" width="20" height="3" fill="#E10600" />
      <rect x="120" y="168" width="40" height="2" fill="#fafafa" opacity="0.7" />
      <rect x="120" y="174" width="32" height="2" fill="#fafafa" opacity="0.5" />
      <rect x="120" y="180" width="48" height="2" fill="#fafafa" opacity="0.5" />
      <circle cx="172" cy="180" r="4" fill="#22c55e" filter="url(#machineGlow)" />
      <rect x="120" y="190" width="56" height="8" rx="2" fill="#27272A" />
      <rect x="120" y="190" width="38" height="8" rx="2" fill="#E10600" />

      {/* Status panel */}
      <rect x="210" y="150" width="90" height="60" rx="6" fill="#0A0A0A" stroke="#27272A" strokeWidth="1" />
      <circle cx="225" cy="165" r="5" fill="#22c55e" />
      <rect x="235" y="162" width="58" height="6" rx="1" fill="#fafafa" opacity="0.8" />
      <circle cx="225" cy="180" r="5" fill="#fbbf24" />
      <rect x="235" y="177" width="50" height="6" rx="1" fill="#fafafa" opacity="0.6" />
      <circle cx="225" cy="195" r="5" fill="#3b82f6" />
      <rect x="235" y="192" width="42" height="6" rx="1" fill="#fafafa" opacity="0.6" />

      {/* Filling head */}
      <rect x="170" y="220" width="60" height="30" rx="4" fill="#0A0A0A" stroke="#3F3F46" strokeWidth="1.5" />
      <rect x="180" y="250" width="40" height="50" rx="2" fill="#27272A" />
      <rect x="186" y="300" width="28" height="20" rx="2" fill="#52525B" />
      <rect x="194" y="320" width="12" height="50" fill="#A1A1AA" />

      {/* Side controls */}
      <circle cx="105" cy="280" r="14" fill="#0A0A0A" stroke="#52525B" strokeWidth="2" />
      <circle cx="105" cy="280" r="6" fill="#E10600" />
      <circle cx="295" cy="280" r="14" fill="#0A0A0A" stroke="#52525B" strokeWidth="2" />
      <circle cx="295" cy="280" r="6" fill="#22c55e" />

      {/* Brand line */}
      <rect x="120" y="330" width="160" height="14" rx="3" fill="#0A0A0A" />
      <text
        x="200"
        y="341"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="800"
        fill="#fafafa"
        textAnchor="middle"
        letterSpacing="3"
      >
        ALIN PACK
      </text>

      {/* Bottles on conveyor */}
      {[
        { x: 60, fill: '#ffffff' },
        { x: 110, fill: '#fef3c7' },
        { x: 160, fill: '#ffffff' },
        { x: 240, fill: '#fee2e2' },
        { x: 290, fill: '#ffffff' },
        { x: 340, fill: '#dbeafe' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x - 8} y={344} width={16} height={26} rx={2} fill="url(#bottle)" />
          <rect x={b.x - 4} y={336} width={8} height={8} rx={1} fill="#0A0A0A" />
          <rect x={b.x - 7} y={350} width={14} height={6} rx={1} fill={b.fill} opacity="0.8" />
        </g>
      ))}

      {/* Steam / activity */}
      <g opacity="0.3">
        <circle cx="200" cy="46" r="3" fill="#fafafa">
          <animate attributeName="cy" values="46;30;46" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="188" cy="40" r="2" fill="#fafafa">
          <animate attributeName="cy" values="40;24;40" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
