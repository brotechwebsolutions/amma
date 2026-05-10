# 🌸 Forever My Home — Mother's Day Tribute

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-r163-000000?style=flat-square&logo=threedotjs)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)

> A cinematic, emotional tribute website dedicated to Mom and my Second Mom.
> Built like an interactive short film — not a normal website.
> Crafted with love, motion, and memory.

---

## 📁 Section 1 — Project Structure

```
src/
├── assets/
│   ├── mom/
│   │   ├── mom1.jpg
│   │   ├── mom2.jpg
│   │   └── mom3.jpg
│   ├── sister/
│   │   ├── sister1.jpg
│   │   └── sister2.jpg
│   ├── textures/
│   │   ├── grain.png
│   │   └── paper-texture.jpg
│   └── intro/
│       └── hero-bg.jpg
├── components/
│   ├── Loader.jsx
│   ├── IntroScreen.jsx
│   ├── FloatingParticles.jsx
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── MomSection.jsx
│   ├── SisterSection.jsx
│   ├── TimelineSection.jsx
│   ├── LetterSection.jsx
│   └── EndingSection.jsx
├── hooks/
│   ├── useLenis.js
│   ├── useScrollReveal.js
│   └── useGSAPTimeline.js
├── pages/
│   └── Home.jsx
├── styles/
│   └── globals.css
├── utils/
│   ├── constants.js
│   └── gsapAnimations.js
├── App.jsx
└── main.jsx
```

---

## 🖼️ Section 2 — How to Add Your Photos

### Step 1 — Prepare Your Photos

- Use **JPG or PNG** format only
- Recommended size: **1200×1600px** (portrait) or **1600×1200px** (landscape)
- Keep file sizes **under 2MB each** for fast loading
- Name them **exactly** as shown below — spelling and capitalisation matter
- Use real, high-quality personal photos for the best emotional impact

### Step 2 — Rename Your Photos

Rename your photos exactly like this:

```
MOM PHOTOS (need exactly 3):
  mom1.jpg   ← your first mom photo
  mom2.jpg   ← your second mom photo
  mom3.jpg   ← your third mom photo

SISTER PHOTOS (need exactly 2):
  sister1.jpg  ← your first sister photo
  sister2.jpg  ← your second sister photo

HERO BACKGROUND (need exactly 1):
  hero-bg.jpg  ← a wide family or emotional background photo
```

### Step 3 — Place Photos Into Correct Folders

Copy your renamed photos into these exact folder paths:

```
Copy mom photos here:
  src/assets/mom/mom1.jpg
  src/assets/mom/mom2.jpg
  src/assets/mom/mom3.jpg

Copy sister photos here:
  src/assets/sister/sister1.jpg
  src/assets/sister/sister2.jpg

Copy hero background here:
  src/assets/intro/hero-bg.jpg
```

### Step 4 — Verify Photo Imports

The import code is **already written** inside each component. You do NOT need to change any code. The imports are set up like this:

```js
import mom1 from "../assets/mom/mom1.jpg";
import mom2 from "../assets/mom/mom2.jpg";
import mom3 from "../assets/mom/mom3.jpg";
import sister1 from "../assets/sister/sister1.jpg";
import sister2 from "../assets/sister/sister2.jpg";
import heroBg from "../assets/intro/hero-bg.jpg";
```

✅ As long as your photo names match exactly, everything works automatically.

### Step 5 — Add Texture Files (Optional)

Place 2 texture files in `src/assets/textures/`:

```
grain.png         ← film grain texture
paper-texture.jpg ← letter paper texture
```

Both can be downloaded for free from: [transparenttextures.com](https://www.transparenttextures.com)

These add the cinematic film grain and letter paper effect. If you skip this, the site still works — it just loses the premium texture feel.

---

## ⚙️ Section 3 — Local Setup & Installation

### Prerequisites

Make sure you have installed:
- **Node.js** version 18 or higher
- **npm** version 9 or higher

Check your versions:

```bash
node --version
npm --version
```

### Clone & Install

**Step 1** — Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/mothers-day-tribute.git
```

**Step 2** — Enter the project folder:

```bash
cd mothers-day-tribute
```

**Step 3** — Install all dependencies:

```bash
npm install
```

**Step 4** — Add your photos (see Section 2 above)

**Step 5** — Start the development server:

```bash
npm run dev
```

**Step 6** — Open in your browser:

```
http://localhost:5173
```

---

## 🚀 Section 4 — How to Deploy on Vercel

### Method A — Deploy via Vercel Website (Recommended — Easiest)

**STEP 1 — Push your project to GitHub**

1a. Go to [github.com](https://github.com) and create a new repository:
   - Click the **"+"** icon top right → **"New repository"**
   - Name it: `mothers-day-tribute`
   - Set to Public or Private (your choice)
   - Click **"Create repository"**

1b. In your terminal, run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit — Mother's Day Tribute"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mothers-day-tribute.git
git push -u origin main
```

> Replace `YOUR-USERNAME` with your actual GitHub username.

**STEP 2 — Connect to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** — recommended
4. Authorize Vercel to access your GitHub

**STEP 3 — Import Your Project**

1. On the Vercel dashboard click **"Add New Project"**
2. Find your repository: `mothers-day-tribute`
3. Click **"Import"**

**STEP 4 — Configure Build Settings**

Vercel will auto-detect Vite. Verify these settings:

```
Framework Preset:  Vite
Build Command:     npm run build
Output Directory:  dist
Install Command:   npm install
```

Do NOT change anything else. Click **"Deploy"**.

**STEP 5 — Wait for Deployment**

Vercel will build and deploy automatically. This takes about 60–90 seconds. You will see a live URL like:

```
https://mothers-day-tribute.vercel.app
```

**STEP 6 — Your Site is Live! 🎉**

Copy your live URL and share it. Every time you push changes to GitHub, Vercel will automatically redeploy.

---

### Method B — Deploy via Vercel CLI

**STEP 1** — Install Vercel CLI globally:

```bash
npm install -g vercel
```

**STEP 2** — Login to Vercel:

```bash
vercel login
```

(Follow the prompts — it will open your browser)

**STEP 3** — Build your project:

```bash
npm run build
```

**STEP 4** — Deploy to Vercel:

```bash
vercel
```

Answer the prompts:

```
Set up and deploy? → Y
Which scope?       → Select your account
Link to existing project? → N
Project name?      → mothers-day-tribute
Directory?         → ./
Override settings? → N
```

**STEP 5** — Deploy to production:

```bash
vercel --prod
```

Your live URL will appear in the terminal. Done!

---

### 🔄 How to Update Your Deployed Site

**Via GitHub (Method A):**

```bash
git add .
git commit -m "Updated photos and content"
git push
```

> Vercel auto-deploys in ~60 seconds.

**Via CLI (Method B):**

```bash
vercel --prod
```

---

### 🌐 Custom Domain (Optional)

To use your own domain (e.g. `formymom.com`):

1. Go to your project on [vercel.com](https://vercel.com)
2. Click **"Settings"** → **"Domains"**
3. Type your domain name and click **"Add"**
4. Follow Vercel's DNS instructions for your domain provider
5. SSL certificate is automatic and free ✅

---

## 🛠️ Section 5 — Available Scripts

```bash
npm run dev      → Start local development server
npm run build    → Build for production
npm run preview  → Preview production build locally
npm run lint     → Check for code errors
```

---

## 📦 Section 6 — Dependencies

**Production:**

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | React DOM renderer |
| `framer-motion` | ^11.0.0 | Smooth component animations |
| `gsap` | ^3.12.5 | Advanced scroll animations |
| `lenis` | ^1.1.5 | Ultra smooth scrolling |
| `three` | ^0.163.0 | 3D particle system |

**Development:**

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^5.2.8 | Build tool and dev server |
| `@vitejs/plugin-react` | ^4.2.1 | React plugin for Vite |
| `tailwindcss` | ^3.4.3 | Utility CSS framework |
| `autoprefixer` | ^10.4.19 | CSS vendor prefixes |
| `postcss` | ^8.4.38 | CSS processing |

---

## ❓ Section 7 — Troubleshooting

**⚠️ PROBLEM: Photos not showing**

```
✅ SOLUTION:
  - Check photo names match exactly (case-sensitive)
  - Check photos are in the correct folders
  - Make sure file format is .jpg or .png
  - Restart dev server after adding photos: npm run dev
```

**⚠️ PROBLEM: npm install fails**

```
✅ SOLUTION:
  - Make sure Node.js 18+ is installed
  - Delete node_modules folder and package-lock.json
  - Run npm install again
```

**⚠️ PROBLEM: Animations not working**

```
✅ SOLUTION:
  - Hard refresh the browser: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
  - Check browser console for errors
  - Make sure all packages installed correctly
```

**⚠️ PROBLEM: Vercel build fails**

```
✅ SOLUTION:
  - Run npm run build locally first — fix any errors
  - Make sure all photo files are committed to GitHub
  - Check Vercel build logs for specific error message
  - Verify build command is: npm run build
  - Verify output directory is: dist
```

**⚠️ PROBLEM: Site looks broken on mobile**

```
✅ SOLUTION:
  - Open browser DevTools
  - Toggle device toolbar (Ctrl+Shift+M)
  - Test at 375px width
  - Check console for any JS errors
```

**⚠️ PROBLEM: Grain texture not showing**

```
✅ SOLUTION:
  - Download grain.png from transparenttextures.com
  - Place in src/assets/textures/grain.png
  - Restart dev server
```

---

## 💛 Section 8 — Credits & Closing

---

Built with love for the two most important women in my life.

**Tech Stack:** React · Vite · Tailwind CSS · GSAP · Framer Motion · Three.js · Lenis

Deployed with ♥ on Vercel

> *"Forever My Home ❤️"*
