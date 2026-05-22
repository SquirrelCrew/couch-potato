import { useState } from 'react';
import { motion } from 'framer-motion';
import Potato from '../components/Potato';
import { generateActivity } from '../utils/activities';

export default function ResultScreen({ result, config, onReset, onNewResult }) {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!result) return null;

  const handleAlternative = async () => {
    setLoading(true);
    try {
      const apiKey = localStorage.getItem('couch-potato-api-key');
      const newResult = await generateActivity(apiKey, config);
      onNewResult(newResult);
      setShowAlternatives(false);
    } catch (err) {
      console.error(err);
      alert('Hmm, da ging was schief. Versuch\'s nochmal!');
    } finally {
      setLoading(false);
    }
  };

  const energyEmoji = {
    niedrig: '🔋',
    mittel: '⚡',
    hoch: '🔥',
  };

  const socialLabel = {
    solo: '👤 Solo',
    duo: '👥 Zu zweit',
    gruppe: '👥👥 Gruppe',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      padding: '24px',
      paddingBottom: '48px',
      minHeight: '100dvh',
    }}>
      {/* Celebration potato */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      >
        <Potato variant="happy" size={120} />
      </motion.div>

      {/* Mood tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, var(--accent-purple), var(--accent))',
          color: 'white',
          padding: '6px 18px',
          borderRadius: '999px',
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        #{result.moodTag}
      </motion.div>

      {/* Main activity card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '28px',
          padding: '32px 24px',
          width: '100%',
          border: '2px solid var(--border)',
          boxShadow: '0 8px 32px var(--shadow)',
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
          lineHeight: 1.3,
          marginBottom: '16px',
        }}>
          {result.activity}
        </h2>

        <p style={{
          color: 'var(--text-light)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}>
          „{result.reason}"
        </p>
      </motion.div>

      {/* Info pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <InfoPill icon="⏱️" text={result.duration} />
        <InfoPill icon={energyEmoji[result.energyLevel] || '⚡'} text={result.energyLevel} />
        <InfoPill icon={result.location === 'outdoor' ? '🌿' : '🏠'} text={result.location === 'outdoor' ? 'Outdoor' : 'Indoor'} />
        <InfoPill icon={socialLabel[result.social]?.split(' ')[0] || '👤'} text={socialLabel[result.social]?.split(' ').slice(1).join(' ') || result.social} />
      </motion.div>

      {/* Alternatives */}
      {result.alternatives && result.alternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{ width: '100%' }}
        >
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-dark)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {showAlternatives ? '▲ Alternativen ausblenden' : '▼ Alternativen anzeigen'}
          </button>

          {showAlternatives && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginTop: '8px',
              }}
            >
              {result.alternatives.map((alt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    border: '1.5px solid var(--border)',
                    boxShadow: '0 2px 8px var(--shadow)',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}>
                    #{alt.moodTag}
                  </span>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text)',
                    marginTop: '4px',
                    lineHeight: 1.5,
                  }}>
                    {alt.activity}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          marginTop: '8px',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAlternative}
          disabled={loading}
          style={{
            padding: '16px 24px',
            borderRadius: '999px',
            border: '2px solid var(--accent-dark)',
            background: 'var(--bg-card)',
            color: 'var(--accent-dark)',
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? '🥔 Denke nach...' : '🔄 Anderer Vorschlag'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          style={{
            padding: '16px 24px',
            borderRadius: '999px',
            border: '2px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-light)',
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🥔 Nochmal von vorne
        </motion.button>
      </motion.div>

      {/* Doodle footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          color: 'var(--text-light)',
          marginTop: '24px',
        }}
      >
        ~ mit Liebe gekocht von Couch Potato 🥔 ~
      </motion.p>
    </div>
  );
}

function InfoPill({ icon, text }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 14px',
      borderRadius: '999px',
      background: 'var(--bg-card)',
      border: '1.5px solid var(--border)',
      fontSize: '0.85rem',
      color: 'var(--text)',
      fontWeight: 500,
    }}>
      {icon} {text}
    </span>
  );
}
