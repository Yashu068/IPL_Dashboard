## IPL Live Stats & Fantasy Team Builder

A frontend-only React app (Vite + Tailwind) that lets you:
- View simulated live matches
- Explore player stats (generated dataset)
- See analytics via charts

---

### Tech stack
- React 18, Vite 5
- Tailwind CSS
- React Router
- Chart.js + react-chartjs-2
- Framer Motion, @hello-pangea/dnd

---

### Project structure
- `src/pages/`: `LiveMatches`, `PlayerStats`, `FantasyBuilder`, `Analytics`
- `src/components/`: `Navbar`, `Sidebar`, `MatchCard`, `Footer`
- `src/context/`: global app context
- `src/data/`: `players.json`, `matches.json`
- `src/scripts/generatePlayers.js`: optional player dataset generator

---

### Prerequisites
- Node.js 18+
- npm 9+ (or compatible package manager)

---

### Run locally
1) Install dependencies
```bash
npm install
```

2) Start dev server
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

3) (Optional) Generate players dataset
```bash
npm run generate:players
```

4) Build for production
```bash
npm run build
```
Then preview the built output locally:
```bash
npm run preview
```

---

### Push this project to GitHub (first time)
1) Create a new empty repository on GitHub (do not add README/.gitignore/license there).

2) Initialize and commit locally
```bash
git init
git add .
git commit -m "chore: initial commit"
```

3) Add the remote and push
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Next commits can be pushed with:
```bash
git add .
git commit -m "feat: ..."
git push
```

---

### Deploy on GitHub Pages (optional)
This project is Vite-based. For GitHub Pages you may want the site to be served from a sub-path. If your repository name is `<your-repo>`, set Vite `base` to `"/<your-repo>/"`.

1) Update `vite.config.js`
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<your-repo>/', // <-- add this line for GitHub Pages
})
```

2) Add deploy scripts (already using `gh-pages` devDependency)
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3) Deploy
```bash
npm run deploy
```

4) Set GitHub Pages source to `gh-pages` branch in repo settings. Your app will be available at `https://<your-username>.github.io/<your-repo>/`.

Note: For user/organization pages (served at the root), set `base: '/'`.

---

### Environment files
No secrets are required for local run. If you add environment variables, use `.env` files locally; they are ignored by Git. Provide non-sensitive examples in `.env.example`.

#### Weather setup (OpenWeatherMap)
To show live weather on match cards:
1) Create a free API key at [OpenWeatherMap API](https://openweathermap.org/api).
2) Create a file named `.env` in the project root and add:
```bash
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```
3) Restart the dev server.

Weather is fetched per unique venue (mapped to a city) and displayed as temperature and condition next to the venue.

---

### License
MIT (or your preferred license)
