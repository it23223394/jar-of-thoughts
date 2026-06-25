# 🫙 Jar of Thoughts

A warm, personal emotional keepsake app where you write thoughts on digital paper chits and drop them into themed glass jars. Revisit them later — sometimes years later — exactly as you wrote them.

> *Not a notes app. Not a journal. A quiet corner for pieces of your heart.*

---

## ✨ Features

### Core Experience
- **Glass jar shelf** — jars sit on illustrated wooden planks, fill up as you add thoughts
- **Write & drop** — double-tap a jar to write, your thought drops in as a paper chit
- **Read & drag** — open a jar, pull out a chit, read it with its original timestamp
- **Drag to delete** — drag a chit to the 🔥 fire pit to burn it permanently
- **Drag to archive** — drag a chit to the 📦 steel box to archive it safely

### Jars
- 7 default jars: Love ❤️, Life 🌿, Sadness 🌧, Neutral ☁️, Dreams ✨, Gratitude 🌻, Unsent Words 🔥
- Add custom jars with your own name, emoji, and colour
- Rename or delete any jar (long-press on mobile, right-click on desktop)
- Handwritten label on each jar showing its name

### Thoughts
- Automatic timestamp on every thought (date + time, never entered manually)
- Relative time display ("Written 8 months ago")
- Time capsule locking: lock a thought for 1 month / 3 months / 6 months / 1 year
- Locked thoughts show as sealed in the jar until the date arrives
- Move thoughts between jars
- Archive instead of delete

### Shelf System
- Responsive rack layout: jars automatically reflow into shelf rows based on screen width
- Desktop: more jars per shelf row; Mobile: fewer, more rows
- Smooth reflow animation when screen resizes or new jars are added
- Scrollable shelves with fire + archive bar fixed at the bottom

### Search & Stats
- Search across all thoughts by keyword
- Stats page: total thoughts, jar breakdown, donut chart, 6-month writing activity bar chart, active days, average words, journey span
- Archive page: view, restore, or permanently delete archived thoughts

### Themes & Appearance
- 5 colour themes: **Amber** (warm brown), **Sage** (forest green), **Rose** (dusty rose), **Slate** (blue-grey), **Lavender** (purple)
- Each theme has a **light** and **dark** variant (10 total)
- Preference saved locally, persists across sessions
- Stats, Search, and Archive all follow the active theme

### Backup & Restore
- **Export**: saves all jars, thoughts, archive, and settings to a JSON file
  - On Android: shares via native share sheet (Drive, Gmail, etc.)
  - On browser: downloads as a file
- **Import**: restore everything from an exported file

### PWA / Android
- Installable as a PWA — open in Chrome → Add to Home Screen → works like a native app
- Full offline support via service worker
- Android APK buildable via Capacitor + Android Studio
- Custom app icon
- Android back button navigates within app (doesn't exit)

---

## 🛠 Tech Stack

| Layer | Tool |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS v4 + inline styles |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Date handling | dayjs |
| Icons | Lucide React |
| Storage | localStorage |
| PWA | vite-plugin-pwa + Workbox |
| Android | Capacitor |

**100% free. No backend. No database. No subscriptions.**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS) — [nodejs.org](https://nodejs.org)
- Git — [git-scm.com](https://git-scm.com)

### Install & Run

```bash
git clone https://github.com/YOUR_USERNAME/jar-of-thoughts.git
cd jar-of-thoughts
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Install on Phone (PWA — No App Store)

1. Run `npm run build` then `npx vercel --prod` to deploy (free on [vercel.com](https://vercel.com))
2. Open your Vercel URL in **Chrome on Android**
3. Tap the three-dot menu → **Add to Home Screen**
4. Done — it installs like a real app, works offline, no Play Store needed

---

## 🤖 Build Android APK (Optional)

If you want a native APK via Capacitor:

```bash
npm run build
npx cap sync android
```

Then open the `android/` folder in Android Studio and run on your device.

---

## 📂 Project Structure

```
jar-of-thoughts/
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── hooks/
│   │   ├── useJars.js      # Jar CRUD + localStorage
│   │   ├── useThoughts.js  # Thought CRUD + archive
│   │   └── useTheme.js     # Shared theme reader
│   ├── components/
│   │   ├── JarSVG.jsx      # Glass jar illustration
│   │   ├── ChitPaper.jsx   # Draggable paper chit
│   │   ├── AppHeader.jsx   # Shared top bar
│   │   └── ...
│   ├── screens/
│   │   ├── Home.jsx        # Shelf + all interactions
│   │   ├── Stats.jsx       # Analytics
│   │   ├── Search.jsx      # Keyword search
│   │   └── Archive.jsx     # Archived thoughts
│   ├── App.jsx             # Router
│   ├── main.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

---

## 🔮 Planned (Not Yet Applied)

- **Firestore cloud sync** — Firebase project created, Auth + Firestore enabled, hooks written. Paused before integration. Will enable real-time sync across devices when resumed.

---

## 💾 Data Storage

All data lives in your browser's `localStorage`:

| Key | Contents |
|---|---|
| `jot_jars` | Your jar list |
| `jot_thoughts` | All thoughts |
| `jot_archive` | Archived thoughts |
| `jot_dark` | Dark mode preference |
| `jot_theme` | Active theme name |

Use the **Export** feature on the Stats page to back up your data regularly.

---

## 🙏 Built with

Playfair Display & Inter via Google Fonts. Fire and steel box animations hand-crafted in SVG + Framer Motion. No AI-generated content inside the jars — only yours.

---

*Made with warmth. Every note becomes a small preserved moment in time.*
