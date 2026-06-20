import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, SearchIcon } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

dayjs.extend(relativeTime)

export default function Search() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()
  const [query, setQuery] = useState('')

  const results = query.trim().length < 2
    ? []
    : thoughts.filter(t =>
        !t.isLocked &&
        t.text.toLowerCase().includes(query.toLowerCase())
      )

  // Group by jar
  const grouped = jars.map(jar => ({
    jar,
    thoughts: results.filter(t => t.jarId === jar.id),
  })).filter(g => g.thoughts.length > 0)

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
          Search
        </h2>
      </div>

      {/* Search input */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '14px', padding: '12px 16px',
        }}>
          <SearchIcon size={16} color="var(--muted)" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your thoughts..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: '15px', color: 'var(--text)', fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {query.trim().length >= 2 && results.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '14px', padding: '40px 0' }}>
            No thoughts found for "{query}"
          </div>
        )}

        {grouped.map(({ jar, thoughts: ts }) => (
          <div key={jar.id}>
            <div style={{
              fontSize: '12px', color: 'var(--muted)',
              textTransform: 'uppercase', letterSpacing: '0.05em',
              marginBottom: '8px',
            }}>
              {jar.emoji} {jar.name}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ts.map(thought => (
                <div
                  key={thought.id}
                  onClick={() => navigate(`/chit/${thought.id}`)}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '12px 14px', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    fontSize: '14px', color: 'var(--text)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {thought.text}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                    {dayjs(thought.createdAt).fromNow()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {query.trim().length < 2 && (
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px', padding: '40px 0', lineHeight: '1.7' }}>
            Type at least 2 characters<br />to search your thoughts
          </div>
        )}

      </div>
    </div>
  )
}
