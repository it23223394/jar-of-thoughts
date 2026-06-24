import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { App as CapacitorApp } from '@capacitor/app'
import Home from './screens/Home'
import JarView from './screens/JarView'
import ChitView from './screens/ChitView'
import Write from './screens/Write'
import Stats from './screens/Stats'
import Search from './screens/Search'
import Archive from './screens/Archive'

// Handles Android's hardware/gesture back action.
// Without this, the WebView has no idea your React Router routes
// exist, so pressing back from any screen other than Home just
// exits the app instead of going back one step.
function AndroidBackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const listener = CapacitorApp.addListener('backButton', () => {
      if (location.pathname === '/') {
        // Already home — back button behaves like a normal Android app and exits.
        CapacitorApp.exitApp()
      } else {
        navigate(-1)
      }
    })
    return () => { listener.remove() }
  }, [location, navigate])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
        <AndroidBackButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jar/:jarId" element={<JarView />} />
          <Route path="/chit/:thoughtId" element={<ChitView />} />
          <Route path="/write" element={<Write />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/search" element={<Search />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}