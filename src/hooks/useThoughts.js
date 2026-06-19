import { useState } from 'react'

function loadThoughts() {
  const stored = localStorage.getItem('jot_thoughts')
  return stored ? JSON.parse(stored) : []
}

function loadArchive() {
  const stored = localStorage.getItem('jot_archive')
  return stored ? JSON.parse(stored) : []
}

export function useThoughts() {
  const [thoughts, setThoughts] = useState(() => loadThoughts())
  const [archive, setArchive] = useState(() => loadArchive())

  function save(updated) {
    setThoughts(updated)
    localStorage.setItem('jot_thoughts', JSON.stringify(updated))
  }

  function saveArchive(updated) {
    setArchive(updated)
    localStorage.setItem('jot_archive', JSON.stringify(updated))
  }

  function addThought({ text, jarId, isLocked = false, unlockAt = null }) {
    const thought = {
      id: crypto.randomUUID(),
      text,
      jarId,
      createdAt: new Date().toISOString(),
      isLocked,
      unlockAt,
    }
    save([...thoughts, thought])
    return thought
  }

  function deleteThought(id) {
    save(thoughts.filter(t => t.id !== id))
  }

  function archiveThought(id) {
    const thought = thoughts.find(t => t.id === id)
    if (!thought) return
    save(thoughts.filter(t => t.id !== id))
    saveArchive([...archive, thought])
  }

  function moveThought(id, newJarId) {
    save(thoughts.map(t => t.id === id ? { ...t, jarId: newJarId } : t))
  }

  function unlockDueThoughts() {
    const now = new Date()
    const updated = thoughts.map(t => {
      if (t.isLocked && t.unlockAt && new Date(t.unlockAt) <= now) {
        return { ...t, isLocked: false }
      }
      return t
    })
    save(updated)
    return updated.filter(t => !t.isLocked && thoughts.find(old => old.id === t.id)?.isLocked)
  }

  function restoreFromArchive(id) {
    const thought = archive.find(t => t.id === id)
    if (!thought) return
    saveArchive(archive.filter(t => t.id !== id))
    save([...thoughts, thought])
  }

  function deleteFromArchive(id) {
    saveArchive(archive.filter(t => t.id !== id))
  }

  return {
    thoughts,
    archive,
    addThought,
    deleteThought,
    archiveThought,
    moveThought,
    unlockDueThoughts,
    restoreFromArchive,
    deleteFromArchive,
  }
}