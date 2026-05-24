import type { MachineCategory } from '@/data/types';

interface MachineThumbProps {
  category: MachineCategory;
  image?: string;
  alt?: string;
}

const palettes: Record<MachineCategory, { from: string; to: string; accent: string }> = {
  filling: { from: '#fee2e2', to: '#fef2f2', accent: '#E10600' },
  sealing: { from: '#e0e7ff', to: '#eef2ff', accent: '#3b82f6' },
  capping: { from: '#fed7aa', to: '#ffedd5', accent: '#ea580c' },
  wrapping: { from: '#dcfce7', to: '#ecfdf5', accent: '#16a34a' },
  labeling: { from: '#fae8ff', to: '#fdf4ff', accent: '#a21caf' },
  line: { from: '#f1f5f9', to: '#fafafa', accent: '#475569' },
};

export default function MachineThumb({ category, image, alt }: MachineThumbProps) {
  const palette = palettes[category];

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={alt || ''}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 320 240"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${category}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <rect width="320" height="240" fill={`url(#bg-${category})`} />
      <g opacity="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={30 * i}
            x2="320"
            y2={30 * i}
            stroke="#000"
            strokeOpacity="0.03"
          />
        ))}
      </g>

      {/* Floor */}
      <ellipse cx="160" cy="210" rx="120" ry="8" fill="#000" opacity="0.08" />

      {/* Machine body */}
      <rect x="90" y="70" width="140" height="120" rx="8" fill="#1a1a1a" />
      <rect x="90" y="70" width="140" height="120" rx="8" fill={palette.accent} opacity="0.18" />
      <rect x="90" y="70" width="140" height="6" fill={palette.accent} />

      {/* Hopper */}
      <path d="M120 70 L200 70 L188 36 L132 36 Z" fill="#27272A" />
      <ellipse cx="160" cy="36" rx="28" ry="4" fill="#0A0A0A" />

      {/* HMI */}
      <rect x="104" y="86" width="46" height="34" rx="3" fill="#0A0A0A" />
      <rect x="108" y="92" width="14" height="3" fill={palette.accent} />
      <rect x="108" y="98" width="34" height="2" fill="#fafafa" opacity="0.6" />
      <rect x="108" y="103" width="28" height="2" fill="#fafafa" opacity="0.4" />
      <circle cx="136" cy="111" r="3" fill="#22c55e" />

      {/* Right panel */}
      <rect x="160" y="86" width="60" height="34" rx="3" fill="#0A0A0A" />
      <circle cx="171" cy="96" r="3" fill="#22c55e" />
      <circle cx="171" cy="106" r="3" fill="#fbbf24" />
      <rect x="180" y="93" width="34" height="3" fill="#fafafa" opacity="0.7" />
      <rect x="180" y="103" width="28" height="3" fill="#fafafa" opacity="0.5" />

      {/* Filling head / outputs */}
      <rect x="138" y="130" width="44" height="20" rx="2" fill="#0A0A0A" />
      <rect x="146" y="150" width="28" height="32" rx="2" fill="#27272A" />
      <rect x="155" y="182" width="10" height="6" fill="#52525B" />

      {/* Side knobs */}
      <circle cx="102" cy="148" r="7" fill="#0A0A0A" />
      <circle cx="102" cy="148" r="3" fill={palette.accent} />
      <circle cx="218" cy="148" r="7" fill="#0A0A0A" />
      <circle cx="218" cy="148" r="3" fill="#22c55e" />

      {/* Conveyor */}
      <rect x="40" y="190" width="240" height="14" rx="3" fill="#3F3F46" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={50 + i * 22} y={192} width={14} height={10} rx={1} fill="#52525B" />
      ))}

      {/* Bottles */}
      {[60, 100, 220, 260].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y={170} width={12} height={20} rx={1.5} fill="#fff" opacity="0.95" />
          <rect x={x - 3} y={164} width={6} height={6} rx={1} fill="#0A0A0A" />
        </g>
      ))}

      {/* Brand mini */}
      <rect x="124" y="166" width="72" height="10" rx="2" fill="#0A0A0A" />
      <text
        x="160"
        y="174"
        fontFamily="Inter, sans-serif"
        fontSize="6"
        fontWeight="800"
        fill="#fafafa"
        textAnchor="middle"
        letterSpacing="2"
      >
        ALIN PACK
      </text>
    </svg>
  );
}
