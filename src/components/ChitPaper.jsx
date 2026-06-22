// Updated ChitPaper — shows drag targets as overlays while dragging

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ChitPaper({ thought, jar, onDrop, onClose, t }) {
  const [dragging, setDragging] = useState(false)

  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200,
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
        }}
      />

      {/* Drop zone overlays — only visible while dragging */}
      <AnimatePresence>
        {dragging && (
          <>
            {/* Fire — bottom left */}
            <motion.div
              id="drop-fire"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute', bottom: '40px', left: '40px',
                zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                pointerEvents: 'none',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(255,107,0,0.15)',
                border: '2px dashed rgba(255,107,0,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px',
              }}>
                🔥
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255,107,0,0.9)', fontWeight: 600 }}>
                Delete forever
              </span>
            </motion.div>

            {/* Archive — bottom right */}
            <motion.div
              id="drop-archive"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'absolute', bottom: '40px', right: '40px',
                zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                pointerEvents: 'none',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(100,120,180,0.15)',
                border: '2px dashed rgba(100,120,180,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '36px',
              }}>
                📦
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(120,140,200,0.9)', fontWeight: 600 }}>
                Archive
              </span>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Draggable chit */}
      <motion.div
        drag
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={(_, info) => {
          setDragging(false)
          onDrop(info.point)
        }}
        style={{ position: 'relative', zIndex: 20, cursor: 'grab', width: '280px' }}
      >
        {/* Hint — only when not dragging */}
        {!dragging && (
          <div style={{
            textAlign: 'center', marginBottom: '10px',
            fontSize: '11px', color: 'rgba(255,255,255,0.75)',
          }}>
            drag to delete or archive
          </div>
        )}

        <div style={{
          background: t.chitBg,
          borderRadius: '10px', padding: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          border: `1px solid ${t.chitBorder}`,
          backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${t.chitLines} 27px, ${t.chitLines} 28px)`,
          backgroundSize: '100% 28px', minHeight: '160px',
        }}>
          <div style={{ fontSize: '11px', color: '#B5804A', marginBottom: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {jar?.emoji} {jar?.name}
          </div>
          <p style={{ fontSize: '15px', lineHeight: '28px', color: t.panelText, fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-wrap' }}>
            {thought.text}
          </p>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: `1px solid ${t.panelBorder}`, fontSize: '11px', color: t.panelMuted }}>
            {new Date(thought.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            {' · '}
            {new Date(thought.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}