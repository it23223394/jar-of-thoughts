import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shuffle, Lock } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

dayjs.extend(relativeTime)

export default function JarView() {
  const { jarId } = useParams()
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()

  const jar = jars.find(j => j.id === jarId)
  const jarThoughts = thoughts
    .filter(t => t.jarId === jarId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  function openRandom() {
    const unlocked = jarThoughts.filter(t => !t.isLocked)
    if (!unlocked.length) return
    const random = unlocked[Math.floor(Math.random() * unlocked.length)]
    navigate(`/chit/${random.id}`)
  }

  if (!jar) return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
      Jar not found.
    </div>
  )

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 0 40px' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 20px 16px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-serif" style={{ fontSize: '20px', color: 'var(--text)' }}>
          {jar.emoji} {jar.name}
        </h2>
        <button
          onClick={openRandom}
          title="Open random chit"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '13px',
          }}
        >
          <Shuffle size={18} />
        </button>
      </div>

      {/* Random button visible */}
      <div style={{ padding: '0 20px 16px' }}>
        <button
          onClick={openRandom}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '12px',
            border: '1px dashed var(--border)',
            background: 'transparent',
            color: 'var(--muted)',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Shuffle size={14} /> Open a random chit
        </button>
      </div>

      {/* Chit list */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {jarThoughts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--muted)',
            fontSize: '14px',
            lineHeight: '1.7',
          }}>
            This jar is empty.<br />Add your first thought.
          </div>
        )}

        {jarThoughts.map((thought, i) => (
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            onClick={() => {
              if (thought.isLocked) return
              navigate(`/chit/${thought.id}`)
            }}
            style={{
              background: 'var(--surface)',
              border: `1px solid ${thought.isLocked ? '#ccc' : 'var(--border)'}`,
              borderRadius: '14px',
              padding: '14px 16px',
              cursor: thought.isLocked ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: thought.isLocked ? 0.6 : 1,
            }}
          >
            {/* Chit icon */}
            <div style={{
              width: '32px',
              height: '38px',
              flexShrink: 0,
              borderRadius: '4px',
              background: jar.color + '55',
              border: `1px solid ${jar.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}>
              {thought.isLocked ? '🔒' : '📝'}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {thought.isLocked ? (
                <div style={{ fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  Locked until {dayjs(thought.unlockAt).format('MMM D, YYYY')}
                </div>
              ) : (
                <>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {thought.text}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px' }}>
                    {dayjs(thought.createdAt).fromNow()}
                  </div>
                </>
              )}
            </div>

            {!thought.isLocked && (
              <div style={{ color: 'var(--muted)', fontSize: '16px' }}>›</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}