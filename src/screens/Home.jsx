import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart2, Search, Moon, Sun, Palette, Plus, X, Pencil, Trash2 } from 'lucide-react'
import { useJars } from '../hooks/useJars'
import { useThoughts } from '../hooks/useThoughts'
import JarSVG from '../components/JarSVG'
import { ChitPaper } from '../components/ChitPaper'

const THEMES = {
  amber: {
    name:'Amber',swatch:'#C4964A',
    light:{pageBg:'linear-gradient(180deg,#FDF6E3 0%,#F5E6C8 50%,#EDD9A3 100%)',shelfTop:'linear-gradient(180deg,#C4964A 0%,#A07830 100%)',shelfTopBorder:'#D4A855',shelfBottom:'linear-gradient(180deg,#B08040 0%,#8B6020 100%)',shelfBottomBorder:'#C49040',titleColor:'#2C1810',subtitleColor:'rgba(44,24,16,0.5)',iconColor:'rgba(44,24,16,0.45)',jarLabelActive:'#8B5E34',jarLabel:'rgba(44,24,16,0.55)',hintText:'rgba(44,24,16,0.35)',panelBg:'#FFFDF8',panelText:'#2C2416',panelMuted:'#7A6A52',panelBorder:'rgba(44,36,22,0.1)',panelHandle:'rgba(44,36,22,0.15)',chitBg:'#FEFCF4',chitBorder:'rgba(44,36,22,0.1)',chitLines:'rgba(44,36,22,0.06)',writeBtnBg:'#B5804A',closeBtnBg:'rgba(44,36,22,0.08)',closeBtnColor:'#7A6A52',toggleBg:'rgba(44,36,22,0.08)',shadowColor:'rgba(100,60,20,0.15)',woodGrain:'rgba(0,0,0,0.06)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',labelInk:'rgba(60,30,10,0.75)'},
    dark:{pageBg:'linear-gradient(180deg,#1A0F08 0%,#2C1810 50%,#3D2314 100%)',shelfTop:'linear-gradient(180deg,#6B4423 0%,#4A2E16 100%)',shelfTopBorder:'#8B5E34',shelfBottom:'linear-gradient(180deg,#5C3A1E 0%,#3D2410 100%)',shelfBottomBorder:'#7A5030',titleColor:'#F5ECD8',subtitleColor:'rgba(245,236,216,0.45)',iconColor:'rgba(245,236,216,0.55)',jarLabelActive:'#F5CC7A',jarLabel:'rgba(245,236,216,0.55)',hintText:'rgba(245,236,216,0.28)',panelBg:'#1E1510',panelText:'#F5ECD8',panelMuted:'#A08060',panelBorder:'rgba(245,236,216,0.1)',panelHandle:'rgba(245,236,216,0.15)',chitBg:'#26180E',chitBorder:'rgba(245,236,216,0.08)',chitLines:'rgba(245,236,216,0.04)',writeBtnBg:'#C4904A',closeBtnBg:'rgba(245,236,216,0.08)',closeBtnColor:'#A08060',toggleBg:'rgba(245,236,216,0.08)',shadowColor:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.12)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.15)',labelInk:'rgba(245,220,180,0.8)'},
  },
  sage: {
    name:'Sage',swatch:'#6B8F71',
    light:{pageBg:'linear-gradient(180deg,#F0F7F1 0%,#E0EDE2 50%,#C8DFC9 100%)',shelfTop:'linear-gradient(180deg,#6B8F71 0%,#4E7254 100%)',shelfTopBorder:'#82A888',shelfBottom:'linear-gradient(180deg,#5A7D60 0%,#3D6043 100%)',shelfBottomBorder:'#6E9474',titleColor:'#1A2E1C',subtitleColor:'rgba(26,46,28,0.5)',iconColor:'rgba(26,46,28,0.45)',jarLabelActive:'#3D6043',jarLabel:'rgba(26,46,28,0.55)',hintText:'rgba(26,46,28,0.35)',panelBg:'#F7FBF7',panelText:'#1A2E1C',panelMuted:'#4E6E52',panelBorder:'rgba(26,46,28,0.1)',panelHandle:'rgba(26,46,28,0.15)',chitBg:'#F2F8F2',chitBorder:'rgba(26,46,28,0.1)',chitLines:'rgba(26,46,28,0.06)',writeBtnBg:'#4E7254',closeBtnBg:'rgba(26,46,28,0.08)',closeBtnColor:'#4E6E52',toggleBg:'rgba(26,46,28,0.08)',shadowColor:'rgba(20,60,25,0.15)',woodGrain:'rgba(0,0,0,0.06)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',labelInk:'rgba(20,50,25,0.75)'},
    dark:{pageBg:'linear-gradient(180deg,#0A1A0C 0%,#122016 50%,#1A2E1C 100%)',shelfTop:'linear-gradient(180deg,#2A4A2E 0%,#1A3020 100%)',shelfTopBorder:'#3D6043',shelfBottom:'linear-gradient(180deg,#223A26 0%,#162818 100%)',shelfBottomBorder:'#2E4E32',titleColor:'#D8F0DA',subtitleColor:'rgba(216,240,218,0.45)',iconColor:'rgba(216,240,218,0.55)',jarLabelActive:'#A0D4A4',jarLabel:'rgba(216,240,218,0.55)',hintText:'rgba(216,240,218,0.28)',panelBg:'#0E1E10',panelText:'#D8F0DA',panelMuted:'#6E9472',panelBorder:'rgba(216,240,218,0.1)',panelHandle:'rgba(216,240,218,0.15)',chitBg:'#162018',chitBorder:'rgba(216,240,218,0.08)',chitLines:'rgba(216,240,218,0.04)',writeBtnBg:'#4E7254',closeBtnBg:'rgba(216,240,218,0.08)',closeBtnColor:'#6E9472',toggleBg:'rgba(216,240,218,0.08)',shadowColor:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.12)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',labelInk:'rgba(200,240,200,0.75)'},
  },
  rose: {
    name:'Rose',swatch:'#C4727A',
    light:{pageBg:'linear-gradient(180deg,#FDF0F1 0%,#F5DDE0 50%,#ECC8CC 100%)',shelfTop:'linear-gradient(180deg,#C4727A 0%,#A05560 100%)',shelfTopBorder:'#D48890',shelfBottom:'linear-gradient(180deg,#B06070 0%,#8B4550 100%)',shelfBottomBorder:'#C47580',titleColor:'#2E1418',subtitleColor:'rgba(46,20,24,0.5)',iconColor:'rgba(46,20,24,0.45)',jarLabelActive:'#8B4550',jarLabel:'rgba(46,20,24,0.55)',hintText:'rgba(46,20,24,0.35)',panelBg:'#FFF8F8',panelText:'#2E1418',panelMuted:'#7A5258',panelBorder:'rgba(46,20,24,0.1)',panelHandle:'rgba(46,20,24,0.15)',chitBg:'#FEF4F4',chitBorder:'rgba(46,20,24,0.1)',chitLines:'rgba(46,20,24,0.06)',writeBtnBg:'#B5606A',closeBtnBg:'rgba(46,20,24,0.08)',closeBtnColor:'#7A5258',toggleBg:'rgba(46,20,24,0.08)',shadowColor:'rgba(100,20,30,0.15)',woodGrain:'rgba(0,0,0,0.06)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',labelInk:'rgba(60,15,20,0.75)'},
    dark:{pageBg:'linear-gradient(180deg,#1A080A 0%,#2C1014 50%,#3D1820 100%)',shelfTop:'linear-gradient(180deg,#6A2830 0%,#4A1820 100%)',shelfTopBorder:'#8B3840',shelfBottom:'linear-gradient(180deg,#5C2028 0%,#3D1418 100%)',shelfBottomBorder:'#7A2830',titleColor:'#F5D8DC',subtitleColor:'rgba(245,216,220,0.45)',iconColor:'rgba(245,216,220,0.55)',jarLabelActive:'#F5A0A8',jarLabel:'rgba(245,216,220,0.55)',hintText:'rgba(245,216,220,0.28)',panelBg:'#1E100E',panelText:'#F5D8DC',panelMuted:'#A06068',panelBorder:'rgba(245,216,220,0.1)',panelHandle:'rgba(245,216,220,0.15)',chitBg:'#26120E',chitBorder:'rgba(245,216,220,0.08)',chitLines:'rgba(245,216,220,0.04)',writeBtnBg:'#C4606A',closeBtnBg:'rgba(245,216,220,0.08)',closeBtnColor:'#A06068',toggleBg:'rgba(245,216,220,0.08)',shadowColor:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.12)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',labelInk:'rgba(245,200,205,0.8)'},
  },
  slate: {
    name:'Slate',swatch:'#6A7F9A',
    light:{pageBg:'linear-gradient(180deg,#EEF2F7 0%,#DDE6F0 50%,#C8D6E8 100%)',shelfTop:'linear-gradient(180deg,#6A7F9A 0%,#4E6480 100%)',shelfTopBorder:'#8090A8',shelfBottom:'linear-gradient(180deg,#5A6E88 0%,#3D5470 100%)',shelfBottomBorder:'#6E8098',titleColor:'#101E2E',subtitleColor:'rgba(16,30,46,0.5)',iconColor:'rgba(16,30,46,0.45)',jarLabelActive:'#3D5470',jarLabel:'rgba(16,30,46,0.55)',hintText:'rgba(16,30,46,0.35)',panelBg:'#F5F8FC',panelText:'#101E2E',panelMuted:'#4E6480',panelBorder:'rgba(16,30,46,0.1)',panelHandle:'rgba(16,30,46,0.15)',chitBg:'#EFF4FA',chitBorder:'rgba(16,30,46,0.1)',chitLines:'rgba(16,30,46,0.06)',writeBtnBg:'#4E6480',closeBtnBg:'rgba(16,30,46,0.08)',closeBtnColor:'#4E6480',toggleBg:'rgba(16,30,46,0.08)',shadowColor:'rgba(16,30,60,0.15)',woodGrain:'rgba(0,0,0,0.06)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',labelInk:'rgba(10,20,40,0.75)'},
    dark:{pageBg:'linear-gradient(180deg,#080E16 0%,#101820 50%,#18242E 100%)',shelfTop:'linear-gradient(180deg,#243040 0%,#182030 100%)',shelfTopBorder:'#304050',shelfBottom:'linear-gradient(180deg,#1C2838 0%,#101820 100%)',shelfBottomBorder:'#283848',titleColor:'#D0DFF0',subtitleColor:'rgba(208,223,240,0.45)',iconColor:'rgba(208,223,240,0.55)',jarLabelActive:'#90B0D8',jarLabel:'rgba(208,223,240,0.55)',hintText:'rgba(208,223,240,0.28)',panelBg:'#0C1420',panelText:'#D0DFF0',panelMuted:'#6080A0',panelBorder:'rgba(208,223,240,0.1)',panelHandle:'rgba(208,223,240,0.15)',chitBg:'#101C2A',chitBorder:'rgba(208,223,240,0.08)',chitLines:'rgba(208,223,240,0.04)',writeBtnBg:'#4E6480',closeBtnBg:'rgba(208,223,240,0.08)',closeBtnColor:'#6080A0',toggleBg:'rgba(208,223,240,0.08)',shadowColor:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.12)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',labelInk:'rgba(180,210,240,0.75)'},
  },
  lavender: {
    name:'Lavender',swatch:'#8B7AB8',
    light:{pageBg:'linear-gradient(180deg,#F4F0FC 0%,#E8E0F5 50%,#D8CCEE 100%)',shelfTop:'linear-gradient(180deg,#8B7AB8 0%,#6E5E9A 100%)',shelfTopBorder:'#A090C8',shelfBottom:'linear-gradient(180deg,#7A68A8 0%,#5E4E88 100%)',shelfBottomBorder:'#9080B8',titleColor:'#1E1430',subtitleColor:'rgba(30,20,48,0.5)',iconColor:'rgba(30,20,48,0.45)',jarLabelActive:'#5E4E88',jarLabel:'rgba(30,20,48,0.55)',hintText:'rgba(30,20,48,0.35)',panelBg:'#FAF7FF',panelText:'#1E1430',panelMuted:'#6A5880',panelBorder:'rgba(30,20,48,0.1)',panelHandle:'rgba(30,20,48,0.15)',chitBg:'#F5F0FF',chitBorder:'rgba(30,20,48,0.1)',chitLines:'rgba(30,20,48,0.06)',writeBtnBg:'#6E5E9A',closeBtnBg:'rgba(30,20,48,0.08)',closeBtnColor:'#6A5880',toggleBg:'rgba(30,20,48,0.08)',shadowColor:'rgba(40,20,80,0.15)',woodGrain:'rgba(0,0,0,0.06)',deleteLabel:'rgba(200,80,0,0.8)',archiveLabel:'rgba(80,80,100,0.7)',ambientFire:'rgba(255,107,0,0.06)',labelInk:'rgba(30,15,50,0.75)'},
    dark:{pageBg:'linear-gradient(180deg,#0E0818 0%,#180E28 50%,#221638 100%)',shelfTop:'linear-gradient(180deg,#3A2860 0%,#281848 100%)',shelfTopBorder:'#4E3878',shelfBottom:'linear-gradient(180deg,#302050 0%,#201040 100%)',shelfBottomBorder:'#3E2868',titleColor:'#E0D8F8',subtitleColor:'rgba(224,216,248,0.45)',iconColor:'rgba(224,216,248,0.55)',jarLabelActive:'#B8A8E8',jarLabel:'rgba(224,216,248,0.55)',hintText:'rgba(224,216,248,0.28)',panelBg:'#120C20',panelText:'#E0D8F8',panelMuted:'#8878B0',panelBorder:'rgba(224,216,248,0.1)',panelHandle:'rgba(224,216,248,0.15)',chitBg:'#1A1030',chitBorder:'rgba(224,216,248,0.08)',chitLines:'rgba(224,216,248,0.04)',writeBtnBg:'#6E5E9A',closeBtnBg:'rgba(224,216,248,0.08)',closeBtnColor:'#8878B0',toggleBg:'rgba(224,216,248,0.08)',shadowColor:'rgba(0,0,0,0.4)',woodGrain:'rgba(0,0,0,0.12)',deleteLabel:'rgba(255,107,0,0.7)',archiveLabel:'rgba(156,163,175,0.7)',ambientFire:'rgba(255,107,0,0.12)',labelInk:'rgba(210,190,250,0.8)'},
  },
}

const JAR_EMOJIS=['🫙','💝','🌿','🌧','☁️','✨','🌻','🔥','🌊','🍃','🌸','🦋','⭐','🌙','☀️','🍀','🎵','🌈','💫','🕊️']
const JAR_COLORS=['#f4b8cb','#a8d5a2','#9ec5e8','#c8c8c8','#c5b8f0','#f5cc7a','#f0a890','#a8c8f0','#f0d8a8','#c8f0d8','#f0c8e8','#d8c8f0']

function FirePit() {
  return (
    <svg width="50" height="58" viewBox="0 0 56 64" fill="none">
      <defs><radialGradient id="fg2" cx="50%" cy="80%" r="60%"><stop offset="0%" stopColor="#ff6b00" stopOpacity="0.4"/><stop offset="100%" stopColor="#ff6b00" stopOpacity="0"/></radialGradient></defs>
      <path d="M8 44 Q6 56 28 58 Q50 56 48 44 Z" fill="#5C4A2A" stroke="#3a2e1a" strokeWidth="1"/>
      <path d="M8 44 Q28 48 48 44" fill="none" stroke="#8B7355" strokeWidth="1.5"/>
      <line x1="28" y1="58" x2="20" y2="64" stroke="#5C4A2A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="28" y1="58" x2="36" y2="64" stroke="#5C4A2A" strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="28" cy="44" rx="18" ry="6" fill="url(#fg2)"/>
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
        <linearGradient id="sb3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9CA3AF"/><stop offset="100%" stopColor="#4B5563"/></linearGradient>
        <linearGradient id="sl3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D1D5DB"/><stop offset="100%" stopColor="#9CA3AF"/></linearGradient>
      </defs>
      <rect x="4" y="28" width="56" height="30" rx="3" fill="url(#sb3)" stroke="#374151" strokeWidth="1"/>
      <circle cx="10" cy="34" r="2" fill="#6B7280"/><circle cx="54" cy="34" r="2" fill="#6B7280"/>
      <rect x="6" y="30" width="20" height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      <motion.g animate={{rotateX:isOpen?-70:0}} transition={{type:'spring',stiffness:200,damping:20}} style={{transformOrigin:'32px 28px'}}>
        <rect x="4" y="14" width="56" height="16" rx="3" fill="url(#sl3)" stroke="#374151" strokeWidth="1"/>
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

// Handwritten label on the jar
function HandwrittenLabel({ name, color, ink }) {
  const short = name.length > 10 ? name.slice(0, 10) : name
  return (
    <div style={{
      position:'absolute',
      bottom:'28%',
      left:'50%',
      transform:'translateX(-50%) rotate(-2deg)',
      background:'rgba(255,252,240,0.92)',
      border:'1px solid rgba(180,150,100,0.3)',
      borderRadius:'3px',
      padding:'2px 6px',
      width:'80%',
      textAlign:'center',
      boxShadow:'0 1px 3px rgba(0,0,0,0.1)',
      pointerEvents:'none',
      zIndex:2,
    }}>
      <span style={{
        fontSize:'9px',
        color: ink,
        fontFamily:"'Caveat', 'Segoe Script', 'Bradley Hand', cursive",
        fontWeight:600,
        letterSpacing:'0.02em',
        display:'block',
        lineHeight:1.2,
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis',
      }}>
        {short}
      </span>
    </div>
  )
}

// Jar options modal (rename / delete)
function JarOptionsModal({ jar, onRename, onDelete, onClose, t }) {
  const [mode, setMode] = useState('menu') // 'menu' | 'rename' | 'confirmDelete'
  const [newName, setNewName] = useState(jar.name)

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px',boxShadow:'0 -8px 40px rgba(0,0,0,0.2)'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2}
          onDragEnd={(_,info)=>{if(info.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>

        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <span style={{fontSize:'22px'}}>{jar.emoji}</span>
          <div style={{fontFamily:'Playfair Display, serif',fontSize:'18px',color:t.panelText}}>{jar.name}</div>
        </div>

        {mode==='menu'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <button onClick={()=>setMode('rename')}
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,cursor:'pointer',color:t.panelText,fontSize:'14px',fontWeight:500}}>
              <Pencil size={18} style={{color:t.writeBtnBg}}/> Rename jar
            </button>
            <button onClick={()=>setMode('confirmDelete')}
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 16px',borderRadius:'14px',border:'1px solid rgba(220,50,50,0.2)',background:'rgba(220,50,50,0.05)',cursor:'pointer',color:'#e05555',fontSize:'14px',fontWeight:500}}>
              <Trash2 size={18}/> Delete jar
            </button>
            <button onClick={onClose}
              style={{padding:'12px',borderRadius:'14px',border:'none',background:'transparent',cursor:'pointer',color:t.panelMuted,fontSize:'14px'}}>
              Cancel
            </button>
          </div>
        )}

        {mode==='rename'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{fontSize:'13px',color:t.panelMuted,marginBottom:'4px'}}>New name</div>
            <input
              autoFocus
              value={newName}
              onChange={e=>setNewName(e.target.value)}
              style={{width:'100%',padding:'12px 14px',borderRadius:'12px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,color:t.panelText,fontSize:'15px',outline:'none',fontFamily:'Inter,sans-serif'}}
            />
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setMode('menu')}
                style={{flex:1,padding:'12px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.closeBtnBg,cursor:'pointer',color:t.closeBtnColor,fontSize:'14px'}}>
                Back
              </button>
              <button onClick={()=>{if(newName.trim()){onRename(newName.trim());onClose()}}}
                disabled={!newName.trim()}
                style={{flex:2,padding:'12px',borderRadius:'14px',border:'none',background:newName.trim()?t.writeBtnBg:t.panelHandle,cursor:newName.trim()?'pointer':'not-allowed',color:'#fff',fontSize:'14px',fontWeight:500}}>
                Save name
              </button>
            </div>
          </div>
        )}

        {mode==='confirmDelete'&&(
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div style={{fontSize:'14px',color:t.panelMuted,lineHeight:'1.6'}}>
              Delete <strong style={{color:t.panelText}}>{jar.emoji} {jar.name}</strong>?<br/>
              <span style={{fontSize:'13px'}}>All thoughts inside will be permanently deleted.</span>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={()=>setMode('menu')}
                style={{flex:1,padding:'12px',borderRadius:'14px',border:`1px solid ${t.panelBorder}`,background:t.closeBtnBg,cursor:'pointer',color:t.closeBtnColor,fontSize:'14px'}}>
                Cancel
              </button>
              <button onClick={()=>{onDelete();onClose()}}
                style={{flex:2,padding:'12px',borderRadius:'14px',border:'none',background:'#e05555',cursor:'pointer',color:'#fff',fontSize:'14px',fontWeight:500}}>
                Yes, delete jar
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function AddJarModal({ onAdd, onClose, t }) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🫙')
  const [color, setColor] = useState('#f4b8cb')
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px',boxShadow:'0 -8px 40px rgba(0,0,0,0.2)'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2}
          onDragEnd={(_,info)=>{if(info.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
          <div style={{fontFamily:'Playfair Display, serif',fontSize:'18px',color:t.panelText}}>New Jar</div>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:t.panelMuted}}><X size={18}/></button>
        </div>
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Name</div>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Gratitude, Worries..."
            style={{width:'100%',padding:'12px 14px',borderRadius:'12px',border:`1px solid ${t.panelBorder}`,background:t.chitBg,color:t.panelText,fontSize:'14px',outline:'none',fontFamily:'Inter,sans-serif'}}/>
        </div>
        <div style={{marginBottom:'16px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Emoji</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
            {JAR_EMOJIS.map(e=>(
              <button key={e} onClick={()=>setEmoji(e)}
                style={{width:'34px',height:'34px',borderRadius:'8px',border:`2px solid ${emoji===e?t.writeBtnBg:t.panelBorder}`,background:emoji===e?t.writeBtnBg+'22':'transparent',fontSize:'17px',cursor:'pointer'}}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'11px',color:t.panelMuted,marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Color</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {JAR_COLORS.map(c=>(
              <button key={c} onClick={()=>setColor(c)}
                style={{width:'28px',height:'28px',borderRadius:'50%',background:c,border:`3px solid ${color===c?t.panelText:'transparent'}`,cursor:'pointer',boxShadow:'0 2px 4px rgba(0,0,0,0.15)'}}/>
            ))}
          </div>
        </div>
        <motion.button whileTap={{scale:0.97}} onClick={()=>{if(name.trim()){onAdd({name:name.trim(),emoji,color});onClose()}}} disabled={!name.trim()}
          style={{width:'100%',padding:'14px',borderRadius:'28px',background:name.trim()?t.writeBtnBg:t.panelHandle,color:name.trim()?'#fff':t.panelMuted,border:'none',fontSize:'15px',fontWeight:500,cursor:name.trim()?'pointer':'not-allowed'}}>
          Add jar to shelf
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

function WriteModal({ jar, onSave, onClose, t }) {
  const [text, setText] = useState('')
  const [lockEnabled, setLockEnabled] = useState(false)
  const [lockOption, setLockOption] = useState('1m')
  function getUnlockAt() {
    if (!lockEnabled) return null
    const now=new Date()
    if(lockOption==='1m'){now.setMonth(now.getMonth()+1);return now.toISOString()}
    if(lockOption==='3m'){now.setMonth(now.getMonth()+3);return now.toISOString()}
    if(lockOption==='6m'){now.setMonth(now.getMonth()+6);return now.toISOString()}
    if(lockOption==='1y'){now.setFullYear(now.getFullYear()+1);return now.toISOString()}
    return null
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:300,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.45)',backdropFilter:'blur(4px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px',boxShadow:'0 -8px 40px rgba(0,0,0,0.2)'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2}
          onDragEnd={(_,info)=>{if(info.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{fontSize:'13px',fontWeight:600,color:t.writeBtnBg,marginBottom:'14px',display:'flex',alignItems:'center',gap:'6px'}}>
          {jar.emoji} Writing into {jar.name}
        </div>
        <div style={{background:t.chitBg,border:`1px solid ${t.chitBorder}`,borderRadius:'14px',padding:'14px',marginBottom:'14px',backgroundImage:`repeating-linear-gradient(transparent,transparent 27px,${t.chitLines} 27px,${t.chitLines} 28px)`,backgroundSize:'100% 28px'}}>
          <textarea autoFocus value={text} onChange={e=>setText(e.target.value)} placeholder="What's on your mind..."
            style={{width:'100%',minHeight:'140px',background:'none',border:'none',outline:'none',resize:'none',fontSize:'15px',lineHeight:'28px',color:t.panelText,fontFamily:'Inter,sans-serif'}}/>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',marginBottom:'14px',background:t.toggleBg,borderRadius:'12px'}}>
          <span style={{fontSize:'13px',color:t.panelMuted}}>🔒 Lock as time capsule?</span>
          <button onClick={()=>setLockEnabled(!lockEnabled)}
            style={{width:'36px',height:'20px',borderRadius:'10px',background:lockEnabled?t.writeBtnBg:t.panelHandle,border:'none',cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
            <div style={{width:'14px',height:'14px',borderRadius:'50%',background:'#fff',position:'absolute',top:'3px',left:lockEnabled?'19px':'3px',transition:'left 0.2s'}}/>
          </button>
        </div>
        {lockEnabled&&(
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'14px'}}>
            {[['1m','1 month'],['3m','3 months'],['6m','6 months'],['1y','1 year']].map(([val,label])=>(
              <button key={val} onClick={()=>setLockOption(val)}
                style={{padding:'5px 12px',borderRadius:'16px',fontSize:'12px',cursor:'pointer',border:`1px solid ${lockOption===val?t.writeBtnBg:t.panelBorder}`,background:lockOption===val?t.writeBtnBg:'transparent',color:lockOption===val?'#fff':t.panelMuted}}>
                {label}
              </button>
            ))}
          </div>
        )}
        <motion.button whileTap={{scale:0.97}} onClick={()=>text.trim()&&onSave(text.trim(),lockEnabled,getUnlockAt())} disabled={!text.trim()}
          style={{width:'100%',padding:'14px',borderRadius:'28px',background:text.trim()?t.writeBtnBg:t.panelHandle,color:text.trim()?'#fff':t.panelMuted,border:'none',fontSize:'15px',fontWeight:500,cursor:text.trim()?'pointer':'not-allowed',transition:'all 0.2s'}}>
          Drop into jar ↓
        </motion.button>
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

function ThemePicker({ currentTheme, dark, onSelect, onClose, t }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{position:'fixed',inset:0,zIndex:400,display:'flex',alignItems:'flex-end',justifyContent:'center',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(3px)'}}
      onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',stiffness:300,damping:30}}
        style={{background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'20px 20px 40px',width:'100%',maxWidth:'480px'}}>
        <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2}
          onDragEnd={(_,info)=>{if(info.offset.y>60)onClose()}}
          style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 20px',cursor:'grab',touchAction:'none'}}/>
        <div style={{fontFamily:'Playfair Display, serif',fontSize:'18px',color:t.panelText,marginBottom:'20px'}}>Choose a theme</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'12px'}}>
          {Object.entries(THEMES).map(([key,theme])=>(
            <button key={key} onClick={()=>{onSelect(key);onClose()}}
              style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',background:'none',border:'none',cursor:'pointer',padding:'8px',borderRadius:'12px',outline:currentTheme===key?`2px solid ${theme.swatch}`:'none'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:dark?THEMES[key].dark.pageBg:THEMES[key].light.pageBg,border:`3px solid ${theme.swatch}`,boxShadow:`0 2px 8px ${theme.swatch}44`}}/>
              <span style={{fontSize:'11px',color:t.panelMuted,fontWeight:currentTheme===key?600:400}}>{theme.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { jars, addJar, deleteJar } = useJars()
  const { thoughts, addThought, deleteThought, archiveThought } = useThoughts()

  const [dark, setDark] = useState(()=>localStorage.getItem('jot_dark')==='true')
  const [themeName, setThemeName] = useState(()=>localStorage.getItem('jot_theme')||'amber')
  const [openJarId, setOpenJarId] = useState(null)
  const [writeJarId, setWriteJarId] = useState(null)
  const [viewThought, setViewThought] = useState(null)
  const [burning, setBurning] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showAddJar, setShowAddJar] = useState(false)
  const [jarOptions, setJarOptions] = useState(null) // jar object or null

  const fireRef = useRef(null)
  const archiveRef = useRef(null)

  const theme = THEMES[themeName]||THEMES.amber
  const t = dark ? theme.dark : theme.light

  function toggleDark(){const next=!dark;setDark(next);localStorage.setItem('jot_dark',String(next))}
  function selectTheme(key){setThemeName(key);localStorage.setItem('jot_theme',key)}
  function countFor(jarId){return thoughts.filter(th=>th.jarId===jarId).length}

  function handleJarClick(jar){setOpenJarId(prev=>prev===jar.id?null:jar.id)}
  function handleJarLongPress(jar){setJarOptions(jar)}
  function handleJarDoubleClick(jar){setOpenJarId(jar.id);setWriteJarId(jar.id)}
  function handleSaveThought(text,isLocked,unlockAt){addThought({text,jarId:writeJarId,isLocked,unlockAt});setWriteJarId(null);setOpenJarId(null)}

  // Rename: update jar name in localStorage
  function handleRenameJar(jarId, newName) {
    const stored = JSON.parse(localStorage.getItem('jot_jars')||'[]')
    const updated = stored.map(j=>j.id===jarId?{...j,name:newName}:j)
    localStorage.setItem('jot_jars', JSON.stringify(updated))
    window.location.reload() // simplest way to re-sync hook state
  }

  // Delete jar and all its thoughts
  function handleDeleteJar(jarId) {
    deleteJar(jarId)
    // also remove thoughts
    const stored = JSON.parse(localStorage.getItem('jot_thoughts')||'[]')
    localStorage.setItem('jot_thoughts', JSON.stringify(stored.filter(t=>t.jarId!==jarId)))
    if (openJarId===jarId) setOpenJarId(null)
    window.location.reload()
  }

  function handleChitDrop(point) {
    if (!viewThought) return
    const W=window.innerWidth,H=window.innerHeight
    if (point.x<W*0.45&&point.y>H*0.6){setBurning(true);setTimeout(()=>deleteThought(viewThought.id),600);setViewThought(null)}
    else if (point.x>W*0.55&&point.y>H*0.6){setArchiveOpen(true);setTimeout(()=>setArchiveOpen(false),1200);archiveThought(viewThought.id);setViewThought(null)}
  }

  const openJar = jars.find(j=>j.id===openJarId)
  const openJarThoughts = openJar
    ? thoughts.filter(th=>th.jarId===openJar.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    : []

  return (
    <div style={{minHeight:'100vh',background:t.pageBg,display:'flex',flexDirection:'column',position:'relative',overflow:'hidden',transition:'background 0.4s ease'}}>

      <div style={{position:'absolute',bottom:'80px',right:'20px',width:'140px',height:'140px',background:`radial-gradient(circle,${t.ambientFire} 0%,transparent 70%)`,pointerEvents:'none'}}/>

      {/* Top bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 16px 0'}}>
        <div>
          <h1 style={{fontFamily:'Playfair Display, serif',fontSize:'20px',fontWeight:600,color:t.titleColor,lineHeight:1.2}}>Jar of Thoughts</h1>
          <p style={{fontSize:'11px',color:t.subtitleColor,marginTop:'1px'}}>your quiet corner</p>
        </div>
        <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
          <button onClick={()=>navigate('/search')} style={{background:'none',border:'none',cursor:'pointer',color:t.iconColor,padding:'6px'}}><Search size={17}/></button>
          <button onClick={()=>navigate('/stats')} style={{background:'none',border:'none',cursor:'pointer',color:t.iconColor,padding:'6px'}}><BarChart2 size={17}/></button>
          <button onClick={()=>setShowThemePicker(true)} style={{background:t.toggleBg,border:'none',borderRadius:'20px',padding:'5px 9px',cursor:'pointer',color:t.iconColor,display:'flex',alignItems:'center',transition:'all 0.3s'}}><Palette size={15}/></button>
          <button onClick={toggleDark} style={{background:t.toggleBg,border:'none',borderRadius:'20px',padding:'5px 9px',cursor:'pointer',color:t.iconColor,display:'flex',alignItems:'center',transition:'all 0.3s'}}>
            {dark?<Sun size={15}/>:<Moon size={15}/>}
          </button>
        </div>
      </div>

      {/* Quick stats row */}
      <div style={{display:'flex',gap:'8px',padding:'10px 16px 0',overflowX:'auto'}}>
        <div style={{background:t.panelBg,border:`1px solid ${t.panelBorder}`,borderRadius:'12px',padding:'7px 11px',flexShrink:0}}>
          <span style={{fontSize:'11px',color:t.panelMuted}}>{jars.length} jars</span>
        </div>
        <div style={{background:t.panelBg,border:`1px solid ${t.panelBorder}`,borderRadius:'12px',padding:'7px 11px',flexShrink:0}}>
          <span style={{fontSize:'11px',color:t.panelMuted}}>{thoughts.length} thoughts</span>
        </div>
        {thoughts.filter(th=>th.isLocked&&new Date(th.unlockAt)>new Date()).length>0&&(
          <div style={{background:t.writeBtnBg+'22',border:`1px solid ${t.writeBtnBg}44`,borderRadius:'12px',padding:'7px 11px',flexShrink:0}}>
            <span style={{fontSize:'11px',color:t.writeBtnBg,fontWeight:600}}>🔒 {thoughts.filter(th=>th.isLocked&&new Date(th.unlockAt)>new Date()).length} locked</span>
          </div>
        )}
        <button onClick={()=>setShowAddJar(true)}
          style={{background:t.writeBtnBg,border:'none',borderRadius:'12px',padding:'7px 11px',flexShrink:0,display:'flex',alignItems:'center',gap:'4px',cursor:'pointer',color:'#fff',fontSize:'11px',fontWeight:600}}>
          <Plus size={12}/> New jar
        </button>
      </div>

      {/* Hint */}
      <div style={{textAlign:'center',fontSize:'10px',color:t.hintText,letterSpacing:'0.06em',textTransform:'uppercase',padding:'8px 0 0'}}>
        tap · hold to rename/delete · double-tap to write
      </div>

      {/* Shelf */}
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'0 0 20px'}}>

        {/* Upper shelf */}
        <div style={{background:t.shelfTop,borderTop:`3px solid ${t.shelfTopBorder}`,borderBottom:'2px solid rgba(0,0,0,0.2)',padding:'16px 8px 12px',boxShadow:`0 8px 24px ${t.shadowColor}`,position:'relative',transition:'background 0.4s'}}>
          {[12,28,50,72,88].map(pct=>(
            <div key={pct} style={{position:'absolute',top:0,bottom:0,left:`${pct}%`,width:'1px',background:t.woodGrain,pointerEvents:'none'}}/>
          ))}
          <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end',gap:'4px',flexWrap:'wrap'}}>
            {jars.map((jar,i)=>(
              <motion.div key={jar.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0'}}>
                <div
                  onClick={()=>handleJarClick(jar)}
                  onDoubleClick={()=>handleJarDoubleClick(jar)}
                  onContextMenu={e=>{e.preventDefault();handleJarLongPress(jar)}}
                  // long press for mobile
                  onPointerDown={()=>{
                    const tid=setTimeout(()=>handleJarLongPress(jar),600)
                    const up=()=>{clearTimeout(tid);window.removeEventListener('pointerup',up)}
                    window.addEventListener('pointerup',up)
                  }}
                  style={{cursor:'pointer',position:'relative',touchAction:'manipulation'}}
                >
                  <motion.div animate={{y:openJarId===jar.id?-8:0,filter:openJarId===jar.id?'drop-shadow(0 10px 20px rgba(0,0,0,0.3))':'drop-shadow(0 4px 8px rgba(0,0,0,0.12))'}} transition={{type:'spring',stiffness:280,damping:22}}>
                    {/* Jar SVG */}
                    <div style={{position:'relative',display:'inline-block'}}>
                      <JarSVG color={jar.color} count={countFor(jar.id)} isOpen={openJarId===jar.id} width={62} height={84}/>
                      {/* Handwritten label overlaid on jar */}
                      <HandwrittenLabel name={jar.name} color={jar.color} ink={t.labelInk}/>
                    </div>
                  </motion.div>
                  {countFor(jar.id)>0&&(
                    <div style={{position:'absolute',top:'-4px',right:'-4px',background:jar.color,color:'#2C2416',borderRadius:'10px',fontSize:'9px',fontWeight:700,padding:'1px 4px',border:'1.5px solid rgba(255,255,255,0.5)'}}>
                      {countFor(jar.id)}
                    </div>
                  )}
                </div>
                {/* Emoji below jar */}
                <div style={{fontSize:'12px',marginTop:'4px',transition:'opacity 0.2s',opacity: openJarId===jar.id?1:0.7}}>
                  {jar.emoji}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lower shelf */}
        <div style={{background:t.shelfBottom,borderTop:`3px solid ${t.shelfBottomBorder}`,borderBottom:'2px solid rgba(0,0,0,0.3)',padding:'12px 16px 14px',boxShadow:`0 12px 32px ${t.shadowColor}`,display:'flex',alignItems:'flex-end',justifyContent:'space-between',transition:'background 0.4s'}}>
          <div ref={fireRef} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2px'}}>
            <FirePit/>
            <span style={{fontSize:'9px',color:t.deleteLabel,fontWeight:500}}>delete</span>
          </div>
          <div style={{fontSize:'10px',color:t.hintText,textAlign:'center',lineHeight:'1.6'}}>drag chit to<br/>delete or archive</div>
          <div ref={archiveRef} onClick={()=>navigate('/archive')} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'2px',cursor:'pointer'}}>
            <SteelBox isOpen={archiveOpen}/>
            <span style={{fontSize:'9px',color:t.archiveLabel,fontWeight:500}}>archive</span>
          </div>
        </div>
      </div>

      {/* Jar panel */}
      <AnimatePresence>
        {openJarId&&!writeJarId&&(
          <motion.div initial={{opacity:0,y:'100%'}} animate={{opacity:1,y:0}} exit={{opacity:0,y:'100%'}} transition={{type:'spring',stiffness:260,damping:28}}
            style={{position:'fixed',bottom:0,left:0,right:0,background:t.panelBg,borderRadius:'24px 24px 0 0',padding:'16px 20px 40px',maxHeight:'65vh',overflowY:'auto',zIndex:100,boxShadow:'0 -8px 40px rgba(0,0,0,0.2)',transition:'background 0.3s'}}>
            <motion.div drag="y" dragConstraints={{top:0,bottom:80}} dragElastic={0.2}
              onDragEnd={(_,info)=>{if(info.offset.y>60)setOpenJarId(null)}}
              style={{width:'48px',height:'5px',borderRadius:'3px',background:t.panelHandle,margin:'0 auto 16px',cursor:'grab',touchAction:'none'}}/>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{fontFamily:'Playfair Display, serif',fontSize:'18px',color:t.panelText}}>{openJar?.emoji} {openJar?.name}</div>
                <button onClick={()=>openJar&&setJarOptions(openJar)} style={{background:'none',border:'none',cursor:'pointer',color:t.panelMuted,padding:'4px'}}>
                  <Pencil size={14}/>
                </button>
              </div>
              <div style={{display:'flex',gap:'8px'}}>
                <button onClick={()=>setWriteJarId(openJarId)} style={{background:t.writeBtnBg,color:'#fff',border:'none',borderRadius:'20px',padding:'7px 14px',fontSize:'13px',cursor:'pointer',fontWeight:500}}>+ Write</button>
                <button onClick={()=>setOpenJarId(null)} style={{background:t.closeBtnBg,border:'none',borderRadius:'20px',padding:'7px 12px',fontSize:'13px',cursor:'pointer',color:t.closeBtnColor}}>Close</button>
              </div>
            </div>
            {openJarThoughts.length===0?(
              <div style={{textAlign:'center',padding:'40px 20px',color:t.panelMuted,fontSize:'14px',lineHeight:'1.7'}}>
                This jar is empty.<br/><span style={{fontSize:'13px',opacity:0.7}}>Tap + Write to add a thought.</span>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {openJarThoughts.map((thought,i)=>{
                  const isLocked=thought.isLocked&&thought.unlockAt&&new Date(thought.unlockAt)>new Date()
                  return(
                    <motion.div key={thought.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                      onClick={()=>!isLocked&&setViewThought(thought)}
                      style={{background:t.chitBg,border:`1px solid ${isLocked?t.writeBtnBg+'44':t.chitBorder}`,borderRadius:'12px',padding:'14px 16px',cursor:isLocked?'default':'pointer',opacity:isLocked?0.75:1,backgroundImage:`repeating-linear-gradient(transparent,transparent 27px,${t.chitLines} 27px,${t.chitLines} 28px)`,backgroundSize:'100% 28px',transition:'background 0.3s'}}>
                      {isLocked?(
                        <div>
                          <div style={{fontSize:'13px',color:t.writeBtnBg,fontWeight:500,marginBottom:'4px'}}>🔒 Time capsule</div>
                          <div style={{fontSize:'12px',color:t.panelMuted}}>Unlocks on {new Date(thought.unlockAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</div>
                        </div>
                      ):(
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
        {writeJarId&&<WriteModal jar={jars.find(j=>j.id===writeJarId)} onSave={handleSaveThought} onClose={()=>setWriteJarId(null)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {viewThought&&<ChitPaper thought={viewThought} jar={jars.find(j=>j.id===viewThought.jarId)} onDrop={handleChitDrop} onClose={()=>setViewThought(null)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {jarOptions&&(
          <JarOptionsModal
            jar={jarOptions}
            onRename={name=>handleRenameJar(jarOptions.id,name)}
            onDelete={()=>handleDeleteJar(jarOptions.id)}
            onClose={()=>setJarOptions(null)}
            t={t}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showThemePicker&&<ThemePicker currentTheme={themeName} dark={dark} onSelect={selectTheme} onClose={()=>setShowThemePicker(false)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {showAddJar&&<AddJarModal onAdd={addJar} onClose={()=>setShowAddJar(false)} t={t}/>}
      </AnimatePresence>
      <AnimatePresence>
        {burning&&<BurnOverlay onDone={()=>setBurning(false)}/>}
      </AnimatePresence>
    </div>
  )
}