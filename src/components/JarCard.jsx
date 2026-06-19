import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import JarSVG from './JarSVG'

export default function JarCard({ jar, count, index }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={() => navigate(`/jar/${jar.id}`)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '16px 10px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
      <JarSVG color={jar.color} count={count} />
      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', textAlign: 'center', fontFamily: 'Playfair Display, serif' }}>
        {jar.emoji} {jar.name}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
        {count} thought{count !== 1 ? 's' : ''}
      </div>
    </motion.div>
  )
}