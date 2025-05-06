# Motion Budget

A cross-platform desktop application for managing and visualizing budget or task data, featuring authentication, data visualization, and the ability to export user data as JSON or CSV files. Built using Electron for desktop deployment and Next.js/React for the frontend.

---

## Features
- **Local authentication** (login/logout, protected dashboard)
- **Dashboard** with charts and statistics
- **Export user data** as JSON or CSV (native file dialog)
- **Electron integration** for secure filesystem access

---

## Architecture
- **Electron Main Process (`main.js`)**: Launches the app, serves the Next.js build, handles IPC for file saving.
- **Preload Script (`preload.js`)**: Exposes a secure `electronAPI` to the renderer for file operations.
- **Next.js Frontend**: Handles UI, authentication, data visualization, and calls the Electron API for exports.
- **TypeScript Declaration (`src/global.d.ts`)**: Declares the custom `window.electronAPI` for type safety.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Build the Next.js app
```bash
npm run build
```

### 3. Start Electron
```bash
npm run electron
# or
npx electron .
```

---

## Usage
- **Login** with your credentials.
- **View the dashboard** with charts and statistics.
- **Export your data** by clicking "Download JSON" or "Download CSV". Choose a location to save your file.

---

## Project Structure
```
motion-budget/
├── main.js              # Electron main process
├── preload.js           # Preload script for secure API exposure
├── out/                 # Next.js static build (served by Electron)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── components/
│   │   └── dashboard/Dashboard.tsx
│   └── global.d.ts      # TypeScript global declarations
├── package.json
└── ...
```

---

## Extending the App
- Add more APIs to `preload.js` for new features (import, notifications, etc.)
- Extend the dashboard with more charts or data sources
- Enhance authentication (OAuth, multi-user, etc.)

---

## License
MIT
