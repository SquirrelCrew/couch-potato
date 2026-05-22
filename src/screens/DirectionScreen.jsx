import { motion } from 'framer-motion';
import Potato from '../components/Potato';

export default function DirectionScreen({ value, onChange }) {
  const options = [
    { id: 'raus', label: 'Raus', emoji: '🌿', desc: 'Frischluft-Modus' },
    { id: 'rein', label: 'Rein', emoji: '🛋️', desc: 'Gemütlichkeits-Modus' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      width: '100%',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Potato variant="think" size={100} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.8rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
        }}
      >
        Wohin?
      </motion.h2>

      <div style={{
        display: 'flex',
        gap: '16px',
        width: '100%',
        maxWidth: '360px',
      }}>
        {options.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(opt.id)}
            style={{
              flex: 1,
              padding: '28px 16px',
              borderRadius: '24px',
              border: `2.5px solid ${value === opt.id ? 'var(--accent-dark)' : 'var(--border)'}`,
              background: value === opt.id ? 'var(--accent)' : 'var(--bg-card)',
              color: value === opt.id ? 'white' : 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: value === opt.id
                ? '0 8px 24px rgba(196, 162, 101, 0.3)'
                : '0 2px 8px var(--shadow)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '2.4rem' }}>{opt.emoji}</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 700,
            }}>
              {opt.label}
            </span>
            <span style={{
              fontSize: '0.8rem',
              opacity: 0.7,
            }}>
              {opt.desc}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
