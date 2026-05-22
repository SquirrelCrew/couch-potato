import { useState } from 'react';
import { motion } from 'framer-motion';
import Potato from '../components/Potato';

export default function ApiKeyScreen({ onDone }) {
  const [key, setKey] = useState(localStorage.getItem('couch-potato-api-key') || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Ohne API-Key geht hier nix, Kartoffel.');
      return;
    }
    localStorage.setItem('couch-potato-api-key', trimmed);
    setError('');
    onDone();
  };

  const hasKey = !!localStorage.getItem('couch-potato-api-key');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      textAlign: 'center',
      padding: '24px',
      minHeight: '100dvh',
      justifyContent: 'center',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <Potato variant="wave" size={140} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.4rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.1,
        }}
      >
        Couch Potato 🥔
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          color: 'var(--text-light)',
          fontSize: '1rem',
          lineHeight: 1.6,
          maxWidth: '320px',
        }}
      >
        Bevor's losgeht: Ich brauch deinen <strong>OpenRouter API-Key</strong>, um dir kreative Vorschläge machen zu können. Der bleibt nur in deinem Browser.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ width: '100%', maxWidth: '340px' }}
      >
        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(''); }}
          placeholder="sk-or-..."
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: '16px',
            border: '2px solid var(--border)',
            background: 'var(--bg-card)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text)',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#c44', fontSize: '0.85rem', marginTop: '8px' }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        style={{
          padding: '14px 40px',
          borderRadius: '999px',
          border: '2px solid var(--accent-dark)',
          background: 'var(--accent)',
          color: 'white',
          fontSize: '1.1rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.02em',
        }}
      >
        {hasKey ? 'Weiter geht\'s!' : 'Ab auf die Couch!'}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.9 }}
        style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}
      >
        🔒 Dein Key verlässt niemals deinen Browser
      </motion.p>
    </div>
  );
}
