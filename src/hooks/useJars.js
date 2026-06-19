import { useState } from 'react'

const DEFAULT_JARS = [
  { id: 'love', name: 'Love', emoji: '❤️', color: '#f4b8cb' },
  { id: 'life', name: 'Life', emoji: '🌿', color: '#a8d5a2' },
  { id: 'sadness', name: 'Sadness', emoji: '🌧', color: '#9ec5e8' },
  { id: 'neutral', name: 'Neutral Thoughts', emoji: '☁️', color: '#c8c8c8' },
  { id: 'dreams', name: 'Dreams', emoji: '✨', color: '#c5b8f0' },
  { id: 'gratitude', name: 'Gratitude', emoji: '🌻', color: '#f5cc7a' },
  { id: 'unsent', name: 'Unsent Words', emoji: '🔥', color: '#f0a890' },
]

function loadJars() {
  const stored = localStorage.getItem('jot_jars')
  if (stored) return JSON.parse(stored)
  localStorage.setItem('jot_jars', JSON.stringify(DEFAULT_JARS))
  return DEFAULT_JARS
}

export function useJars() {
  const [jars, setJars] = useState(() => loadJars())

  function addJar(jar) {
    const updated = [...jars, { ...jar, id: crypto.randomUUID() }]
    setJars(updated)
    localStorage.setItem('jot_jars', JSON.stringify(updated))
  }

  function deleteJar(id) {
    const updated = jars.filter(j => j.id !== id)
    setJars(updated)
    localStorage.setItem('jot_jars', JSON.stringify(updated))
  }

  return { jars, addJar, deleteJar }
}