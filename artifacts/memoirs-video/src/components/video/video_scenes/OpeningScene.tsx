import { motion } from 'framer-motion';

const words = ['What', 'will', 'they', 'remember?'];

export default function OpeningScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Thin horizontal rule */}
      <motion.div
        className="absolute"
        style={{ width: 1, height: '40%', top: '30%', backgroundColor: 'var(--color-primary)', opacity: 0.25 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Main question — staggered word reveal */}
      <div
        className="relative z-10 flex flex-wrap justify-center gap-x-6 gap-y-0 px-16 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={word}
            className="block text-8xl font-light tracking-tight leading-none"
            style={{ color: 'var(--color-text-inverse)' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6 + i * 0.28,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word === 'remember?' ? (
              <span style={{ color: 'var(--color-primary)' }}>{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 mt-12 text-lg tracking-widest uppercase"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.25em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1.2 }}
      >
        The stories we leave behind
      </motion.p>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
        <div className="w-16 h-px" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
      </motion.div>
    </motion.div>
  );
}
