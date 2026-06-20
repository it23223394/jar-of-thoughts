import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, RotateCcw } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'framer-motion'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

dayjs.extend(relativeTime)

export default function Archive() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { archive, restoreFromArchive, deleteFromArchive } = useThoughts()

  function getJar(jarId) {
    return jars.find(j => j.id === jarId)
  }

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 0 40px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '24px 20px 16px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-serif" style={{ fontSize: '20px', color: 'var(--text)' }}>
          Archive
        </h2>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {archive.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            color: 'var(--muted)', fontSize: '14px', lineHeight: '1.7',
          }}>
            Your archive is empty.<br />
            Archived thoughts will appear here.
          </div>
        )}

        {[...archive].reverse().map((thought, i) => {
          const jar = getJar(thought.jarId)
          return (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '14px 16px',
              }}
            >
              {/* Jar tag */}
              {jar && (
                <div style={{
                  fontSize: '11px', color: 'var(--muted)',
                  marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: jar.color, display: 'inline-block',
                  }} />
                  {jar.emoji} {jar.name}
                </div>
              )}

              {/* Text */}
              <div style={{
                fontSize: '14px', color: 'var(--text)', lineHeight: '1.6',
                marginBottom: '10px',
              }}>
                {thought.text}
              </div>

              {/* Date + actions */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border)', paddingTop: '10px',
              }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                  {dayjs(thought.createdAt).format('MMM D, YYYY')} · {dayjs(thought.createdAt).fromNow()}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => restoreFromArchive(thought.id)}
                    title="Restore to jar"
                    style={{
                      background: 'none', border: '1px solid var(--border)',
                      borderRadius: '8px', padding: '5px 8px',
                      cursor: 'pointer', color: 'var(--muted)',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '12px',
                    }}
                  >
                    <RotateCcw size={13} /> Restore
                  </button>
                  <button
                    onClick={() => deleteFromArchive(thought.id)}
                    title="Delete forever"
                    style={{
                      background: 'none', border: '1px solid #e05555',
                      borderRadius: '8px', padding: '5px 8px',
                      cursor: 'pointer', color: '#e05555',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '12px',
                    }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}