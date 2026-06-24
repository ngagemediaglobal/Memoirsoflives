import { motion } from 'framer-motion';

const formats = [
  {
    type: 'Video',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="16,13 30,20 16,27" fill="currentColor" />
      </svg>
    ),
    description: 'Cinematic documentary-style recordings that capture expression, voice, and presence.',
  },
  {
    type: 'Audio',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="14" y="8" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 22c0 6.627 5.373 12 12 12s12-5.373 12-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="34" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="40" x2="26" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: 'Intimate audio portraits — conversations and reflections in the subject\'s own words.',
  },
  {
    type: 'Written',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="6" y="4" width="28" height="34" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="13" x2="28" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="27" x2="22" y2="27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    description: 'Long-form narratives and memoir writing that preserve the richness of a life in full.',
  },
];

export default function FormatsScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg-light)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Top label */}
      <motion.div
        className="absolute top-12 flex items-center gap-4"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-10 h-px" style={{ backgroundColor: 'var(--color-text-primary)', opacity: 0.3 }} />
        <p
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em' }}
        >
          Three formats, one truth
        </p>
        <div className="w-10 h-px" style={{ backgroundColor: 'var(--color-text-primary)', opacity: 0.3 }} />
      </motion.div>

      {/* Format cards */}
      <div className="flex items-stretch gap-px w-full">
        {formats.map((fmt, i) => (
          <motion.div
            key={fmt.type}
            className="flex-1 flex flex-col items-center justify-center py-16 px-10 text-center"
            style={{
              backgroundColor: i === 1 ? 'var(--color-bg-dark)' : 'transparent',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6 + i * 0.28,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="mb-7"
              style={{ color: i === 1 ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.85 + i * 0.28, duration: 0.7, ease: 'backOut' }}
            >
              {fmt.icon}
            </motion.div>

            <h3
              className="text-3xl font-light mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                color: i === 1 ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
              }}
            >
              {fmt.type}
            </h3>

            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: i === 1 ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                maxWidth: '240px',
              }}
            >
              {fmt.description}
            </p>

            {i === 1 && (
              <motion.div
                className="mt-8 px-5 py-2 text-xs tracking-widest uppercase"
                style={{
                  border: '1px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.18em',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                Most requested
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
