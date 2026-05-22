import { motion } from 'framer-motion';
import Potato from '../components/Potato';

const positions = [
  { id: 'stehen', label: 'Stehen', variant: 'default', desc: 'Aufrecht & bereit' },
  { id: 'sitzen', label: 'Sitzen', variant: 'sit', desc: 'Gemütlich platziert' },
  { id: 'liegen', label: 'Liegen', variant: 'lie', desc: 'Maximal horizontal' },
  { id: 'gehen', label: 'Gehen', variant: 'walk', desc: 'In Bewegung' },
  { id: 'kopfstand', label: 'Kopfstand', variant: 'headstand', desc: 'Perspektivwechsel!' },
  { id: 'fliegen', label: 'Fliegen', variant: 'fly', desc: 'Grenzenlos & frei' },
];

export default function PositionScreen({ value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      width: '100%',
      textAlign: 'center',
    }}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.2,
        }}
      >
        Welche Position fühlt sich<br />heute richtig an?
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '360px',
      }}>
        {positions.map((pos, i) => (
          <motion.button
            key={pos.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(pos.id)}
            style={{
              padding: '16px 12px',
              borderRadius: '20px',
              border: `2.5px solid ${value === pos.id ? 'var(--accent-dark)' : 'var(--border)'}`,
              background: value === pos.id ? 'var(--accent)' : 'var(--bg-card)',
              color: value === pos.id ? 'white' : 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              boxShadow: value === pos.id
                ? '0 6px 20px rgba(196, 162, 101, 0.3)'
                : '0 2px 6px var(--shadow)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Potato variant={pos.variant} size={56} />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 700,
            }}>
              {pos.label}
            </span>
            <span style={{ fontSize: '0.72rem', opacity: 0.65 }}>
              {pos.desc}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
