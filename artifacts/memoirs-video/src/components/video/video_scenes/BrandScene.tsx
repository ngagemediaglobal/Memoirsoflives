import { motion } from 'framer-motion';

const letters = 'MEMOIRS'.split('');

export default function BrandScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
    >
      {/* Background circle */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '60vw',
          height: '60vw',
          border: '1px solid rgba(181, 217, 70, 0.1)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          border: '1px solid rgba(181, 217, 70, 0.07)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Tagline above */}
      <motion.p
        className="relative z-10 text-sm tracking-widest uppercase mb-8"
        style={{
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.28em',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Your story deserves to be told
      </motion.p>

      {/* Logo wordmark — staggered letter reveal */}
      <div className="relative z-10 flex items-center gap-0">
        {letters.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="block leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 300,
              color: 'var(--color-text-inverse)',
              letterSpacing: '0.12em',
            }}
            initial={{ opacity: 0, y: 40, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: 0.9 + i * 0.09,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Lime green accent bar */}
      <motion.div
        className="relative z-10 mt-6"
        style={{ height: 2, backgroundColor: 'var(--color-primary)' }}
        initial={{ width: 0 }}
        animate={{ width: '14rem' }}
        transition={{ delay: 1.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Subtitle */}
      <motion.p
        className="relative z-10 mt-7 text-base"
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.05em',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 1 }}
      >
        Multi-format storytelling. Documented. Preserved. Forever.
      </motion.p>

      {/* CTA pill */}
      <motion.div
        className="relative z-10 mt-10 px-8 py-4 rounded-full text-sm font-medium tracking-wide"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-body)',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.0, duration: 0.8, ease: 'backOut' }}
      >
        Request a Memoir
      </motion.div>

      {/* Corner decoration */}
      <motion.div
        className="absolute bottom-10 right-12 flex flex-col items-end gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em' }}
        >
          memoirs.co
        </span>
      </motion.div>
    </motion.div>
  );
}
