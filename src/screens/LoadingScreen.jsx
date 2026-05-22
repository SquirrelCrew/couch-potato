import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Potato from '../components/Potato';

const messages = [
  'Kartoffel denkt nach...',
  'Durchsuche das Stimmungsarchiv...',
  'Konsultiere die Freizeit-Orakel...',
  'Mixe Zutaten für dein Abenteuer...',
  'Fast fertig, Kartoffelehrenwort!',
];

export default function LoadingScreen({ error, onRetry }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (error) return;
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [error]);

  if (error) {
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
        <Potato variant="think" size={120} />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
        }}>
          Ups, da ging was schief 🥔
        </h2>
        <p style={{
          color: 'var(--text-light)',
          fontSize: '0.9rem',
          maxWidth: '300px',
          lineHeight: 1.6,
        }}>
          {error}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          style={{
            padding: '14px 32px',
            borderRadius: '999px',
            border: '2px solid var(--accent-dark)',
            background: 'var(--accent)',
            color: 'white',
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Nochmal versuchen
        </motion.button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      textAlign: 'center',
      padding: '24px',
      minHeight: '100dvh',
      justifyContent: 'center',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      <motion.div
        animate={{
          rotate: [0, -5, 5, -3, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Potato variant="think" size={140} />
      </motion.div>

      <div style={{ height: '2rem', position: 'relative', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--accent-dark)',
              fontWeight: 600,
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {messages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Animated dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
