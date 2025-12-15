# 🌌 FLOAT - Zero Gravity Game Portal

**Float** is a next-generation web game portal built for speed, immersion, and zero-latency gaming. Featuring a deep "Void" aesthetic, parallax starfields, and a native physics-based mini-game.

![App Icon](src/app/icon.png)

## 🚀 Key Features

*   **Zero-G Interface**: Deep dark mode with glassmorphism, floating cards, and smooth Framer Motion animations.
*   **Gravity Lander**: A native, persistent physics mini-game (`/engage/gravity-lander`) playable on Desktop (Keyboard) and Mobile (Touch Controls).
*   **Game Library**: Dynamic grid of uploaded games using **Firebase Firestore**.
*   **Admin Studio**: Secure dashboard for uploading new titles (Thumbnail, Description, External Link).
*   **Hybrid Storage**: Uses Firestore for metadata and external URLs for heavy binaries/assets to keep costs zero.
*   **Responsive Core**: Fully adaptive `Navbar` with mobile drawer and touch-optimized layouts.
*   **Security**: Firebase Authentication (Google Sign-In) and Route Protection.

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (Turbopack)
*   **Styling**: Tailwind CSS v4 + Framer Motion
*   **Backend**: Firebase (Auth, Firestore)
*   **Deployment**: Vercel (Recommended)

## 🎮 How to Play

1.  **Visit**: Go to the `/engage` page.
2.  **Gravity Lander**: Click the native card to launch the physics lander.
    *   **Desktop**: Arrow Keys to Rotate/Thrust. Space to Start.
    *   **Mobile**: On-screen Touch Controls.
3.  **Library**: Browse and launch other hosted games.

## 📦 Deployment

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set up `.env.local` with your Firebase credentials.
4.  Run: `npm run dev`
5.  Build: `npm run build`

## 👨‍💻 Admin Access

The `/admin` route is protected. Ensure your email is authorized in the `admin/page.tsx` logic or Firestore rules to upload new games.

---
*Built with Next.js & Tailwind by Sarvesh2005-code*
