import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react'
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

  const results = query.trim().length < 2 ? []
    : thoughts.filter(t=>!t.isLocked&&t.text.toLowerCase().includes(query.toLowerCase()))

  const grouped = jars.map(jar=>({jar,thoughts:results.filter(t=>t.jarId===jar.id)})).filter(g=>g.thoughts.length>0)

  return (
    <div style={{minHeight:'100vh',background:'var(--bg,#F9F5EE)',color:'var(--text,#2C2416)'}}>
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'0 16px 40px'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'24px 0 16px'}}>
          <button onClick={()=>navigate('/')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted,#7A6A52)',padding:'4px'}}>
            <ArrowLeft size={20}/>
          </button>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:600,color:'var(--text,#2C2416)'}}>Search</h2>
        </div>

        {/* Search input */}
        <div style={{display:'flex',alignItems:'center',gap:'10px',background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'16px',padding:'13px 16px',marginBottom:'20px'}}>
          <SearchIcon size={16} color="var(--muted,#7A6A52)"/>
          <input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your thoughts..."
            style={{flex:1,background:'none',border:'none',outline:'none',fontSize:'15px',color:'var(--text,#2C2416)',fontFamily:'Inter,sans-serif'}}/>
          {query&&<button onClick={()=>setQuery('')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted,#7A6A52)',padding:'2px'}}><X size={14}/></button>}
        </div>

        {/* Results */}
        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {query.trim().length>=2&&results.length===0&&(
            <div style={{textAlign:'center',color:'var(--muted,#7A6A52)',fontSize:'14px',padding:'40px 0',lineHeight:'1.7'}}>
              No thoughts found for<br/><strong>"{query}"</strong>
            </div>
          )}
          {grouped.map(({jar,thoughts:ts})=>(
            <div key={jar.id}>
              <div style={{fontSize:'12px',color:'var(--muted,#7A6A52)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'10px',display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{width:'10px',height:'10px',borderRadius:'50%',background:jar.color,display:'inline-block'}}/>
                {jar.emoji} {jar.name}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {ts.map(thought=>(
                  <div key={thought.id} onClick={()=>navigate(`/chit/${thought.id}`)}
                    style={{background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'14px',padding:'14px 16px',cursor:'pointer'}}>
                    <div style={{fontSize:'14px',color:'var(--text,#2C2416)',lineHeight:'1.5',marginBottom:'6px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                      {thought.text}
                    </div>
                    <div style={{fontSize:'11px',color:'var(--muted,#7A6A52)'}}>{dayjs(thought.createdAt).fromNow()}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {query.trim().length<2&&(
            <div style={{textAlign:'center',color:'var(--muted,#7A6A52)',fontSize:'13px',padding:'40px 0',lineHeight:'1.8'}}>
              Type at least 2 characters<br/>to search your thoughts
            </div>
          )}
        </div>
      </div>
    </div>
  )
}