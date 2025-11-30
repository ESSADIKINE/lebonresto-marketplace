# LeBonResto - Frontend Setup Guide

Follow this guide to initialize and configure the Next.js frontend project.

## 📋 Prerequisites

- **Node.js**: v18.17.0 or later
- **npm**: v9 or later
- **Git**: Installed and configured

## 🚀 Step 1: Initialize Next.js Project

Run the following command to create the project:

```bash
npx create-next-app@latest lebonresto-frontend
```

**Configuration Prompts:**
- Would you like to use TypeScript? **No** (as requested)
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **Yes**
- Would you like to use App Router? **Yes** (Recommended)
- Would you like to customize the default import alias (@/*)? **Yes** (Default is fine)

Navigate into the project:
```bash
cd lebonresto-frontend
```

## 📦 Step 2: Install Core Dependencies

Install the essential libraries for the project:

```bash
# UI & Icons
npm install lucide-react clsx tailwind-merge class-variance-authority

# State Management
npm install zustand

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# HTTP Client
npm install axios

# Notifications
npm install sonner

# Date Handling
npm install date-fns
```

## 🎨 Step 3: Setup Shadcn UI

Initialize Shadcn UI for pre-built components:

```bash
npx shadcn-ui@latest init
```

**Configuration Prompts:**
- Which style would you like to use? **Default**
- Which color would you like to use as base color? **Slate**
- Do you want to use CSS variables for colors? **Yes**

Add common components:
```bash
npx shadcn-ui@latest add button input card dialog dropdown-menu avatar badge form label separator sheet
```

## 📂 Step 4: Project Structure

Organize your `src` directory like this:

```
src/
├── app/                  # App Router pages
│   ├── (auth)/           # Auth routes (login, register)
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
│
├── components/           # React components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Navbar, Footer, Sidebar
│   └── features/         # Feature-specific components (e.g., RestaurantCard)
│
├── lib/                  # Utilities
│   ├── utils.js          # Helper functions
│   ├── axios.js          # Axios instance configuration
│   └── store.js          # Zustand stores
│
├── hooks/                # Custom React hooks
└── styles/               # Global styles
```

## ⚙️ Step 5: Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🌐 Step 6: Configure Axios

Create `src/lib/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important for cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

## 🏃 Step 7: Run the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

---

## 📝 Next Steps

Refer to `FRONTEND-ROADMAP.md` for the development phases.
