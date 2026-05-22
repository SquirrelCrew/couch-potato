import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '40%' : '-40%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '40%' : '-40%',
    opacity: 0,
  }),
};

export default function ScreenWrapper({ screenKey, direction = 1, children, noPadding = false }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={screenKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', stiffness: 250, damping: 30 },
          opacity: { duration: 0.25 },
        }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: noPadding ? 0 : '24px',
          paddingBottom: noPadding ? 0 : '140px',
          minHeight: noPadding ? undefined : '100dvh',
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
