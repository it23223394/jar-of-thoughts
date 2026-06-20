import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, FolderInput } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

dayjs.extend(relativeTime)

export default function ChitView() {
  const { thoughtId } = useParams()
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts, deleteThought, archiveThought, moveThought } = useThoughts()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showMoveModal, setShowMoveModal] = useState(false)

  const thought = thoughts.find(t => t.id === thoughtId)
  const jar = thought ? jars.find(j => j.id === thought.jarId) : null

  if (!thought || !jar) return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)' }}>
      Thought not found.
    </div>
  )

  function handleDelete() {
    deleteThought(thought.id)
    navigate(-1)
  }

  function handleArchive() {
    archiveThought(thought.id)
    navigate('/')
  }

  function handleMove(newJarId) {
    moveThought(thought.id, newJarId)
    setShowMoveModal(false)
    navigate(`/jar/${newJarId}`)
  }

  const otherJars = jars.filter(j => j.id !== thought.jarId)

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
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {jar.emoji} {jar.name}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowMoveModal(true)}
            title="Move to another jar"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
          >
            <FolderInput size={18} />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            title="Delete"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Paper card */}
      <div style={{ padding: '0 20px' }}>
        <motion.div
          initial={{ opacity: 0, scaleY: 0.05 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="paper-lines"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px 20px',
            boxShadow: '0 2px 16px rgba(44,36,22,0.07)',
            transformOrigin: 'top',
          }}
        >
          {/* Thought text */}
          <p style={{
            fontSize: '16px',
            lineHeight: '28px',
            color: 'var(--text)',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
            whiteSpace: 'pre-wrap',
          }}>
            {thought.text}
          </p>

          {/* Timestamp */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '14px',
          }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>
              {dayjs(thought.createdAt).format('MMMM D, YYYY  ·  h:mm A')}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', opacity: 0.7 }}>
              Written {dayjs(thought.createdAt).fromNow()}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100,
        }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              background: 'var(--surface)', borderRadius: '20px 20px 0 0',
              padding: '24px 20px 36px', width: '100%', maxWidth: '480px',
            }}
          >
            <div className="font-serif" style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>
              Remove this thought?
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
              You can delete it forever or move it to the archive.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleArchive}
                style={{
                  padding: '13px', borderRadius: '12px', border: '1px solid var(--border)',
                  background: 'var(--bg)', color: 'var(--text)', fontSize: '14px', cursor: 'pointer',
                }}
              >
                Archive instead
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '13px', borderRadius: '12px', border: 'none',
                  background: '#e05555', color: '#fff', fontSize: '14px', cursor: 'pointer',
                }}
              >
                Delete forever
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '13px', borderRadius: '12px', border: 'none',
                  background: 'transparent', color: 'var(--muted)', fontSize: '14px', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Move modal */}
      {showMoveModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100,
        }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              background: 'var(--surface)', borderRadius: '20px 20px 0 0',
              padding: '24px 20px 36px', width: '100%', maxWidth: '480px',
            }}
          >
            <div className="font-serif" style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>
              Move to another jar
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {otherJars.map(j => (
                <button
                  key={j.id}
                  onClick={() => handleMove(j.id)}
                  style={{
                    padding: '13px 16px', borderRadius: '12px',
                    border: '1px solid var(--border)', background: 'var(--bg)',
                    color: 'var(--text)', fontSize: '14px', cursor: 'pointer',
                    textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px',
                  }}
                >
                  <span style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: j.color, display: 'inline-block',
                  }} />
                  {j.emoji} {j.name}
                </button>
              ))}
              <button
                onClick={() => setShowMoveModal(false)}
                style={{
                  padding: '13px', borderRadius: '12px', border: 'none',
                  background: 'transparent', color: 'var(--muted)', fontSize: '14px', cursor: 'pointer',
                  marginTop: '4px',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}