import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, RotateCcw } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'framer-motion'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'

dayjs.extend(relativeTime)

export default function Archive() {
  const navigate = useNavigate()
  const { jars } = useJars()
  const { archive, restoreFromArchive, deleteFromArchive } = useThoughts()

  function getJar(jarId){return jars.find(j=>j.id===jarId)}

  return (
    <div style={{minHeight:'100vh',background:'var(--bg,#F9F5EE)',color:'var(--text,#2C2416)'}}>
      <div style={{maxWidth:'480px',margin:'0 auto',padding:'0 16px 40px'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',padding:'24px 0 20px'}}>
          <button onClick={()=>navigate('/')} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted,#7A6A52)',padding:'4px'}}>
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'22px',fontWeight:600,color:'var(--text,#2C2416)'}}>Archive</h2>
            <p style={{fontSize:'12px',color:'var(--muted,#7A6A52)',marginTop:'2px'}}>{archive.length} thought{archive.length!==1?'s':''} stored</p>
          </div>
        </div>

        {archive.length===0?(
          <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted,#7A6A52)',fontSize:'14px',lineHeight:'1.8'}}>
            📦<br/><br/>Your archive is empty.<br/>
            <span style={{fontSize:'13px',opacity:0.7}}>Archived thoughts will appear here.</span>
          </div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[...archive].reverse().map((thought,i)=>{
              const jar=getJar(thought.jarId)
              return(
                <motion.div key={thought.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.04,duration:0.3}}
                  style={{background:'var(--surface,#FFFDF8)',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'16px',padding:'16px'}}>
                  {jar&&(
                    <div style={{fontSize:'11px',color:'var(--muted,#7A6A52)',marginBottom:'8px',display:'flex',alignItems:'center',gap:'6px'}}>
                      <span style={{width:'8px',height:'8px',borderRadius:'50%',background:jar.color,display:'inline-block'}}/>
                      {jar.emoji} {jar.name}
                    </div>
                  )}
                  <div style={{fontSize:'14px',color:'var(--text,#2C2416)',lineHeight:'1.6',marginBottom:'12px'}}>
                    {thought.text}
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid var(--border,rgba(44,36,22,0.1))',paddingTop:'12px',flexWrap:'wrap',gap:'8px'}}>
                    <div style={{fontSize:'11px',color:'var(--muted,#7A6A52)'}}>
                      {dayjs(thought.createdAt).format('MMM D, YYYY')} · {dayjs(thought.createdAt).fromNow()}
                    </div>
                    <div style={{display:'flex',gap:'8px'}}>
                      <button onClick={()=>restoreFromArchive(thought.id)}
                        style={{background:'none',border:'1px solid var(--border,rgba(44,36,22,0.1))',borderRadius:'10px',padding:'6px 10px',cursor:'pointer',color:'var(--muted,#7A6A52)',display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',fontFamily:'Inter,sans-serif'}}>
                        <RotateCcw size={12}/> Restore
                      </button>
                      <button onClick={()=>deleteFromArchive(thought.id)}
                        style={{background:'none',border:'1px solid rgba(220,50,50,0.3)',borderRadius:'10px',padding:'6px 10px',cursor:'pointer',color:'#e05555',display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',fontFamily:'Inter,sans-serif'}}>
                        <Trash2 size={12}/> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}