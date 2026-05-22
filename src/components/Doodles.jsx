import { motion } from 'framer-motion';

/**
 * Subtle hand-drawn decorative elements that float in the background.
 */
export function BackgroundDoodles() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      opacity: 0.06,
    }}>
      {/* Squiggly lines */}
      <svg style={{ position: 'absolute', top: '10%', right: '-5%', width: '200px', height: '200px' }} viewBox="0 0 200 200">
        <path d="M20,100 Q60,60 100,100 T180,100" fill="none" stroke="var(--accent-dark)" strokeWidth="2" />
      </svg>

      <svg style={{ position: 'absolute', bottom: '15%', left: '-3%', width: '150px', height: '150px' }} viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="50" fill="none" stroke="var(--accent-dark)" strokeWidth="1.5" strokeDasharray="8 6" />
      </svg>

      <svg style={{ position: 'absolute', top: '40%', left: '5%', width: '80px', height: '80px' }} viewBox="0 0 80 80">
        <path d="M10,40 L40,10 L70,40 L40,70 Z" fill="none" stroke="var(--accent-dark)" strokeWidth="1.5" />
      </svg>

      {/* Small stars */}
      <motion.svg
        style={{ position: 'absolute', top: '25%', right: '12%', width: '30px', height: '30px' }}
        viewBox="0 0 30 30"
        animate={{ rotate: 360, opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M15,2 L18,12 L28,12 L20,18 L23,28 L15,22 L7,28 L10,18 L2,12 L12,12 Z"
          fill="none" stroke="var(--accent-dark)" strokeWidth="1" />
      </motion.svg>

      <svg style={{ position: 'absolute', bottom: '30%', right: '8%', width: '60px', height: '60px' }} viewBox="0 0 60 60">
        <path d="M10,30 Q30,10 50,30 Q30,50 10,30" fill="none" stroke="var(--accent-dark)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Squiggly divider line.
 */
export function SquigglyLine({ width = 200, color = 'var(--border)' }) {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} style={{ overflow: 'visible' }}>
      <path
        d={`M0,6 ${Array.from({ length: Math.ceil(width / 20) }, (_, i) =>
          `Q${i * 20 + 10},${i % 2 === 0 ? 0 : 12} ${(i + 1) * 20},6`
        ).join(' ')}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
