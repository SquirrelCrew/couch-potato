import { motion } from 'framer-motion';

/**
 * The Couch Potato character.
 * Variants: default, wave, sit, lie, stand, walk, headstand, fly, happy, think
 */
export default function Potato({ variant = 'default', size = 120, style = {}, className = '' }) {
  const s = size;
  const bodyRx = s * 0.34;
  const bodyRy = s * 0.37;
  const cx = s * 0.5;
  const cy = s * 0.52;

  // Eyes
  const eyeL = { x: cx - s * 0.09, y: cy - s * 0.08 };
  const eyeR = { x: cx + s * 0.09, y: cy - s * 0.08 };
  const eyeR_size = s * 0.032;

  // Mouth
  const mouthY = cy + s * 0.07;

  // Arms & legs offsets
  const armLen = s * 0.12;
  const legLen = s * 0.13;

  const getVariantTransform = () => {
    switch (variant) {
      case 'wave': return {};
      case 'sit': return {};
      case 'lie': return { rotate: 90 };
      case 'headstand': return { rotate: 180 };
      case 'fly': return { y: -10 };
      case 'happy': return {};
      case 'think': return {};
      default: return {};
    }
  };

  const getMouth = () => {
    const w = s * 0.1;
    switch (variant) {
      case 'happy':
      case 'wave':
        return `M${cx - w} ${mouthY} Q${cx} ${mouthY + s * 0.08} ${cx + w} ${mouthY}`;
      case 'think':
        return `M${cx - w * 0.6} ${mouthY + s * 0.02} L${cx + w * 0.6} ${mouthY + s * 0.02}`;
      default:
        return `M${cx - w} ${mouthY} Q${cx} ${mouthY + s * 0.05} ${cx + w} ${mouthY}`;
    }
  };

  const getArms = () => {
    const baseL = { x: cx - bodyRx + s * 0.04, y: cy };
    const baseR = { x: cx + bodyRx - s * 0.04, y: cy };

    if (variant === 'wave') {
      return (
        <>
          <motion.line x1={baseL.x} y1={baseL.y} x2={baseL.x - armLen} y2={baseL.y + armLen * 0.5}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
          <motion.line x1={baseR.x} y1={baseR.y} x2={baseR.x + armLen} y2={baseR.y - armLen}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: `${baseR.x}px`, originY: `${baseR.y}px`, transformBox: 'fill-box' }}
          />
        </>
      );
    }

    if (variant === 'fly') {
      return (
        <>
          <line x1={baseL.x} y1={baseL.y} x2={baseL.x - armLen * 1.3} y2={baseL.y - armLen}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
          <line x1={baseR.x} y1={baseR.y} x2={baseR.x + armLen * 1.3} y2={baseR.y - armLen}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
        </>
      );
    }

    return (
      <>
        <line x1={baseL.x} y1={baseL.y} x2={baseL.x - armLen} y2={baseL.y + armLen * 0.5}
          stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
        <line x1={baseR.x} y1={baseR.y} x2={baseR.x + armLen} y2={baseR.y + armLen * 0.5}
          stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
      </>
    );
  };

  const getLegs = () => {
    const baseL = { x: cx - s * 0.08, y: cy + bodyRy - s * 0.04 };
    const baseR = { x: cx + s * 0.08, y: cy + bodyRy - s * 0.04 };

    if (variant === 'walk') {
      return (
        <>
          <motion.line x1={baseL.x} y1={baseL.y} x2={baseL.x - s * 0.04} y2={baseL.y + legLen}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round"
            animate={{ x2: [baseL.x - s * 0.06, baseL.x + s * 0.02] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.line x1={baseR.x} y1={baseR.y} x2={baseR.x + s * 0.04} y2={baseR.y + legLen}
            stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round"
            animate={{ x2: [baseR.x + s * 0.06, baseR.x - s * 0.02] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </>
      );
    }

    if (variant === 'headstand' || variant === 'fly') return null;

    return (
      <>
        <line x1={baseL.x} y1={baseL.y} x2={baseL.x - s * 0.03} y2={baseL.y + legLen}
          stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
        <line x1={baseR.x} y1={baseR.y} x2={baseR.x + s * 0.03} y2={baseR.y + legLen}
          stroke="#5C4A2A" strokeWidth={s * 0.025} strokeLinecap="round" />
      </>
    );
  };

  const getBlushing = () => (
    <>
      <ellipse cx={eyeL.x - s * 0.02} cy={eyeL.y + s * 0.06} rx={s * 0.04} ry={s * 0.025} fill="#E8B4B8" opacity={0.45} />
      <ellipse cx={eyeR.x + s * 0.02} cy={eyeR.y + s * 0.06} rx={s * 0.04} ry={s * 0.025} fill="#E8B4B8" opacity={0.45} />
    </>
  );

  const variantTransform = getVariantTransform();

  return (
    <motion.svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      style={{ overflow: 'visible', ...style }}
      className={className}
      animate={{
        ...variantTransform,
        ...(variant === 'fly' ? { y: [-10, -18, -10] } : {}),
      }}
      transition={{
        duration: variant === 'fly' ? 2 : 0.3,
        repeat: variant === 'fly' ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {/* Shadow */}
      {variant !== 'fly' && variant !== 'headstand' && (
        <ellipse cx={cx} cy={cy + bodyRy + s * 0.06} rx={bodyRx * 0.7} ry={s * 0.02}
          fill="#5C4A2A" opacity={0.1} />
      )}

      {/* Body */}
      <ellipse cx={cx} cy={cy} rx={bodyRx} ry={bodyRy}
        fill="#C4A265" stroke="#5C4A2A" strokeWidth={s * 0.02} />

      {/* Potato spots */}
      <circle cx={cx - s * 0.15} cy={cy + s * 0.12} r={s * 0.02} fill="#B89555" opacity={0.5} />
      <circle cx={cx + s * 0.18} cy={cy - s * 0.05} r={s * 0.015} fill="#B89555" opacity={0.4} />
      <circle cx={cx + s * 0.05} cy={cy + s * 0.2} r={s * 0.012} fill="#B89555" opacity={0.3} />

      {/* Arms */}
      {getArms()}

      {/* Legs */}
      {getLegs()}

      {/* Eyes */}
      <circle cx={eyeL.x} cy={eyeL.y} r={eyeR_size} fill="#5C4A2A" />
      <circle cx={eyeR.x} cy={eyeR.y} r={eyeR_size} fill="#5C4A2A" />

      {/* Eye shine */}
      <circle cx={eyeL.x + s * 0.008} cy={eyeL.y - s * 0.008} r={s * 0.01} fill="white" opacity={0.7} />
      <circle cx={eyeR.x + s * 0.008} cy={eyeR.y - s * 0.008} r={s * 0.01} fill="white" opacity={0.7} />

      {/* Blush */}
      {getBlushing()}

      {/* Mouth */}
      <path d={getMouth()} stroke="#5C4A2A" strokeWidth={s * 0.02} fill="none" strokeLinecap="round" />

      {/* Thinking bubble for think variant */}
      {variant === 'think' && (
        <>
          <circle cx={cx + bodyRx - s * 0.02} cy={cy - bodyRy + s * 0.04} r={s * 0.02} fill="#5C4A2A" opacity={0.2} />
          <circle cx={cx + bodyRx + s * 0.04} cy={cy - bodyRy - s * 0.02} r={s * 0.03} fill="#5C4A2A" opacity={0.15} />
          <circle cx={cx + bodyRx + s * 0.1} cy={cy - bodyRy - s * 0.08} r={s * 0.04} fill="#5C4A2A" opacity={0.1} />
        </>
      )}
    </motion.svg>
  );
}

/** Mini potato for progress indicator */
export function MiniPotato({ filled = false, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ overflow: 'visible' }}>
      <ellipse cx="12" cy="13" rx="8" ry="9"
        fill={filled ? '#C4A265' : 'none'}
        stroke={filled ? '#5C4A2A' : '#D4CCBC'}
        strokeWidth="1.5"
      />
      {filled && (
        <>
          <circle cx="10" cy="11" r="1" fill="#5C4A2A" />
          <circle cx="14" cy="11" r="1" fill="#5C4A2A" />
          <path d="M10 15 Q12 17 14 15" stroke="#5C4A2A" strokeWidth="1" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
