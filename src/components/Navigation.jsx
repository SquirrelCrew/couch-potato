import { motion } from 'framer-motion';
import { MiniPotato } from './Potato';

export default function Navigation({ screen, totalScreens, canGoNext, onBack, onNext, onSubmit, isLastScreen }) {
  // Don't show nav on API key screen (0) or result
  if (screen === 0) return null;

  const progressScreens = totalScreens - 1; // exclude API key screen
  const currentProgress = screen; // screen 1 = first progress dot

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        background: 'linear-gradient(transparent, var(--bg) 30%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'none',
      }}
    >
      {/* Progress potatoes */}
      <div style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}>
        {Array.from({ length: progressScreens }, (_, i) => (
          <MiniPotato key={i} filled={i < currentProgress} size={20} />
        ))}
      </div>

      {/* Navigation arrows */}
      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}>
        <NavButton direction="back" onClick={onBack} disabled={screen <= 1} />

        {isLastScreen ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            disabled={!canGoNext}
            style={{
              padding: '14px 32px',
              borderRadius: '999px',
              border: '2px solid var(--accent-dark)',
              background: canGoNext ? 'var(--accent)' : 'var(--border)',
              color: canGoNext ? 'white' : 'var(--text-light)',
              fontSize: '1rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              cursor: canGoNext ? 'pointer' : 'default',
              letterSpacing: '0.02em',
            }}
          >
            🥔 Los geht's!
          </motion.button>
        ) : (
          <NavButton direction="next" onClick={onNext} disabled={!canGoNext} />
        )}
      </div>
    </motion.div>
  );
}

function NavButton({ direction, onClick, disabled }) {
  const isBack = direction === 'back';

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      onClick={disabled ? undefined : onClick}
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: `2px solid ${disabled ? 'var(--border)' : 'var(--accent-dark)'}`,
        background: disabled ? 'transparent' : 'var(--bg-card)',
        color: disabled ? 'var(--border)' : 'var(--accent-dark)',
        fontSize: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        boxShadow: disabled ? 'none' : '0 2px 8px var(--shadow)',
        transition: 'all 0.2s ease',
      }}
      aria-label={isBack ? 'Zurück' : 'Weiter'}
    >
      {isBack ? '←' : '→'}
    </motion.button>
  );
}
