import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Search, Moon, Sun, Palette, Plus, X, Pencil, Trash2 } from 'lucide-react'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import JarSVG from '../components/JarSVG'
import { ChitPaper } from '../components/ChitPaper'

// ─── Themes ──────────────────────────────────────────────────
const THEMES = {
  amber:    { name:'Amber',    swatch:'#C4964A', light:{pageBg:'linear-gradient(180deg,#FDF6E3,#F5E6C8,#EDD9A3)',shelfBg:'linear-gradient(180deg,#C4964A,#A07830)',shelfBorder:'#D4A855',shelfShadow:'rgba(100,60,20,0.25)',woodGrain:'rgba(0,0,0,0.07)',titleColor:'#2C1810',subtitleColor:'rgba(44,24,16,0.5)',iconColor:'rgba(44,24,16,0.45)',jarLabelActive:'#8B5E34',jarLabel:'rgba(44,24,16,0.5)',hintText:'rgba(44,24,16,0.3)',panelBg:'#FFFDF8',panelText:'#2C2416',panelMuted:'#7A6A52',panelBorder:'rgba(44,36,22,0.1)',panelHandle:'rgba(44,36,22,0.15)',chitBg:'#FEFCF4',chitBorder:'rgba(44,36,22,0.1)',chitLines:'rgba(44,36,22,0.06)',writeBtnBg:'#B5804A',closeBtnBg:'rgba(44,36,22,0.08)',closeBtnColor:'#7A6A52',toggleBg:'rgba(44,36,22,0.08)',labelInk:'rgba(60,30,10,0.8)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',lowerShelfBg:'linear-gradient(180deg,#B08040,#8B6020)',lowerShelfBorder:'#C49040'},dark:{pageBg:'linear-gradient(180deg,#1A0F08,#2C1810,#3D2314)',shelfBg:'linear-gradient(180deg,#6B4423,#4A2E16)',shelfBorder:'#8B5E34',shelfShadow:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.15)',titleColor:'#F5ECD8',subtitleColor:'rgba(245,236,216,0.45)',iconColor:'rgba(245,236,216,0.55)',jarLabelActive:'#F5CC7A',jarLabel:'rgba(245,236,216,0.5)',hintText:'rgba(245,236,216,0.25)',panelBg:'#1E1510',panelText:'#F5ECD8',panelMuted:'#A08060',panelBorder:'rgba(245,236,216,0.1)',panelHandle:'rgba(245,236,216,0.15)',chitBg:'#26180E',chitBorder:'rgba(245,236,216,0.08)',chitLines:'rgba(245,236,216,0.04)',writeBtnBg:'#C4904A',closeBtnBg:'rgba(245,236,216,0.08)',closeBtnColor:'#A08060',toggleBg:'rgba(245,236,216,0.08)',labelInk:'rgba(245,220,180,0.85)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.15)',lowerShelfBg:'linear-gradient(180deg,#5C3A1E,#3D2410)',lowerShelfBorder:'#7A5030'} },
  sage:     { name:'Sage',     swatch:'#6B8F71', light:{pageBg:'linear-gradient(180deg,#F0F7F1,#E0EDE2,#C8DFC9)',shelfBg:'linear-gradient(180deg,#6B8F71,#4E7254)',shelfBorder:'#82A888',shelfShadow:'rgba(20,60,25,0.2)',woodGrain:'rgba(0,0,0,0.06)',titleColor:'#1A2E1C',subtitleColor:'rgba(26,46,28,0.5)',iconColor:'rgba(26,46,28,0.45)',jarLabelActive:'#3D6043',jarLabel:'rgba(26,46,28,0.5)',hintText:'rgba(26,46,28,0.3)',panelBg:'#F7FBF7',panelText:'#1A2E1C',panelMuted:'#4E6E52',panelBorder:'rgba(26,46,28,0.1)',panelHandle:'rgba(26,46,28,0.15)',chitBg:'#F2F8F2',chitBorder:'rgba(26,46,28,0.1)',chitLines:'rgba(26,46,28,0.06)',writeBtnBg:'#4E7254',closeBtnBg:'rgba(26,46,28,0.08)',closeBtnColor:'#4E6E52',toggleBg:'rgba(26,46,28,0.08)',labelInk:'rgba(20,50,25,0.8)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.05)',lowerShelfBg:'linear-gradient(180deg,#5A7D60,#3D6043)',lowerShelfBorder:'#6E9474'},dark:{pageBg:'linear-gradient(180deg,#0A1A0C,#122016,#1A2E1C)',shelfBg:'linear-gradient(180deg,#2A4A2E,#1A3020)',shelfBorder:'#3D6043',shelfShadow:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.15)',titleColor:'#D8F0DA',subtitleColor:'rgba(216,240,218,0.45)',iconColor:'rgba(216,240,218,0.55)',jarLabelActive:'#A0D4A4',jarLabel:'rgba(216,240,218,0.5)',hintText:'rgba(216,240,218,0.25)',panelBg:'#0E1E10',panelText:'#D8F0DA',panelMuted:'#6E9472',panelBorder:'rgba(216,240,218,0.1)',panelHandle:'rgba(216,240,218,0.15)',chitBg:'#162018',chitBorder:'rgba(216,240,218,0.08)',chitLines:'rgba(216,240,218,0.04)',writeBtnBg:'#4E7254',closeBtnBg:'rgba(216,240,218,0.08)',closeBtnColor:'#6E9472',toggleBg:'rgba(216,240,218,0.08)',labelInk:'rgba(200,240,200,0.8)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.1)',lowerShelfBg:'linear-gradient(180deg,#223A26,#162818)',lowerShelfBorder:'#2E4E32'} },
  rose:     { name:'Rose',     swatch:'#C4727A', light:{pageBg:'linear-gradient(180deg,#FDF0F1,#F5DDE0,#ECC8CC)',shelfBg:'linear-gradient(180deg,#C4727A,#A05560)',shelfBorder:'#D48890',shelfShadow:'rgba(100,20,30,0.2)',woodGrain:'rgba(0,0,0,0.06)',titleColor:'#2E1418',subtitleColor:'rgba(46,20,24,0.5)',iconColor:'rgba(46,20,24,0.45)',jarLabelActive:'#8B4550',jarLabel:'rgba(46,20,24,0.5)',hintText:'rgba(46,20,24,0.3)',panelBg:'#FFF8F8',panelText:'#2E1418',panelMuted:'#7A5258',panelBorder:'rgba(46,20,24,0.1)',panelHandle:'rgba(46,20,24,0.15)',chitBg:'#FEF4F4',chitBorder:'rgba(46,20,24,0.1)',chitLines:'rgba(46,20,24,0.06)',writeBtnBg:'#B5606A',closeBtnBg:'rgba(46,20,24,0.08)',closeBtnColor:'#7A5258',toggleBg:'rgba(46,20,24,0.08)',labelInk:'rgba(60,15,20,0.8)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.05)',lowerShelfBg:'linear-gradient(180deg,#B06070,#8B4550)',lowerShelfBorder:'#C47580'},dark:{pageBg:'linear-gradient(180deg,#1A080A,#2C1014,#3D1820)',shelfBg:'linear-gradient(180deg,#6A2830,#4A1820)',shelfBorder:'#8B3840',shelfShadow:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.15)',titleColor:'#F5D8DC',subtitleColor:'rgba(245,216,220,0.45)',iconColor:'rgba(245,216,220,0.55)',jarLabelActive:'#F5A0A8',jarLabel:'rgba(245,216,220,0.5)',hintText:'rgba(245,216,220,0.25)',panelBg:'#1E100E',panelText:'#F5D8DC',panelMuted:'#A06068',panelBorder:'rgba(245,216,220,0.1)',panelHandle:'rgba(245,216,220,0.15)',chitBg:'#26120E',chitBorder:'rgba(245,216,220,0.08)',chitLines:'rgba(245,216,220,0.04)',writeBtnBg:'#C4606A',closeBtnBg:'rgba(245,216,220,0.08)',closeBtnColor:'#A06068',toggleBg:'rgba(245,216,220,0.08)',labelInk:'rgba(245,200,205,0.85)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.1)',lowerShelfBg:'linear-gradient(180deg,#B06070,#8B4550)',lowerShelfBorder:'#C47580'} },
  slate:    { name:'Slate',    swatch:'#6A7F9A', light:{pageBg:'linear-gradient(180deg,#EEF2F7,#DDE6F0,#C8D6E8)',shelfBg:'linear-gradient(180deg,#6A7F9A,#4E6480)',shelfBorder:'#8090A8',shelfShadow:'rgba(16,30,60,0.2)',woodGrain:'rgba(0,0,0,0.06)',titleColor:'#101E2E',subtitleColor:'rgba(16,30,46,0.5)',iconColor:'rgba(16,30,46,0.45)',jarLabelActive:'#3D5470',jarLabel:'rgba(16,30,46,0.5)',hintText:'rgba(16,30,46,0.3)',panelBg:'#F5F8FC',panelText:'#101E2E',panelMuted:'#4E6480',panelBorder:'rgba(16,30,46,0.1)',panelHandle:'rgba(16,30,46,0.15)',chitBg:'#EFF4FA',chitBorder:'rgba(16,30,46,0.1)',chitLines:'rgba(16,30,46,0.06)',writeBtnBg:'#4E6480',closeBtnBg:'rgba(16,30,46,0.08)',closeBtnColor:'#4E6480',toggleBg:'rgba(16,30,46,0.08)',labelInk:'rgba(10,20,40,0.8)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.05)',lowerShelfBg:'linear-gradient(180deg,#5A6E88,#3D5470)',lowerShelfBorder:'#6E8098'},dark:{pageBg:'linear-gradient(180deg,#080E16,#101820,#18242E)',shelfBg:'linear-gradient(180deg,#243040,#182030)',shelfBorder:'#304050',shelfShadow:'rgba(0,0,0,0.45)',woodGrain:'rgba(0,0,0,0.15)',titleColor:'#D0DFF0',subtitleColor:'rgba(208,223,240,0.45)',iconColor:'rgba(208,223,240,0.55)',jarLabelActive:'#90B0D8',jarLabel:'rgba(208,223,240,0.5)',hintText:'rgba(208,223,240,0.25)',panelBg:'#0C1420',panelText:'#D0DFF0',panelMuted:'#6080A0',panelBorder:'rgba(208,223,240,0.1)',panelHandle:'rgba(208,223,240,0.15)',chitBg:'#101C2A',chitBorder:'rgba(208,223,240,0.08)',chitLines:'rgba(208,223,240,0.04)',writeBtnBg:'#4E6480',closeBtnBg:'rgba(208,223,240,0.08)',closeBtnColor:'#6080A0',toggleBg:'rgba(208,223,240,0.08)',labelInk:'rgba(180,210,240,0.8)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',lowerShelfBg:'linear-gradient(180deg,#1C2838,#101820)',lowerShelfBorder:'#283848'} },
  lavender: { name:'Lavender', swatch:'#8B7AB8', light:{pageBg:'linear-gradient(180deg,#F4F0FC,#E8E0F5,#D8CCEE)',shelfBg:'linear-gradient(180deg,#8B7AB8,#6E5E9A)',shelfBorder:'#A090C8',shelfShadow:'rgba(40,20,80,0.2)',woodGrain:'rgba(0,0,0,0.06)',titleColor:'#1E1430',subtitleColor:'rgba(30,20,48,0.5)',iconColor:'rgba(30,20,48,0.45)',jarLabelActive:'#5E4E88',jarLabel:'rgba(30,20,48,0.5)',hintText:'rgba(30,20,48,0.3)',panelBg:'#FAF7FF',panelText:'#1E1430',panelMuted:'#6A5880',panelBorder:'rgba(30,20,48,0.1)',panelHandle:'rgba(30,20,48,0.15)',chitBg:'#F5F0FF',chitBorder:'rgba(30,20,48,0.1)',chitLines:'rgba(30,20,48,0.06)',writeBtnBg:'#6E5E9A',closeBtnBg:'rgba(30,20,48,0.08)',closeBtnColor:'#6A5880',toggleBg:'rgba(30,20,48,0.08)',labelInk:'rgba(30,15,50,0.8)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.05)',lowerShelfBg:'linear-gradient(180deg,#7A68A8,#5E4E88)',lowerShelfBorder:'#9080B8'},dark:{pageBg:'linear-gradient(180deg,#0E0818,#180E28,#221638)',shelfBg:'linear-gradient(180deg,#3A2860,#281848)',shelfBorder:'#4E3878',shelfShadow:'rgba(0,0,0,0.45)',woodGrain:'rgba(0,0,0,0.15)',titleColor:'#E0D8F8',subtitleColor:'rgba(224,216,248,0.45)',iconColor:'rgba(224,216,248,0.55)',jarLabelActive:'#B8A8E8',jarLabel:'rgba(224,216,248,0.5)',hintText:'rgba(224,216,248,0.25)',panelBg:'#120C20',panelText:'#E0D8F8',panelMuted:'#8878B0',panelBorder:'rgba(224,216,248,0.1)',panelHandle:'rgba(224,216,248,0.15)',chitBg:'#1A1030',chitBorder:'rgba(224,216,248,0.08)',chitLines:'rgba(224,216,248,0.04)',writeBtnBg:'#6E5E9A',closeBtnBg:'rgba(224,216,248,0.08)',closeBtnColor:'#8878B0',toggleBg:'rgba(224,216,248,0.08)',labelInk:'rgba(210,190,250,0.85)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',lowerShelfBg:'linear-gradient(180deg,#302050,#201040)',lowerShelfBorder:'#3E2868'} },
}

const JAR_EMOJIS = ['🫙','💝','🌿','🌧','☁️','✨','🌻','🔥','🌊','🍃','🌸','🦋','⭐','🌙','☀️','🍀','🎵','🌈','💫','🕊️']
const JAR_COLORS = ['#f4b8cb','#a8d5a2','#9ec5e8','#c8c8c8','#c5b8f0','#f5cc7a','#f0a890','#a8c8f0','#f0d8a8','#c8f0d8','#f0c8e8','#d8c8f0']

// Stone slab — visually separate from wood racks
const ACTION_BAR = {
  light: { bg: 'linear-gradient(180deg,#4A4744,#2E2C2A)', border: '#6B6762', hint: 'rgba(255,255,255,0.5)', delete: '#FF9A5C', archive: '#B8C4D8' },
  dark:  { bg: 'linear-gradient(180deg,#1C1C20,#121216)', border: '#404048', hint: 'rgba(255,255,255,0.45)', delete: '#FF8C42', archive: '#A8B8D0' },
}

// ─── Jar card size constants ──────────────────────────────────
const JAR_W   = 72   // px per jar cell (including gap)
const JAR_GAP = 8
const JAR_CELL = JAR_W + JAR_GAP   // 80px

// ─── FirePit ─────────────────────────────────────────────────
function FirePit() {
  return (
    <svg width="50" height="58" viewBox="0 0 56 64" fill="none">
      <defs><radialGradient id="fgx" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#ff6b00" stopOpacity="0.4"/><stop offset="100%" stopColor="#ff6b00" stopOpacity="0"/></radialGradient></defs>
      <path d="M8 44 Q6 56 28 58 Q50 56 48 44 Z" fill="#5C4A2A" stroke="#3a2e1a" strokeWidth="1"/>
      <path d="M8 44 Q28 48 48 44" fill="none" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="28" y1="58" x2="20" y2="64" stroke="#5C4A2A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="28" y1="58" x2="36" y2="64" stroke="#5C4A2A" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="28" cy="44" rx="18" ry="6" fill="url(#fgx)"/>
      <motion.path d="M20 44 Q18 34 22 28 Q24 22 20 18 Q26 20 26 30 Q28 24 30 18 Q34 24 30 32 Q34 28 36 22 Q40 30 36 40 Q34 44 28 46 Q22 44 20 44Z" fill="#ff6b00" animate={{scaleY:[1,1.08,0.96,1.05,1]}} transition={{duration:1.4,repeat:Infinity,ease:'easeInOut'}} style={{transformOrigin:'28px 44px'}}/>
      <motion.path d="M22 44 Q21 38 24 33 Q25 29 23 26 Q27 28 27 35 Q29 30 31 26 Q34 31 31 38 Q30 42 28 44Z" fill="#ffab00" animate={{scaleY:[1,1.1,0.93,1.06,1]}} transition={{duration:1.1,repeat:Infinity,ease:'easeInOut',delay:0.2}} style={{transformOrigin:'28px 44px'}}/>
      <motion.path d="M24 44 Q24 39 26 36 Q27 33 26 31 Q28 32 28 37 Q30 34 31 31 Q33 35 31 40 Q30 43 28 44Z" fill="#ffe066" animate={{scaleY:[1,1.12,0.9,1.08,1]}} transition={{duration:0.9,repeat:Infinity,ease:'easeInOut',delay:0.1}} style={{transformOrigin:'28px 44px'}}/>
    </svg>
  )
}

function SteelBox({ isOpen }) {
  return (
    <svg width="58" height="54" viewBox="0 0 64 60" fill="none">
      <defs>
        <linearGradient id="sbx" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9CA3AF"/><stop offset="100%" stopColor="#4B5563"/></linearGradient>
        <linearGradient id="slx" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D1D5DB"/><stop offset="100%" stopColor="#9CA3AF"/></linearGradient>
      </defs>
      <rect x="4" y="28" width="56" height="30" rx="3" fill="url(#sbx)" stroke="#374151" strokeWidth="1"/>
      <circle cx="10" cy="34" r="2" fill="#6B7280"/><circle cx="54" cy="34" r="2" fill="#6B7280"/>
      <rect x="6" y="30" width="20" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <motion.g animate={{rotateX:isOpen?-70:0}} transition={{type:'spring',stiffness:200,damping:20}} style={{transformOrigin:'32px 28px'}}>
        <rect x="4" y="14" width="56" height="16" rx="3" fill="url(#slx)" stroke="#374151" strokeWidth="1"/>
        <rect x="6" y="16" width="22" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
        <rect x="22" y="10" width="20" height="6" rx="3" fill="#9CA3AF" stroke="#374151" strokeWidth="0.8"/>
      </motion.g>
      <motion.g animate={{y:isOpen?-4:0,opacity:isOpen?0:1}} transition={{duration:0.3}}>
        <rect x="26" y="26" width="12" height="10" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="0.8"/>
        <path d="M29 26 Q29 22 32 22 Q35 22 35 26" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="32" cy="31" r="1.5" fill="#92400E"/>
      </motion.g>
    </svg>
  )
}

// ─── Handwritten label on jar ─────────────────────────────────
function Label({ name, dark }) {
  return (
    <div style={{
      position:'absolute',bottom:'26%',left:'12%',right:'12%',
      background: dark ? 'rgba(28,22,18,0.92)' : 'rgba(255,252,240,0.92)',
      border: dark ? '1px solid rgba(245,220,180,0.22)' : '1px solid rgba(180,150,100,0.28)',
      borderRadius:'3px',padding:'2px 4px',textAlign:'center',
      boxShadow: dark ? '0 1px 4px rgba(0,0,0,0.35)' : '0 1px 3px rgba(0,0,0,0.08)',
      pointerEvents:'none',transform:'rotate(-1.5deg)',
    }}>
      <span style={{fontSize:'8px',color:dark ? '#FFF4E0' : '#3D2810',fontFamily:"'Caveat','Segoe Script','Bradley Hand',cursive",fontWeight:700,display:'block',lineHeight:1.2,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
        {name.length > 9 ? name.slice(0,9) : name}
      </span>
    </div>
  )
}

// ─── Single Shelf Row ─────────────────────────────────────────
function Shelf({ jars: rowJars, t, dark, openJarId, onJarClick, onJarDoubleClick, onJarLongPress, countFor }) {
  const slots = [...rowJars]
  while (slots.length < 4) slots.push(null)

  return (
    <div style={{marginBottom:'0'}}>
      {/* Plank surface */}
      <div style={{background:t.shelfBg,borderTop:`3px solid ${t.shelfBorder}`,borderBottom:'2px solid rgba(0,0,0,0.18)',padding:'14px 12px 10px',boxShadow:`0 6px 20px ${t.shelfShadow}`,position:'relative',transition:'background 0.4s'}}>
        {/* Wood grain lines */}
        {[10,25,45,65,82,92].map(pct => (
          <div key={pct} style={{position:'absolute',top:0,bottom:0,left:`${pct}%`,width:'1px',background:t.woodGrain,pointerEvents:'none'}}/>
        ))}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4, minmax(0, 1fr))',columnGap:`${JAR_GAP}px`,alignItems:'end'}}>
          {slots.map((jar, i) => (
            jar ? (
              <motion.div
                key={jar.id}
                layout
                initial={{opacity:0,y:16,scale:0.9}}
                animate={{opacity:1,y:0,scale:1}}
                transition={{type:'spring',stiffness:300,damping:24,delay:i*0.04}}
                style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2px',minWidth:0}}
              >
                <div
                  onClick={() => onJarClick(jar)}
                  onDoubleClick={() => onJarDoubleClick(jar)}
                  onContextMenu={e=>{e.preventDefault();onJarLongPress(jar)}}
                  onPointerDown={()=>{
                    const tid=setTimeout(()=>onJarLongPress(jar),600)
                    const up=()=>{clearTimeout(tid);window.removeEventListener('pointerup',up)}
                    window.addEventListener('pointerup',up)
                  }}
                  style={{cursor:'pointer',position:'relative',touchAction:'manipulation',width:`${JAR_W}px`}}
                >
                  <motion.div
                    animate={{y:openJarId===jar.id?-8:0,filter:openJarId===jar.id?'drop-shadow(0 10px 20px rgba(0,0,0,0.35))':'drop-shadow(0 3px 6px rgba(0,0,0,0.15))'}}
                    transition={{type:'spring',stiffness:280,damping:22}}
                    style={{position:'relative',display:'inline-block'}}
                  >
                    <JarSVG color={jar.color} count={countFor(jar.id)} isOpen={openJarId===jar.id} width={JAR_W} height={94}/>
                    <Label name={jar.name} dark={dark}/>
                  </motion.div>
                  {countFor(jar.id) > 0 && (
                    <div style={{position:'absolute',top:'-3px',right:'-3px',background:jar.color,color:'#2C2416',borderRadius:'9px',fontSize:'9px',fontWeight:700,padding:'1px 4px',border:'1.5px solid rgba(255,255,255,0.6)',zIndex:2}}>
                      {countFor(jar.id)}
                    </div>
                  )}
                </div>
                <div style={{fontSize:'11px',color:openJarId===jar.id?t.jarLabelActive:t.jarLabel,transition:'color 0.2s',fontWeight:openJarId===jar.id?600:400}}>
                  {jar.emoji}
                </div>
              </motion.div>
            ) : (
              <div key={`empty-slot-${i}`} style={{height:'106px'}}/>
            )
          ))}
        </div>
      </div>
      {/* Shelf underside / depth */}
      <div style={{height:'6px',background:'rgba(0,0,0,0.18)',borderRadius:'0 0 2px 2px'}}/>
    </div>
  )
}

// ─── Modals ───────────────────────────────────────────────────
function WriteModal({ jar, onSave, onClose, t }) {
  const [text,setText]=useState('')
  const [lock,setLock]=useState(false)
  const [opt,setOpt]=useState('1m')
  function unlockAt(){
    if(!lock)return null
    const n=new Date()
    if(opt==='1m'){n.setMonth(n.getMonth()+1)}
    else if(opt==='3m'){n.setMonth(n.getMonth()+3)}
    else if(opt==='6m'){n.setMonth(n.getMonth()+6)}
    else{n.setFullYear(n.getFullYear()+1)}
    return n.toISOString()
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:'fixed',inset:0,zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px',boxShadow:'0 -8px 40px rgba(0,0,0,0.2)'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2} onDragEnd={(_,i)=>{if(i.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{fontSize:'13px',fontWeight:600,color:t.writeBtnBg,marginBottom:'14px'}}>{jar.emoji} Writing into {jar.name}</div>
        <div style={{background:t.chitBg,border:`1px solid ${t.chitBorder}`,borderRadius:'14px',padding:'14px',marginBottom:'14px',backgroundImage:`repeating-linear-gradient(transparent,transparent 27px,${t.chitLines} 27px,${t.chitLines} 28px)`,backgroundSize:'100% 28px'}}>
          <textarea autoFocus value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind..." style={{width:'100%',minHeight:'130px',background:'none',border:'none',outline:'none',resize:'none',fontSize:'15px',lineHeight:'28px',color:t.panelText,fontFamily:'Inter,sans-serif'}}/>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',marginBottom:'14px',background:t.toggleBg,borderRadius:'12px'}}>
          <span style={{fontSize:'13px',color:t.panelMuted}}>🔒 Lock as time capsule?</span>
          <button onClick={()=>setLock(!lock)} style={{width:'36px',height:'20px',borderRadius:'10px',background:lock?t.writeBtnBg:t.panelHandle,border:'none',cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
            <div style={{width:'14px',height:'14px',borderRadius:'50%',background:'#fff',position:'absolute',top:'3px',left:lock?'19px':'3px',transition:'left 0.2s'}}/>
          </button>
        </div>
        {lock&&<div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'14px'}}>
          {[['1m','1 month'],['3m','3 months'],['6m','6 months'],['1y','1 year']].map(([v,l])=>(
            <button key={v} onClick={()=>setOpt(v)} style={{padding:'5px 12px',borderRadius:'16px',fontSize:'12px',cursor:'pointer',border:`1px solid ${opt===v?t.writeBtnBg:t.panelBorder}`,background:opt===v?t.writeBtnBg:'transparent',color:opt===v?'#fff':t.panelMuted}}>{l}</button>
          ))}
        </div>}
        <motion.button whileTap={{scale:0.97}} onClick={()=>text.trim()&&onSave(text.trim(),lock,unlockAt())} disabled={!text.trim()}
          style={{width:'100%',padding:'14px',borderRadius:'28px',background:text.trim()?t.writeBtnBg:t.panelHandle,color:text.trim()?'#fff':t.panelMuted,border:'none',fontSize:'15px',fontWeight:500,cursor:text.trim()?'pointer':'not-allowed',transition:'all 0.2s'}}>
          Drop into jar ↓
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function JarOptionsModal({ jar, onRename, onDelete, onClose, t }) {
  const [mode,setMode]=useState('menu')
  const [name,setName]=useState(jar.name)
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2} onDragEnd={(_,i)=>{if(i.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <span style={{fontSize:'22px'}}>{jar.emoji}</span>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'18px',color:t.panelText}}>{jar.name}</div>
        </div>
        {mode==='menu'&&<div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <button onClick={()=>setMode('rename')} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,cursor:'pointer',color:t.panelText,fontSize:'14px',fontWeight:500}}><Pencil size={18} color={t.writeBtnBg}/> Rename jar</button>
          <button onClick={()=>setMode('del')} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',borderRadius:'14px',border:'1px solid rgba(220,50,50,0.2)',background:'rgba(220,50,50,0.05)',cursor:'pointer',color:'#e05555',fontSize:'14px',fontWeight:500}}><Trash2 size={18}/> Delete jar</button>
          <button onClick={onClose} style={{padding:'12px',borderRadius:'14px',border:'none',background:'transparent',cursor:'pointer',color:t.panelMuted,fontSize:'14px'}}>Cancel</button>
        </div>}
        {mode==='rename'&&<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <input autoFocus value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:'12px 14px',borderRadius:'12px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,color:t.panelText,fontSize:'15px',outline:'none',fontFamily:'Inter,sans-serif'}}/>
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={()=>setMode('menu')} style={{flex:1,padding:'12px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.closeBtnBg,cursor:'pointer',color:t.closeBtnColor,fontSize:'14px'}}>Back</button>
            <button onClick={()=>{if(name.trim()){onRename(name.trim());onClose()}}} disabled={!name.trim()} style={{flex:2,padding:'12px',borderRadius:'14px',border:'none',background:name.trim()?t.writeBtnBg:t.panelHandle,cursor:name.trim()?'pointer':'not-allowed',color:'#fff',fontSize:'14px',fontWeight:500}}>Save name</button>
          </div>
        </div>}
        {mode==='del'&&<div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div style={{fontSize:'14px',color:t.panelMuted,lineHeight:'1.6'}}>Delete <strong style={{color:t.panelText}}>{jar.emoji} {jar.name}</strong>?<br/><span style={{fontSize:'13px'}}>All thoughts inside will be permanently deleted.</span></div>
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={()=>setMode('menu')} style={{flex:1,padding:'12px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.closeBtnBg,cursor:'pointer',color:t.closeBtnColor,fontSize:'14px'}}>Cancel</button>
            <button onClick={()=>{onDelete();onClose()}} style={{flex:2,padding:'12px',borderRadius:'14px',border:'none',background:'#e05555',cursor:'pointer',color:'#fff',fontSize:'14px',fontWeight:500}}>Yes, delete jar</button>
          </div>
        </div>}
      </motion.div>
    </motion.div>
  )
}

function AddJarModal({ onAdd, onClose, t }) {
  const [name,setName]=useState('')
  const [emoji,setEmoji]=useState('🫙')
  const [color,setColor]=useState('#f4b8cb')
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px',maxHeight:'90vh',overflowY:'auto',boxShadow:'0 -8px 40px rgba(0,0,0,0.2)'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2} onDragEnd={(_,i)=>{if(i.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'18px',color:t.panelText}}>New Jar</div>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:t.panelMuted}}><X size={18}/></button>
        </div>
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Name</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Gratitude, Worries..." style={{width:'100%',padding:'12px 14px',borderRadius:'12px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,color:t.panelText,fontSize:'14px',outline:'none',fontFamily:'Inter,sans-serif'}}/>
        </div>
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Emoji</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
            {JAR_EMOJIS.map(e=><button key={e} onClick={()=>setEmoji(e)} style={{width:'34px',height:'34px',borderRadius:'8px',border:`2px solid ${emoji===e?t.writeBtnBg:t.panelBorder}`,background:emoji===e?t.writeBtnBg+'22':'transparent',fontSize:'17px',cursor:'pointer'}}>{e}</button>)}
          </div>
        </div>
        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Color</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {JAR_COLORS.map(c=><button key={c} onClick={()=>setColor(c)} style={{width:'28px',height:'28px',borderRadius:'50%',background:c,border:`3px solid ${color===c?t.panelText:'transparent'}`,cursor:'pointer',boxShadow:'0 2px 4px rgba(0,0,0,0.15)'}}/>)}
          </div>
        </div>
        <motion.button whileTap={{scale:0.97}} onClick={()=>{if(name.trim()){onAdd({name:name.trim(),emoji,color});onClose()}}} disabled={!name.trim()}
          style={{width:'100%',padding:'14px',borderRadius:'28px',background:name.trim()?t.writeBtnBg:'#ccc',color:'#fff',border:'none',fontSize:'15px',fontWeight:500,cursor:name.trim()?'pointer':'not-allowed'}}>
          Add jar to shelf
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function ThemePicker({ currentTheme, dark, onSelect, onClose, t }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(3px)'}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2} onDragEnd={(_,i)=>{if(i.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'18px',color:t.panelText,marginBottom:'20px'}}>Choose a theme</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px'}}>
          {Object.entries(THEMES).map(([key,th])=>(
            <button key={key} onClick={()=>{onSelect(key);onClose()}}
              style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',background:'none',border:'none',cursor:'pointer',padding:'8px',borderRadius:'12px',outline:currentTheme===key?`2px solid ${th.swatch}`:'none'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:dark?THEMES[key].dark.pageBg:THEMES[key].light.pageBg,border:`3px solid ${th.swatch}`,boxShadow:`0 2px 8px ${th.swatch}44`}}/>
              <span style={{fontSize:'11px',color:t.panelMuted,fontWeight:currentTheme===key?600:400}}>{th.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function BurnOverlay({ onDone }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{duration:1.2,times:[0,0.2,0.7,1]}} onAnimationComplete={onDone}
      style={{position:'fixed',inset:0,zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.5)',pointerEvents:'none'}}>
      <motion.div initial={{scale:1,opacity:1}} animate={{scale:[1,1.3,0.1],opacity:[1,1,0]}} transition={{duration:1,ease:'easeIn'}} style={{fontSize:'80px'}}>🔥</motion.div>
    </motion.div>
  )
}

// ─── Main Home ────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const { jars, addJar, deleteJar } = useJars()
  const { thoughts, addThought, deleteThought, archiveThought } = useThoughts()

  const [dark, setDark]           = useState(() => localStorage.getItem('jot_dark') === 'true')
  const [themeName, setThemeName] = useState(() => localStorage.getItem('jot_theme') || 'amber')
  const [openJarId, setOpenJarId] = useState(null)
  const [writeJarId, setWriteJarId] = useState(null)
  const [viewThought, setViewThought] = useState(null)
  const [burning, setBurning]     = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showAddJar, setShowAddJar] = useState(false)
  const [jarOptions, setJarOptions] = useState(null)
  const containerRef = useRef(null)
  const fireRef      = useRef(null)
  const archiveRef   = useRef(null)

  const theme = THEMES[themeName] || THEMES.amber
  const t     = dark ? theme.dark : theme.light
  const actionBar = dark ? ACTION_BAR.dark : ACTION_BAR.light

  // ── Fixed 4 jars per rack + at least 2 empty racks
  const jarsPerRow = 4
  const rows = []
  for (let i = 0; i < jars.length; i += jarsPerRow) {
    rows.push(jars.slice(i, i + jarsPerRow))
  }
  rows.push([], [])

  function toggleDark()    { const n=!dark; setDark(n); localStorage.setItem('jot_dark',String(n)) }
  function selectTheme(k)  { setThemeName(k); localStorage.setItem('jot_theme',k) }
  function countFor(id)    { return thoughts.filter(th => th.jarId === id).length }
  function handleJarClick(jar) { setOpenJarId(p => p === jar.id ? null : jar.id) }
  function handleJarDoubleClick(jar) { setOpenJarId(jar.id); setWriteJarId(jar.id) }
  function handleJarLongPress(jar)   { setJarOptions(jar) }

  function handleSaveThought(text, isLocked, unlockAt) {
    addThought({ text, jarId: writeJarId, isLocked, unlockAt })
    setWriteJarId(null); setOpenJarId(null)
  }

  function handleRenameJar(jarId, newName) {
    const stored = JSON.parse(localStorage.getItem('jot_jars') || '[]')
    localStorage.setItem('jot_jars', JSON.stringify(stored.map(j => j.id===jarId ? {...j,name:newName} : j)))
    window.location.reload()
  }

  function handleDeleteJar(jarId) {
    deleteJar(jarId)
    const stored = JSON.parse(localStorage.getItem('jot_thoughts') || '[]')
    localStorage.setItem('jot_thoughts', JSON.stringify(stored.filter(t => t.jarId !== jarId)))
    if (openJarId === jarId) setOpenJarId(null)
    window.location.reload()
  }

  function handleChitDrop(point) {
    if (!viewThought) return
    const W = window.innerWidth, H = window.innerHeight
    if (point.x < W*0.45 && point.y > H*0.6) {
      setBurning(true); setTimeout(() => deleteThought(viewThought.id), 600); setViewThought(null)
    } else if (point.x > W*0.55 && point.y > H*0.6) {
      setArchiveOpen(true); setTimeout(() => setArchiveOpen(false), 1200)
      archiveThought(viewThought.id); setViewThought(null)
    }
  }

  const openJar = jars.find(j => j.id === openJarId)
  const openJarThoughts = openJar
    ? thoughts.filter(th => th.jarId === openJar.id).sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt))
    : []

  return (
    <div style={{minHeight:'100vh',background:t.pageBg,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden',transition:'background 0.4s ease'}}>

      {/* Ambient fire glow */}
      <div style={{position:'fixed',bottom:'120px',right:'20px',width:'160px',height:'160px',background:`radial-gradient(circle,${t.ambientFire} 0%,transparent 70%)`,pointerEvents:'none',zIndex:0}}/>

      {/* ── Top bar ── */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 16px 0',flexShrink:0}}>
        <div>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'20px',fontWeight:600,color:t.titleColor,lineHeight:1.2,transition:'color 0.3s'}}>Jar of Thoughts</h1>
          <p style={{fontSize:'11px',color:t.subtitleColor,marginTop:'1px',transition:'color 0.3s'}}>your quiet corner</p>
        </div>
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          <button onClick={()=>navigate('/search')} style={{background:'none',border:'none',cursor:'pointer',color:t.iconColor,padding:'6px'}}><Search size={17}/></button>
          <button onClick={()=>navigate('/stats')}  style={{background:'none',border:'none',cursor:'pointer',color:t.iconColor,padding:'6px'}}><BarChart2 size={17}/></button>
          <button onClick={()=>setShowThemePicker(true)} style={{background:t.toggleBg,border:'none',borderRadius:'20px',padding:'5px 9px',cursor:'pointer',color:t.iconColor,display:'flex',alignItems:'center',transition:'all 0.3s'}}><Palette size={15}/></button>
          <button onClick={toggleDark} style={{background:t.toggleBg,border:'none',borderRadius:'20px',padding:'5px 9px',cursor:'pointer',color:t.iconColor,display:'flex',alignItems:'center',transition:'all 0.3s'}}>
            {dark ? <Sun size={15}/> : <Moon size={15}/>}
          </button>
        </div>
      </div>

      {/* ── Quick stats bar ── */}
      <div style={{display:'flex',gap:'8px',padding:'10px 16px 0',overflowX:'auto',flexShrink:0}}>
        <div style={{background:t.panelBg,border:`1px solid ${t.panelBorder}`,borderRadius:'12px',padding:'6px 12px',flexShrink:0}}><span style={{fontSize:'11px',color:t.panelMuted}}>{jars.length} jars</span></div>
        <div style={{background:t.panelBg,border:`1px solid ${t.panelBorder}`,borderRadius:'12px',padding:'6px 12px',flexShrink:0}}><span style={{fontSize:'11px',color:t.panelMuted}}>{thoughts.length} thoughts</span></div>
        {thoughts.filter(th=>th.isLocked&&new Date(th.unlockAt)>new Date()).length>0&&(
          <div style={{background:t.writeBtnBg+'22',border:`1px solid ${t.writeBtnBg}44`,borderRadius:'12px',padding:'6px 12px',flexShrink:0}}>
            <span style={{fontSize:'11px',color:t.writeBtnBg,fontWeight:600}}>🔒 {thoughts.filter(th=>th.isLocked&&new Date(th.unlockAt)>new Date()).length} locked</span>
          </div>
        )}
        <button onClick={()=>setShowAddJar(true)} style={{background:t.writeBtnBg,border:'none',borderRadius:'12px',padding:'6px 12px',flexShrink:0,display:'flex',alignItems:'center',gap:'4px',cursor:'pointer',color:'#fff',fontSize:'11px',fontWeight:600}}>
          <Plus size={12}/> New jar
        </button>
      </div>

      {/* ── Hint ── */}
      <div style={{textAlign:'center',fontSize:'10px',color:t.hintText,letterSpacing:'0.06em',textTransform:'uppercase',padding:'8px 0 4px',flexShrink:0}}>
        tap · hold for options · double-tap to write
      </div>

      {/* ── SHELF SYSTEM ── */}
      <div ref={containerRef} style={{flex:1,overflowY:'auto',padding:'0 12px 108px',display:'flex',flexDirection:'column',gap:'0'}}>
        {rows.map((rowJars, rowIdx) => (
          <Shelf
            key={`rack-${rowIdx}`}
            jars={rowJars}
            t={t}
            dark={dark}
            openJarId={openJarId}
            onJarClick={handleJarClick}
            onJarDoubleClick={handleJarDoubleClick}
            onJarLongPress={handleJarLongPress}
            countFor={countFor}
          />
        ))}

      </div>

      {/* ── Fixed bottom action bar ── */}
      <div style={{position:'fixed',left:0,right:0,bottom:0,zIndex:80,padding:'0 12px env(safe-area-inset-right) env(safe-area-inset-left)'}}>
        <div style={{background:actionBar.bg,borderTop:`3px solid ${actionBar.border}`,borderBottom:'2px solid rgba(0,0,0,0.45)',padding:'12px 20px 14px',boxShadow:'0 -8px 28px rgba(0,0,0,0.35)',display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginTop:'0',flexShrink:0,transition:'background 0.4s'}}>
          <div ref={fireRef} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2px'}}>
            <FirePit/>
            <span style={{fontSize:'9px',color:actionBar.delete,fontWeight:500}}>delete</span>
          </div>
          <div style={{fontSize:'10px',color:actionBar.hint,textAlign:'center',lineHeight:'1.6'}}>drag chit to<br/>delete or archive</div>
          <div ref={archiveRef} onClick={()=>navigate('/archive')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2px',cursor:'pointer'}}>
            <SteelBox isOpen={archiveOpen}/>
            <span style={{fontSize:'9px',color:actionBar.archive,fontWeight:500}}>archive</span>
          </div>
        </div>
      </div>

      {/* ── Jar open panel ── */}
      <AnimatePresence>
        {openJarId && !writeJarId && (
          <motion.div initial={{opacity:0,y:'100%'}} animate={{opacity:1,y:0}} exit={{opacity:0,y:'100%'}} transition={{type:'spring',stiffness:260,damping:28}}
            style={{position:'fixed',bottom:0,left:0,right:0,background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'16px 20px 40px',maxHeight:'65vh',overflowY:'auto',zIndex:100,boxShadow:'0 -8px 40px rgba(0,0,0,0.2)',transition:'background 0.3s'}}>
            <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2} onDragEnd={(_,i)=>{if(i.offset.y>60)setOpenJarId(null)}}
              style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 16px',cursor:'grab',touchAction:'none'}}/>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'18px',color:t.panelText}}>{openJar?.emoji} {openJar?.name}</div>
                <button onClick={()=>openJar&&setJarOptions(openJar)} style={{background:'none',border:'none',cursor:'pointer',color:t.panelMuted,padding:'4px'}}><Pencil size={14}/></button>
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={()=>setWriteJarId(openJarId)} style={{background:t.writeBtnBg,color:'#fff',border:'none',borderRadius:'20px',padding:'7px 14px',fontSize:'13px',cursor:'pointer',fontWeight:500}}>+ Write</button>
                <button onClick={()=>setOpenJarId(null)} style={{background:t.closeBtnBg,border:'none',borderRadius:'20px',padding:'7px 12px',fontSize:'13px',cursor:'pointer',color:t.closeBtnColor}}>Close</button>
              </div>
            </div>
            {openJarThoughts.length===0 ? (
              <div style={{textAlign:'center',padding:'40px 20px',color:t.panelMuted,fontSize:'14px',lineHeight:'1.7'}}>
                This jar is empty.<br/><span style={{fontSize:'13px',opacity:0.7}}>Tap + Write to add a thought.</span>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {openJarThoughts.map((thought,i)=>{
                  const isLocked=thought.isLocked&&thought.unlockAt&&new Date(thought.unlockAt)>new Date()
                  return (
                    <motion.div key={thought.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                      onClick={()=>!isLocked&&setViewThought(thought)}
                      style={{background:t.chitBg,border:`1px solid ${isLocked?t.writeBtnBg+'44':t.chitBorder}`,borderRadius:'12px',padding:'14px 16px',cursor:isLocked?'default':'pointer',opacity:isLocked?0.75:1,backgroundImage:`repeating-linear-gradient(transparent,transparent 27px,${t.chitLines} 27px,${t.chitLines} 28px)`,backgroundSize:'100% 28px',transition:'background 0.3s'}}>
                      {isLocked ? (
                        <div>
                          <div style={{fontSize:'13px',color:t.writeBtnBg,fontWeight:500,marginBottom:'4px'}}>🔒 Time capsule</div>
                          <div style={{fontSize:'12px',color:t.panelMuted}}>Unlocks on {new Date(thought.unlockAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                        </div>
                      ) : (
                        <>
                          <div style={{fontSize:'14px',color:t.panelText,lineHeight:'28px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{thought.text}</div>
                          <div style={{fontSize:'11px',color:t.panelMuted,marginTop:'4px'}}>{new Date(thought.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</div>
                        </>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {writeJarId && <WriteModal jar={jars.find(j=>j.id===writeJarId)} onSave={handleSaveThought} onClose={()=>setWriteJarId(null)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {viewThought && <ChitPaper thought={viewThought} jar={jars.find(j=>j.id===viewThought.jarId)} onDrop={handleChitDrop} onClose={()=>setViewThought(null)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {jarOptions && <JarOptionsModal jar={jarOptions} onRename={n=>handleRenameJar(jarOptions.id,n)} onDelete={()=>handleDeleteJar(jarOptions.id)} onClose={()=>setJarOptions(null)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {showThemePicker && <ThemePicker currentTheme={themeName} dark={dark} onSelect={selectTheme} onClose={()=>setShowThemePicker(false)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {showAddJar && <AddJarModal onAdd={addJar} onClose={()=>setShowAddJar(false)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {burning && <BurnOverlay onDone={()=>setBurning(false)}/>}
      </AnimatePresence>
    </div>
  )
}
