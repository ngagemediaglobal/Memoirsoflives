import { motion } from 'framer-motion';

const voices = [
  {
    label: 'Public Figures',
    description: 'Leaders, artists, and changemakers whose legacies shaped generations.',
    number: '01',
  },
  {
    label: 'Community Voices',
    description: 'The teachers, healers, and neighbors whose quiet impact runs deepest.',
    number: '02',
  },
  {
    label: 'Everyday Individuals',
    description: 'Ordinary lives carrying extraordinary stories — the heart of humanity.',
    number: '03',
  },
];

export default function VoicesScene() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Background accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: 'var(--color-primary)' }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Top label */}
      <motion.p
        className="absolute top-12 left-16 text-sm tracking-widest uppercase"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.22em' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Whose stories we tell
      </motion.p>

      <div className="px-16 space-y-0">
        {voices.map((voice, i) => (
          <motion.div
            key={voice.label}
            className="flex items-start gap-10 py-9 border-b"
            style={{ borderColor: 'rgba(181, 217, 70, 0.15)' }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.7 + i * 0.35,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="text-5xl font-light shrink-0 leading-none mt-1"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)', opacity: 0.55 }}
            >
              {voice.number}
            </span>
            <div>
              <h2
                className="text-4xl font-light leading-tight mb-2"
                style={{ color: 'var(--color-text-inverse)', fontFamily: 'var(--font-display)' }}
              >
                {voice.label}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', maxWidth: '520px' }}
              >
                {voice.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom flourish */}
      <motion.div
        className="absolute bottom-10 right-16 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--color-text-muted)', letterSpacing: '0.2em', fontFamily: 'var(--font-body)' }}
        >
          Memoirs
        </span>
        <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.5 }} />
      </motion.div>
    </motion.div>
  );
}
