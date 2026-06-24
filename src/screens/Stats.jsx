import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import dayjs from 'dayjs'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import { useTheme } from '../hooks/useTheme'
import AppHeader from '../components/AppHeader'

function SectionTitle({ children, color }) {
  return (
    <div className="stats-section-title" style={{ color }}>{children}</div>
  )
}

function DonutChart({ segments, total, centerLabel, c }) {
  if (total === 0) {
    return (
      <div className="subpage-empty" style={{ color: c.muted, padding: '24px 0' }}>
        Add thoughts to see your jar mix
      </div>
    )
  }

  let acc = 0
  const gradient = segments.map(seg => {
    const start = (acc / total) * 100
    acc += seg.value
    const end = (acc / total) * 100
    return `${seg.color} ${start}% ${end}%`
  }).join(', ')

  return (
    <div className="stats-donut-wrap">
      <div
        className="stats-donut"
        style={{ background: `conic-gradient(${gradient})` }}
        role="img"
        aria-label="Jar distribution chart"
      >
        <div className="stats-donut-hole" style={{ background: c.surface }}>
          <span style={{ fontSize: '22px', fontWeight: 600, color: c.text, fontFamily: 'Playfair Display, serif' }}>{total}</span>
          <span style={{ fontSize: '10px', color: c.muted }}>{centerLabel}</span>
        </div>
      </div>
      <div className="stats-donut-legend">
        {segments.map(seg => (
          <div key={seg.id} className="stats-legend-row">
            <span className="stats-legend-dot" style={{ background: seg.color }} />
            <span className="stats-legend-label" style={{ color: c.text }}>{seg.emoji} {seg.name}</span>
            <span style={{ color: c.muted, fontWeight: 600, flexShrink: 0 }}>{Math.round(seg.value / total * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityChart({ months, c, accent }) {
  const max = Math.max(...months.map(m => m.count), 1)

  return (
    <div className="stats-activity-chart">
      {months.map(month => (
        <div key={month.key} className="stats-activity-bar-col">
          <div
            className="stats-activity-bar"
            style={{
              height: `${Math.max(4, (month.count / max) * 100)}%`,
              background: month.count > 0 ? accent : c.border,
              opacity: month.count > 0 ? 1 : 0.5,
            }}
            title={`${month.count} thought${month.count !== 1 ? 's' : ''}`}
          />
          <span className="stats-activity-label" style={{ color: c.muted }}>{month.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Stats() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()
  const c = useTheme()

  const total = thoughts.length
  const jarCounts = jars
    .map(j => ({ ...j, count: thoughts.filter(t => t.jarId === j.id).length }))
    .sort((a, b) => b.count - a.count)
  const mostUsed = jarCounts[0]
  const sorted = [...thoughts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  const first = sorted[0]
  const latest = sorted[sorted.length - 1]
  const locked = thoughts.filter(t => t.isLocked && new Date(t.unlockAt) > new Date()).length

  const donutSegments = jarCounts
    .filter(j => j.count > 0)
    .map(j => ({ id: j.id, name: j.name, emoji: j.emoji, color: j.color, value: j.count }))

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = dayjs().subtract(5 - i, 'month')
    const key = d.format('YYYY-MM')
    return {
      key,
      label: d.format('MMM'),
      count: thoughts.filter(t => dayjs(t.createdAt).format('YYYY-MM') === key).length,
    }
  })

  const activeDays = new Set(thoughts.map(t => dayjs(t.createdAt).format('YYYY-MM-DD'))).size
  const avgWords = total > 0
    ? Math.round(thoughts.reduce((sum, t) => sum + t.text.trim().split(/\s+/).filter(Boolean).length, 0) / total)
    : 0
  const spanDays = first && latest
    ? Math.max(1, dayjs(latest.createdAt).diff(dayjs(first.createdAt), 'day') + 1)
    : 0

  return (
    <div className="subpage" style={{ background: c.bg, color: c.text }}>
      <AppHeader />
      <div className="subpage-inner">
        <div className="subpage-header">
          <button className="subpage-back" style={{ color: c.muted }} onClick={() => navigate('/')} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h2 style={{ color: c.text }}>Your Stats</h2>
        </div>

        <div className="stats-grid">
          {[
            { label: 'Total thoughts', value: total },
            { label: 'Jars on shelf', value: jars.length },
            { label: 'Time capsules', value: locked },
            { label: 'Most used jar', value: mostUsed?.count ? `${mostUsed.emoji} ${mostUsed.name}` : '—', small: true },
          ].map(item => (
            <div key={item.label} className="subpage-card" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
              <div style={{
                fontSize: item.small ? 'clamp(15px, 2vw, 18px)' : 'clamp(26px, 4vw, 30px)',
                fontWeight: 600,
                color: c.text,
                fontFamily: 'Playfair Display, serif',
                marginBottom: '5px',
                lineHeight: 1.1,
                wordBreak: 'break-word',
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: '12px', color: c.muted }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="stats-body">
          <div className="stats-left">
            {first && (
              <div className="subpage-card stats-date-row" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                <div>
                  <div style={{ fontSize: '11px', color: c.muted, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>First thought</div>
                  <div style={{ fontSize: '15px', color: c.text, fontWeight: 500 }}>{dayjs(first.createdAt).format('MMM D, YYYY')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: c.muted, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest thought</div>
                  <div style={{ fontSize: '15px', color: c.text, fontWeight: 500 }}>{dayjs(latest.createdAt).format('MMM D, YYYY')}</div>
                </div>
              </div>
            )}

            <div className="subpage-card" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
              <SectionTitle color={c.muted}>Jar mix</SectionTitle>
              <DonutChart segments={donutSegments} total={total} centerLabel="thoughts" c={c} />
            </div>

            <div className="subpage-card" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
              <SectionTitle color={c.muted}>Writing activity</SectionTitle>
              {total === 0 ? (
                <div className="subpage-empty" style={{ color: c.muted, padding: '24px 0' }}>
                  Your monthly chart will appear here
                </div>
              ) : (
                <ActivityChart months={months} c={c} accent={c.accent} />
              )}
            </div>

            <div className="subpage-card" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
              <SectionTitle color={c.muted}>At a glance</SectionTitle>
              <div className="stats-insight-grid">
                {[
                  { label: 'Active days', value: activeDays },
                  { label: 'Avg words', value: avgWords || '—' },
                  { label: 'Journey span', value: spanDays ? `${spanDays}d` : '—' },
                  { label: 'Locked away', value: locked },
                ].map(item => (
                  <div key={item.label} className="stats-insight-item" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <div className="stats-insight-value" style={{ color: c.text }}>{item.value}</div>
                    <div className="stats-insight-label" style={{ color: c.muted }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="subpage-card" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
            <SectionTitle color={c.muted}>Thoughts per jar</SectionTitle>
            {total === 0 ? (
              <div className="subpage-empty" style={{ color: c.muted, padding: '40px 0' }}>No thoughts yet. Start writing!</div>
            ) : (
              jarCounts.map(jar => (
                <div key={jar.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: c.text, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{jar.emoji} {jar.name}</span>
                    <span style={{ fontSize: '12px', color: c.muted, fontWeight: 600, flexShrink: 0 }}>{jar.count}</span>
                  </div>
                  <div style={{ height: '9px', background: c.border, borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: total > 0 ? `${Math.round(jar.count / total * 100)}%` : '0%', background: jar.color, borderRadius: '5px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}