import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import dayjs from 'dayjs'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

export default function Stats() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { thoughts } = useThoughts()

  const total = thoughts.length
  const jarCounts = jars.map(j=>({...j,count:thoughts.filter(t=>t.jarId===j.id).length})).sort((a,b)=>b.count-a.count)
  const mostUsed = jarCounts[0]
  const sorted = [...thoughts].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
  const first = sorted[0]
  const latest = sorted[sorted.length-1]
  const locked = thoughts.filter(t=>t.isLocked&&new Date(t.unlockAt)>new Date()).length

  return (
    <div style={{minHeight:'100vh',background:'var(--bg, #F9F5EE)',color:'var(--text, #2C2416)'}}>
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'0 16px 40px'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'24px 0 20px'}}>
          <button onClick={()=>navigate('/')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted,#7A6A52)',padding:'4px'}}>
            <ArrowLeft size={20}/>
          </button>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:600,color:'var(--text,#2C2416)'}}>
            Your Stats
          </h2>
        </div>

        {/* Top stat cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px',marginBottom:'16px'}}>
          {[
            {label:'Total thoughts',value:total,emoji:'📝'},
            {label:'Jars on shelf',value:jars.length,emoji:'🫙'},
            {label:'Time capsules',value:locked,emoji:'🔒'},
            {label:'Most used',value:mostUsed?`${mostUsed.emoji} ${mostUsed.name}`:'—',emoji:null,small:true},
          ].map(item=>(
            <div key={item.label} style={{background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'16px',padding:'16px 14px'}}>
              <div style={{fontSize:item.small?'16px':'28px',fontWeight:600,color:'var(--text,#2C2416)',fontFamily:'Playfair Display,serif',marginBottom:'4px',lineHeight:1.2}}>
                {item.value}
              </div>
              <div style={{fontSize:'12px',color:'var(--muted,#7A6A52)'}}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Date range */}
        {first&&(
          <div style={{background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'16px',padding:'16px',marginBottom:'16px',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <div style={{fontSize:'11px',color:'var(--muted,#7A6A52)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>First thought</div>
              <div style={{fontSize:'14px',color:'var(--text,#2C2416)',fontWeight:500}}>{dayjs(first.createdAt).format('MMM D, YYYY')}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'11px',color:'var(--muted,#7A6A52)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Latest</div>
              <div style={{fontSize:'14px',color:'var(--text,#2C2416)',fontWeight:500}}>{dayjs(latest.createdAt).format('MMM D, YYYY')}</div>
            </div>
          </div>
        )}

        {/* Per jar bar chart */}
        <div style={{background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'16px',padding:'18px',marginBottom:'16px'}}>
          <div style={{fontSize:'12px',color:'var(--muted,#7A6A52)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'16px'}}>Thoughts per jar</div>
          {total===0?(
            <div style={{textAlign:'center',color:'var(--muted,#7A6A52)',fontSize:'14px',padding:'20px 0'}}>No thoughts yet</div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {jarCounts.map(jar=>(
                <div key={jar.id}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'5px'}}>
                    <span style={{fontSize:'13px',color:'var(--text,#2C2416)'}}>{jar.emoji} {jar.name}</span>
                    <span style={{fontSize:'12px',color:'var(--muted,#7A6A52)',fontWeight:600}}>{jar.count}</span>
                  </div>
                  <div style={{height:'8px',background:'var(--border,rgba(44,36,22,0.1))',borderRadius:'4px',overflow:'hidden'}}>
                    <div style={{height:'100%',width:total>0?`${Math.round(jar.count/total*100)}%`:'0%',background:jar.color,borderRadius:'4px',transition:'width 0.6s ease'}}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {total===0&&(
          <div style={{textAlign:'center',color:'var(--muted,#7A6A52)',fontSize:'14px',padding:'20px'}}>
            No thoughts yet. Start writing!
          </div>
        )}
      </div>
    </div>
  )
}