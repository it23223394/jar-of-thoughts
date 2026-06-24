import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, RotateCcw } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'framer-motion'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import { useTheme } from '../hooks/useTheme'
import AppHeader from '../components/AppHeader'

dayjs.extend(relativeTime)

export default function Archive() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { archive, restoreFromArchive, deleteFromArchive } = useThoughts()
  const c = useTheme()

  function getJar(jarId) { return jars.find(j => j.id === jarId) }

  return (
    <div className="subpage" style={{ background: c.bg, color: c.text }}>
      <AppHeader />
      <div className="subpage-inner">
        <div className="subpage-header">
          <button className="subpage-back" style={{ color: c.muted }} onClick={() => navigate('/')} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <div>
            <h2 style={{ color: c.text }}>Archive</h2>
            <div className="subpage-sub" style={{ color: c.muted }}>
              {archive.length} thought{archive.length !== 1 ? 's' : ''} stored
            </div>
          </div>
        </div>

        {archive.length === 0 ? (
          <div className="subpage-empty" style={{ color: c.muted }}>
            📦<br /><br />
            Your archive is empty.<br />
            <span style={{ fontSize: '13px', opacity: 0.7 }}>Archived thoughts appear here.</span>
          </div>
        ) : (
          <div className="archive-list">
            {[...archive].reverse().map((thought, i) => {
              const jar = getJar(thought.jarId)
              return (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="subpage-card"
                  style={{ background: c.surface, border: `1px solid ${c.border}`, marginBottom: 0 }}
                >
                  {jar && (
                    <div style={{ fontSize: '11px', color: c.muted, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: jar.color, display: 'inline-block', flexShrink: 0 }} />
                      {jar.emoji} {jar.name}
                    </div>
                  )}
                  <div style={{ fontSize: '14px', color: c.text, lineHeight: '1.65', marginBottom: '14px', wordBreak: 'break-word' }}>
                    {thought.text}
                  </div>
                  <div className="archive-card-footer" style={{ borderTop: `1px solid ${c.border}` }}>
                    <div style={{ fontSize: '11px', color: c.muted }}>
                      {dayjs(thought.createdAt).format('MMM D, YYYY')} · {dayjs(thought.createdAt).fromNow()}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: '10px', padding: '6px 12px', cursor: 'pointer', color: c.muted, display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontFamily: 'Inter,sans-serif' }}
                        onClick={() => restoreFromArchive(thought.id)}
                      >
                        <RotateCcw size={12} /> Restore
                      </button>
                      <button
                        style={{ background: 'none', border: '1px solid rgba(220,50,50,0.3)', borderRadius: '10px', padding: '6px 12px', cursor: 'pointer', color: '#e05555', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontFamily: 'Inter,sans-serif' }}
                        onClick={() => deleteFromArchive(thought.id)}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}