import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import { useTheme } from '../hooks/useTheme'
import AppHeader from '../components/AppHeader'

dayjs.extend(relativeTime)

export default function Search() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()
  const c = useTheme()
  const [query, setQuery] = useState('')

  const results = query.trim().length < 2
    ? []
    : thoughts.filter(t => !t.isLocked && t.text.toLowerCase().includes(query.toLowerCase()))

  const grouped = jars
    .map(jar => ({ jar, thoughts: results.filter(t => t.jarId === jar.id) }))
    .filter(g => g.thoughts.length > 0)

  return (
    <div className="subpage" style={{ background: c.bg, color: c.text }}>
      <AppHeader />
      <div className="subpage-inner">
        <div className="subpage-header">
          <button className="subpage-back" style={{ color: c.muted }} onClick={() => navigate('/')} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h2 style={{ color: c.text }}>Search</h2>
        </div>

        <div className="subpage-search-box" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <SearchIcon size={18} color={c.muted} />
          <input
            autoFocus
            style={{ color: c.text }}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your thoughts..."
          />
          {query && (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.muted, padding: '2px', display: 'flex', flexShrink: 0 }} onClick={() => setQuery('')}>
              <X size={15} />
            </button>
          )}
        </div>

        {query.trim().length >= 2 && results.length === 0 && (
          <div className="subpage-empty" style={{ color: c.muted }}>
            No thoughts found for<br /><strong>&ldquo;{query}&rdquo;</strong>
          </div>
        )}

        <div className="search-sections">
          {grouped.map(({ jar, thoughts: ts }) => (
            <div key={jar.id}>
              <div style={{ fontSize: '12px', color: c.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: jar.color, display: 'inline-block', flexShrink: 0 }} />
                {jar.emoji} {jar.name} · {ts.length}
              </div>
              {ts.map(thought => (
                <div
                  key={thought.id}
                  className="subpage-card"
                  style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '16px', cursor: 'pointer', marginBottom: '8px' }}
                  onClick={() => navigate(`/chit/${thought.id}`)}
                >
                  <div style={{ fontSize: '14px', color: c.text, lineHeight: '1.55', marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {thought.text}
                  </div>
                  <div style={{ fontSize: '11px', color: c.muted }}>{dayjs(thought.createdAt).fromNow()}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {query.trim().length < 2 && (
          <div className="subpage-empty" style={{ color: c.muted }}>
            Type at least 2 characters<br />to search your thoughts
          </div>
        )}
      </div>
    </div>
  )
}