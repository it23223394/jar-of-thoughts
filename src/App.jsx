import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import JarView from './screens/JarView'
import ChitView from './screens/ChitView'
import Write from './screens/Write'
import Stats from './screens/Stats'
import Search from './screens/Search'
import Archive from './screens/Archive'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
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