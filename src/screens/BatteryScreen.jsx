import { motion } from 'framer-motion';
import Potato from '../components/Potato';

const levels = [
  { value: 0, label: 'Leer', desc: 'Bloß keine Menschen', emoji: '😶' },
  { value: 1, label: 'Niedrig', desc: 'Ein Mensch geht vielleicht', emoji: '😐' },
  { value: 2, label: 'Okay', desc: 'Normale Dosis Gesellschaft', emoji: '🙂' },
  { value: 3, label: 'Voll', desc: 'Party-Kartoffel-Modus!', emoji: '🥳' },
];

export default function BatteryScreen({ value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '28px',
      width: '100%',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Potato variant={value === 3 ? 'happy' : value === 0 ? 'think' : 'default'} size={90} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.2rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.2,
        }}
      >
        Wie geht's deiner<br />Social Battery?
      </motion.h2>

      {/* Battery visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          width: '80px',
          height: '180px',
          borderRadius: '12px',
          border: '3px solid var(--accent-dark)',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-card)',
        }}
      >
        {/* Battery tip */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '8px',
          background: 'var(--accent-dark)',
          borderRadius: '4px 4px 0 0',
        }} />

        {/* Fill level */}
        <motion.div
          animate={{
            height: value !== null ? `${((value + 1) / 4) * 100}%` : '0%',
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: value === 0 ? '#E88' :
              value === 1 ? '#E8C468' :
                value === 2 ? '#A8C5A0' : '#7BC47B',
            borderRadius: '0 0 9px 9px',
          }}
        />

        {/* Level marks */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            position: 'absolute',
            bottom: `${(i / 4) * 100}%`,
            left: '8px',
            right: '8px',
            height: '1px',
            background: 'var(--accent-dark)',
            opacity: 0.15,
          }} />
        ))}
      </motion.div>

      {/* Options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '320px',
      }}>
        {levels.map((level, i) => (
          <motion.button
            key={level.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(level.value)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              borderRadius: '16px',
              border: `2px solid ${value === level.value ? 'var(--accent-dark)' : 'var(--border)'}`,
              background: value === level.value ? 'var(--accent)' : 'var(--bg-card)',
              color: value === level.value ? 'white' : 'var(--text)',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: value === level.value
                ? '0 4px 16px rgba(196, 162, 101, 0.3)'
                : '0 1px 4px var(--shadow)',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>{level.emoji}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 700,
              }}>
                {level.label}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                {level.desc}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
