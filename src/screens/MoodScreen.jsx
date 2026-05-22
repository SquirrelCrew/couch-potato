import { motion } from 'framer-motion';
import Potato from '../components/Potato';

export default function MoodScreen({ mood, onMoodChange }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      width: '100%',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Potato variant="think" size={80} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.2,
        }}
      >
        Wie ist die Stimmung?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          color: 'var(--text-light)',
          fontSize: '0.85rem',
        }}
      >
        Schieb die Regler dahin, wo du dich gerade befindest
      </motion.p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '100%',
        maxWidth: '360px',
      }}>
        {mood.map((m, i) => (
          <MoodSlider
            key={i}
            index={i}
            leftLabel={m.label[0]}
            rightLabel={m.label[1]}
            value={m.value}
            onChange={(v) => onMoodChange(i, v)}
            delay={0.2 + i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

function MoodSlider({ leftLabel, rightLabel, value, onChange, delay, index }) {
  // Color pairs for each slider
  const colors = [
    ['#A8C5A0', '#E8C468'], // faul ↔ abenteuerlustig
    ['#B8A0C5', '#A0B8C5'], // kreativ ↔ berieselungsfreudig
    ['#E8B4B8', '#A8C5A0'], // hungrig ↔ übersättigt
    ['#A0B8C5', '#E8C468'], // ausbalanciert ↔ wirbelig
  ];

  const [cL, cR] = colors[index] || ['#ccc', '#ccc'];
  const blend = `linear-gradient(90deg, ${cL}, ${cR})`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '18px 20px 14px',
        border: '1.5px solid var(--border)',
        boxShadow: '0 2px 8px var(--shadow)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: value < 0.4 ? 700 : 400,
          color: value < 0.4 ? 'var(--accent-dark)' : 'var(--text-light)',
          transition: 'all 0.2s',
        }}>
          {leftLabel}
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: value > 0.6 ? 700 : 400,
          color: value > 0.6 ? 'var(--accent-dark)' : 'var(--text-light)',
          transition: 'all 0.2s',
        }}>
          {rightLabel}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Track background with gradient */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '6px',
          borderRadius: '3px',
          background: blend,
          transform: 'translateY(-50%)',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ width: '100%', position: 'relative', zIndex: 1 }}
        />
      </div>
    </motion.div>
  );
}
