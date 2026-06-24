import { motion } from 'framer-motion';

const lines = [
  { text: 'Every moment', italic: false },
  { text: 'carries weight.', italic: true },
  { text: 'Every voice', italic: false },
  { text: 'holds truth.', italic: true },
];

const pillars = ['Memory', 'Identity', 'Legacy'];

export default function LegacyScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Large background number */}
      <motion.span
        className="absolute text-[22rem] font-light leading-none select-none pointer-events-none"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'rgba(181, 217, 70, 0.04)',
          top: '-4rem',
          right: '-2rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
      >
        M
      </motion.span>

      {/* Main kinetic text */}
      <div className="relative z-10 text-center px-20">
        {lines.map((line, i) => (
          <motion.div
            key={line.text}
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.4, duration: 0.1 }}
          >
            <motion.span
              className="block leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '5rem',
                color: line.italic ? 'var(--color-primary)' : 'var(--color-text-inverse)',
                fontStyle: line.italic ? 'italic' : 'normal',
                fontWeight: line.italic ? 300 : 300,
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                delay: 0.5 + i * 0.4,
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Bottom pillars */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar}
            className="flex-1 flex flex-col items-center py-6 gap-2"
            style={{
              borderTop: '1px solid rgba(181, 217, 70, 0.2)',
              borderRight: i < pillars.length - 1 ? '1px solid rgba(181, 217, 70, 0.1)' : 'none',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em' }}
            >
              {pillar}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
