import { motion } from 'framer-motion';
import Potato from '../components/Potato';

export default function MysteryScreen({ value, onChange }) {
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
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ type: 'spring' }}
      >
        <Potato variant="wave" size={110} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.2rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.2,
        }}
      >
        Bock auf ein bisschen<br />Mystery? ✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        style={{
          color: 'var(--text-light)',
          fontSize: '0.9rem',
          maxWidth: '300px',
          lineHeight: 1.6,
        }}
      >
        Wenn ja, erlaube ich mir ein paar... ungewöhnlichere Vorschläge. Vielleicht mit Kostüm. Oder rückwärts. Wer weiß.
      </motion.p>

      <div style={{
        display: 'flex',
        gap: '16px',
        width: '100%',
        maxWidth: '320px',
      }}>
        {[
          { val: true, label: 'Ja!', emoji: '🎭', desc: 'Überrasch mich!' },
          { val: false, label: 'Nein', emoji: '🧘', desc: 'Lieber normal' },
        ].map((opt, i) => (
          <motion.button
            key={String(opt.val)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(opt.val)}
            style={{
              flex: 1,
              padding: '28px 16px',
              borderRadius: '24px',
              border: `2.5px solid ${value === opt.val ? 'var(--accent-dark)' : 'var(--border)'}`,
              background: value === opt.val
                ? (opt.val ? 'linear-gradient(135deg, var(--accent-purple), var(--accent))' : 'var(--accent)')
                : 'var(--bg-card)',
              color: value === opt.val ? 'white' : 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: value === opt.val
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
            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
              {opt.desc}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
