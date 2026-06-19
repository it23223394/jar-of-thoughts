import { useNavigate } from 'react-router-dom'
import { Search, BarChart2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import JarCard from '../components/JarCard'

export default function Home() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()

  function countFor(jarId) {
    return thoughts.filter(t => t.jarId === jarId).length
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 0 100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 20px 8px' }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '26px', fontWeight: 600, color: 'var(--text)' }}>
            Jar of Thoughts
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>your quiet corner</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/search')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '6px' }}>
            <Search size={20} />
          </button>
          <button onClick={() => navigate('/stats')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '6px' }}>
            <BarChart2 size={20} />
          </button>
        </div>
      </div>

      {/* Shelf label */}
      <div style={{ padding: '16px 20px 10px', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        your shelf
      </div>

      {/* Jar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '0 16px' }}>
        {jars.map((jar, i) => (
          <JarCard key={jar.id} jar={jar} count={countFor(jar.id)} index={i} />
        ))}
      </div>

      {/* Archive link */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button onClick={() => navigate('/archive')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--muted)', textDecoration: 'underline' }}>
          view archive
        </button>
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/write')}
        style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '32px',
          padding: '14px 28px', fontSize: '15px', fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 4px 20px rgba(181,128,74,0.35)',
        }}
      >
        <Plus size={18} /> New Thought
      </motion.button>
    </div>
  )
}