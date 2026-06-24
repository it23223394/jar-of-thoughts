import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BarChart2, Palette, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

// Same 5 themes as Home.jsx's THEMES object — just the bits the
// picker needs (key, display name, swatch color).
const THEME_SWATCHES = [
  { key: 'amber', name: 'Amber', swatch: '#C4964A' },
  { key: 'sage', name: 'Sage', swatch: '#6B8F71' },
  { key: 'rose', name: 'Rose', swatch: '#C4727A' },
  { key: 'slate', name: 'Slate', swatch: '#6A7F9A' },
  { key: 'lavender', name: 'Lavender', swatch: '#8B7AB8' },
]

// Shared top bar for non-Home screens (Archive, Stats, Search, ...).
// Home.jsx keeps its own independent version of this bar — this
// component exists so every *other* screen can show the same bar
// without duplicating the logic. It writes to the same localStorage
// keys ('jot_dark' / 'jot_theme') that useTheme.js polls, so toggling
// here stays in sync with the rest of the app.
export default function AppHeader() {
  const navigate = useNavigate()
  const c = useTheme()
  const [dark, setDark] = useState(() => localStorage.getItem('jot_dark') === 'true')
  const [themeName, setThemeName] = useState(() => localStorage.getItem('jot_theme') || 'amber')
  const [showThemePicker, setShowThemePicker] = useState(false)

  function toggleDark() {
    const n = !dark
    setDark(n)
    localStorage.setItem('jot_dark', String(n))
  }

  function selectTheme(key) {
    setThemeName(key)
    localStorage.setItem('jot_theme', key)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 0', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: '20px', fontWeight: 600, color: c.text, lineHeight: 1.2, transition: 'color 0.3s' }}>
            Jar of Thoughts
          </h1>
          <p style={{ fontSize: '11px', color: c.muted, marginTop: '1px', transition: 'color 0.3s' }}>your quiet corner</p>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={() => navigate('/search')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.muted, padding: '6px' }}>
            <Search size={17} />
          </button>
          <button onClick={() => navigate('/stats')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.muted, padding: '6px' }}>
            <BarChart2 size={17} />
          </button>
          <button
            onClick={() => setShowThemePicker(true)}
            style={{ background: c.border, border: 'none', borderRadius: '20px', padding: '5px 9px', cursor: 'pointer', color: c.muted, display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
          >
            <Palette size={15} />
          </button>
          <button
            onClick={toggleDark}
            style={{ background: c.border, border: 'none', borderRadius: '20px', padding: '5px 9px', cursor: 'pointer', color: c.muted, display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showThemePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) setShowThemePicker(false) }}
            style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)' }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ background: c.surface, borderRadius: '24px 24px 0 0', padding: '20px 20px 40px', width: '100%', maxWidth: '480px' }}
            >
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 80 }}
                dragElastic={0.2}
                onDragEnd={(_, i) => { if (i.offset.y > 60) setShowThemePicker(false) }}
                style={{ width: '48px', height: '5px', borderRadius: '3px', background: c.border, margin: '0 auto 20px', cursor: 'grab', touchAction: 'none' }}
              />
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '18px', color: c.text, marginBottom: '20px' }}>Choose a theme</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px' }}>
                {THEME_SWATCHES.map(th => (
                  <button
                    key={th.key}
                    onClick={() => { selectTheme(th.key); setShowThemePicker(false) }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '12px', outline: themeName === th.key ? `2px solid ${th.swatch}` : 'none' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: th.swatch, border: `3px solid ${th.swatch}`, boxShadow: `0 2px 8px ${th.swatch}44` }} />
                    <span style={{ fontSize: '11px', color: c.muted, fontWeight: themeName === th.key ? 600 : 400 }}>{th.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}