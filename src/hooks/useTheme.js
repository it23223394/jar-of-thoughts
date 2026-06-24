import { useState, useEffect } from 'react'

const THEMES = {
  amber: {
    light: { bg:'#FDF6E3', surface:'#FFFDF8', text:'#2C2416', muted:'#7A6A52', accent:'#B5804A', border:'rgba(44,36,22,0.1)', card:'#FEFCF4', lines:'rgba(44,36,22,0.06)' },
    dark:  { bg:'#1A0F08', surface:'#1E1510', text:'#F5ECD8', muted:'#A08060', accent:'#C4904A', border:'rgba(245,236,216,0.1)', card:'#26180E', lines:'rgba(245,236,216,0.04)' },
  },
  sage: {
    light: { bg:'#F0F7F1', surface:'#F7FBF7', text:'#1A2E1C', muted:'#4E6E52', accent:'#4E7254', border:'rgba(26,46,28,0.1)', card:'#F2F8F2', lines:'rgba(26,46,28,0.06)' },
    dark:  { bg:'#0A1A0C', surface:'#0E1E10', text:'#D8F0DA', muted:'#6E9472', accent:'#4E7254', border:'rgba(216,240,218,0.1)', card:'#162018', lines:'rgba(216,240,218,0.04)' },
  },
  rose: {
    light: { bg:'#FDF0F1', surface:'#FFF8F8', text:'#2E1418', muted:'#7A5258', accent:'#B5606A', border:'rgba(46,20,24,0.1)', card:'#FEF4F4', lines:'rgba(46,20,24,0.06)' },
    dark:  { bg:'#1A080A', surface:'#1E100E', text:'#F5D8DC', muted:'#A06068', accent:'#C4606A', border:'rgba(245,216,220,0.1)', card:'#26120E', lines:'rgba(245,216,220,0.04)' },
  },
  slate: {
    light: { bg:'#EEF2F7', surface:'#F5F8FC', text:'#101E2E', muted:'#4E6480', accent:'#4E6480', border:'rgba(16,30,46,0.1)', card:'#EFF4FA', lines:'rgba(16,30,46,0.06)' },
    dark:  { bg:'#080E16', surface:'#0C1420', text:'#D0DFF0', muted:'#6080A0', accent:'#4E6480', border:'rgba(208,223,240,0.1)', card:'#101C2A', lines:'rgba(208,223,240,0.04)' },
  },
  lavender: {
    light: { bg:'#F4F0FC', surface:'#FAF7FF', text:'#1E1430', muted:'#6A5880', accent:'#6E5E9A', border:'rgba(30,20,48,0.1)', card:'#F5F0FF', lines:'rgba(30,20,48,0.06)' },
    dark:  { bg:'#0E0818', surface:'#120C20', text:'#E0D8F8', muted:'#8878B0', accent:'#6E5E9A', border:'rgba(224,216,248,0.1)', card:'#1A1030', lines:'rgba(224,216,248,0.04)' },
  },
}

export function useTheme() {
  const [themeName, setThemeName] = useState(() => localStorage.getItem('jot_theme') || 'amber')
  const [dark, setDark] = useState(() => localStorage.getItem('jot_dark') === 'true')

  useEffect(() => {
    function onStorage() {
      setThemeName(localStorage.getItem('jot_theme') || 'amber')
      setDark(localStorage.getItem('jot_dark') === 'true')
    }
    window.addEventListener('storage', onStorage)
    // also poll every 300ms so same-tab changes propagate
    const id = setInterval(onStorage, 300)
    return () => { window.removeEventListener('storage', onStorage); clearInterval(id) }
  }, [])

  const palette = THEMES[themeName] || THEMES.amber
  return dark ? palette.dark : palette.light
}