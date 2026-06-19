import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

export default function Write() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { addThought } = useThoughts()
  const [text, setText] = useState('')
  const [selectedJar, setSelectedJar] = useState(jars[0]?.id || '')
  const [lockEnabled, setLockEnabled] = useState(false)
  const [lockOption, setLockOption] = useState('1m')
  const [customDate, setCustomDate] = useState('')
  const [saving, setSaving] = useState(false)

  function getUnlockAt() {
    if (!lockEnabled) return null
    const now = new Date()
    if (lockOption === '1m') {
      now.setMonth(now.getMonth() + 1)
      return now.toISOString()
    }
    if (lockOption === '3m') {
      now.setMonth(now.getMonth() + 3)
      return now.toISOString()
    }
    if (lockOption === '6m') {
      now.setMonth(now.getMonth() + 6)
      return now.toISOString()
    }
    if (lockOption === '1y') {
      now.setFullYear(now.getFullYear() + 1)
      return now.toISOString()
    }
    if (lockOption === 'custom' && customDate) {
      return new Date(customDate).toISOString()
    }
    return null
  }

  function handleSave() {
    if (!text.trim() || !selectedJar) return
    setSaving(true)
    setTimeout(() => {
      addThought({
        text: text.trim(),
        jarId: selectedJar,
        isLocked: lockEnabled,
        unlockAt: getUnlockAt(),
      })
      navigate('/')
    }, 400)
  }

  const selectedJarData = jars.find(j => j.id === selectedJar)

  const lockOptions = [
    ['1m', '1 month'],
    ['3m', '3 months'],
    ['6m', '6 months'],
    ['1y', '1 year'],
    ['custom', 'Custom'],
  ]

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
          <X size={18} /> Cancel
        </button>
        <h2 className="font-serif" style={{ fontSize: '20px', color: 'var(--text)' }}>
          New Thought
        </h2>
        <div style={{ width: '70px' }} />
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Paper textarea */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="paper-lines"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 12px rgba(44,36,22,0.06)',
            minHeight: '200px',
          }}
        >
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What's on your mind..."
            style={{
              width: '100%',
              minHeight: '180px',
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '15px',
              lineHeight: '28px',
              color: 'var(--text)',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </motion.div>

        {/* Jar picker */}
        <div>
          <div style={{
            fontSize: '12px',
            color: 'var(--muted)',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Drop it into...
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {jars.map(jar => (
              <button
                key={jar.id}
                onClick={() => setSelectedJar(jar.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: `1px solid ${selectedJar === jar.id ? jar.color : 'var(--border)'}`,
                  background: selectedJar === jar.id ? jar.color + '33' : 'var(--surface)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontWeight: selectedJar === jar.id ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {jar.emoji} {jar.name}
              </button>
            ))}
          </div>
        </div>

        {/* Time capsule toggle */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                🔒 Lock until a future date?
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>
                Creates a time capsule
              </div>
            </div>
            <button
              onClick={() => setLockEnabled(!lockEnabled)}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '11px',
                background: lockEnabled ? 'var(--accent)' : '#ccc',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: '3px',
                left: lockEnabled ? '21px' : '3px',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          {lockEnabled && (
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {lockOptions.map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setLockOption(val)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    border: `1px solid ${lockOption === val ? 'var(--accent)' : 'var(--border)'}`,
                    background: lockOption === val ? 'var(--accent)' : 'var(--surface)',
                    color: lockOption === val ? '#fff' : 'var(--muted)',
                  }}
                >
                  {label}
                </button>
              ))}
              {lockOption === 'custom' && (
                <input
                  type="date"
                  value={customDate}
                  onChange={e => setCustomDate(e.target.value)}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    color: 'var(--text)',
                    fontSize: '13px',
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '32px',
            background: text.trim() ? 'var(--accent)' : '#ccc',
            color: text.trim() ? '#fff' : '#999',
            border: 'none',
            fontSize: '15px',
            fontWeight: 500,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          {saving
            ? 'Dropping...'
            : 'Drop into ' + (selectedJarData ? selectedJarData.emoji + ' ' + selectedJarData.name : '')}
        </motion.button>

      </div>
    </div>
  )
}