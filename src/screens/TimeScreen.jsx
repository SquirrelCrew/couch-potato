import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Potato from '../components/Potato';

const timePoints = [
  { value: '5 Minuten', label: '5 Min', y: 0 },
  { value: '10 Minuten', label: '10 Min', y: 0.03 },
  { value: '15 Minuten', label: '15 Min', y: 0.06 },
  { value: '30 Minuten', label: '30 Min', y: 0.1 },
  { value: '1 Stunde', label: '1 Std', y: 0.16 },
  { value: '2 Stunden', label: '2 Std', y: 0.24 },
  { value: '3 Stunden', label: '3 Std', y: 0.32 },
  { value: 'Einen halben Tag', label: '½ Tag', y: 0.42 },
  { value: 'Einen ganzen Tag', label: '1 Tag', y: 0.52 },
  { value: 'Ein Wochenende', label: 'Wochenende', y: 0.6 },
  { value: 'Eine Woche', label: '1 Woche', y: 0.68 },
  { value: 'Einen Monat', label: '1 Monat', y: 0.76 },
  { value: 'Ein Jahr', label: '1 Jahr', y: 0.85 },
  { value: '10 Jahre', label: '10 Jahre', y: 0.95 },
];

const TOTAL_HEIGHT_VH = 12; // screen heights

export default function TimeScreen({ value, onChange }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [closestIndex, setClosestIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;
    const progress = el.scrollTop / maxScroll;
    setScrollProgress(progress);

    // Find closest time point
    let minDist = Infinity;
    let closest = 0;
    timePoints.forEach((tp, i) => {
      const dist = Math.abs(progress - tp.y);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setClosestIndex(closest);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-scroll to selected value on mount
  useEffect(() => {
    if (value && containerRef.current) {
      const idx = timePoints.findIndex(t => t.value === value);
      if (idx >= 0) {
        const el = containerRef.current;
        const maxScroll = el.scrollHeight - el.clientHeight;
        el.scrollTop = timePoints[idx].y * maxScroll;
      }
    }
  }, []); // eslint-disable-line

  const selectTime = (tp) => {
    onChange(tp.value);
  };

  // The wavy path SVG
  const pathHeight = TOTAL_HEIGHT_VH * 100; // vh units → we'll use px in style

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100dvh',
      position: 'relative',
    }}>
      {/* Header (fixed at top) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'linear-gradient(var(--bg), var(--bg) 70%, transparent)',
          width: '100%',
          padding: '20px 24px 36px',
          textAlign: 'center',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--accent-dark)',
        }}>
          Wie lang darf's dauern?
        </h2>

        {/* Current selection display */}
        <motion.div
          key={closestIndex}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--accent)',
            fontWeight: 600,
            marginTop: '8px',
          }}
        >
          {value || timePoints[closestIndex].value}
        </motion.div>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-light)',
          marginTop: '4px',
        }}>
          ↓ Scroll & wähle ↓
        </p>
      </motion.div>

      {/* Scrollable timeline */}
      <div
        ref={containerRef}
        className="timeline-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '480px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div style={{
          height: `${TOTAL_HEIGHT_VH * 100}vh`,
          position: 'relative',
          padding: '0 40px',
        }}>
          {/* Wavy path line */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '100%',
              pointerEvents: 'none',
            }}
            viewBox="0 0 200 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M100,0 C130,80 70,160 100,240 C130,320 70,400 100,480 C130,560 70,640 100,720 C130,800 70,880 100,1000"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            {/* Progress overlay */}
            <path
              d="M100,0 C130,80 70,160 100,240 C130,320 70,400 100,480 C130,560 70,640 100,720 C130,800 70,880 100,1000"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeDasharray="1000"
              strokeDashoffset={1000 - scrollProgress * 1000}
            />
          </svg>

          {/* Time points */}
          {timePoints.map((tp, i) => {
            const isSelected = value === tp.value;
            const isClosest = closestIndex === i;
            const isLeft = i % 2 === 0;

            return (
              <motion.button
                key={tp.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollProgress > tp.y - 0.08 || i === 0 ? 1 : 0.3 }}
                onClick={() => selectTime(tp)}
                style={{
                  position: 'absolute',
                  top: `${tp.y * 100}%`,
                  left: isLeft ? '10%' : undefined,
                  right: isLeft ? undefined : '10%',
                  transform: 'translateY(-50%)',
                  padding: '12px 20px',
                  borderRadius: '20px',
                  border: `2px solid ${isSelected ? 'var(--accent-dark)' : isClosest ? 'var(--accent)' : 'var(--border)'}`,
                  background: isSelected ? 'var(--accent)' : 'var(--bg-card)',
                  color: isSelected ? 'white' : 'var(--text)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: isClosest ? '1.3rem' : '1.1rem',
                  fontWeight: isClosest ? 700 : 600,
                  boxShadow: isSelected
                    ? '0 4px 16px rgba(196, 162, 101, 0.4)'
                    : '0 2px 6px var(--shadow)',
                  transition: 'all 0.2s ease',
                  zIndex: isClosest ? 5 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {tp.label}
                {isSelected && ' ✓'}
              </motion.button>
            );
          })}

          {/* Floating potato along the path */}
          <motion.div
            style={{
              position: 'fixed',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Potato variant="walk" size={48} />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '160px',
        background: 'linear-gradient(transparent, var(--bg))',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
    </div>
  );
}
