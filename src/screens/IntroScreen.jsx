import { motion } from 'framer-motion';
import Potato from '../components/Potato';

export default function IntroScreen({ direction }) {
  const isOutdoor = direction === 'raus';

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
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <Potato variant="happy" size={160} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '24px',
          padding: '28px 24px',
          maxWidth: '360px',
          border: '2px solid var(--border)',
          boxShadow: '0 4px 16px var(--shadow)',
          position: 'relative',
        }}
      >
        {/* Speech bubble pointer */}
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '12px solid var(--bg-card)',
          filter: 'drop-shadow(0 -1px 0 var(--border))',
        }} />

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          marginBottom: '12px',
        }}>
          Hi, ich bin Couch Potato! 🥔
        </h2>

        <p style={{
          color: 'var(--text)',
          fontSize: '1rem',
          lineHeight: 1.7,
        }}>
          Schön, dass du da bist! Ich helfe dir heute dabei, die perfekte Freizeitaktivität
          {isOutdoor ? ' draußen' : ' drinnen'} zu finden.
        </p>

        <p style={{
          color: 'var(--text-light)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          marginTop: '12px',
        }}>
          Wir gehen zusammen ein paar Fragen durch — über deine Stimmung, Energie und wie viel Zeit du hast.
          Am Ende bekommst du einen Vorschlag, der genau zu dir passt.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--accent)',
            marginTop: '16px',
            fontWeight: 600,
          }}
        >
          Bereit? Dann weiter! →
        </motion.p>
      </motion.div>
    </div>
  );
}
