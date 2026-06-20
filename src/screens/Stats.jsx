import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import dayjs from 'dayjs'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

export default function Stats() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()

  const total = thoughts.length

  const jarCounts = jars.map(j => ({
    ...j,
    count: thoughts.filter(t => t.jarId === j.id).length,
  })).sort((a, b) => b.count - a.count)

  const mostUsed = jarCounts[0]

  const sorted = [...thoughts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  const first = sorted[0]
  const latest = sorted[sorted.length - 1]

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
          Your Stats
        </h2>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Top cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
          {[
            { label: 'Total thoughts', value: total },
            { label: 'Jars', value: jars.length },
            { label: 'Most used', value: mostUsed ? mostUsed.emoji : '—' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '14px', padding: '14px 10px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text)', fontFamily: 'Playfair Display, serif' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Date range */}
        {first && (
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '14px', padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>First thought</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>
                {dayjs(first.createdAt).format('MMM D, YYYY')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Latest thought</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>
                {dayjs(latest.createdAt).format('MMM D, YYYY')}
              </div>
            </div>
          </div>
        )}

        {/* Per jar bar chart */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '14px', padding: '16px',
        }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            Thoughts per jar
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jarCounts.map(jar => (
              <div key={jar.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text)', width: '110px', flexShrink: 0 }}>
                  {jar.emoji} {jar.name}
                </div>
                <div style={{
                  flex: 1, height: '8px', background: 'var(--border)',
                  borderRadius: '4px', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: total > 0 ? `${Math.round((jar.count / total) * 100)}%` : '0%',
                    background: jar.color,
                    borderRadius: '4px',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', width: '20px', textAlign: 'right' }}>
                  {jar.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {total === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '14px', padding: '20px' }}>
            No thoughts yet. Start writing!
          </div>
        )}

      </div>
    </div>
  )
}