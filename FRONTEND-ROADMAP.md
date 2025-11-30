# LeBonResto - Frontend Roadmap (Next.js)

This roadmap outlines the step-by-step development plan for the LeBonResto frontend using Next.js (JavaScript).

## 📅 Phase 1: Setup & Foundation
**Goal**: Initialize the project and set up the core architecture.

- [ ] **Project Initialization**
  - [ ] Create Next.js app (`npx create-next-app@latest`)
  - [ ] Configure Tailwind CSS
  - [ ] Set up ESLint & Prettier
  - [ ] Configure absolute imports (`@/components`, `@/lib`, etc.)
- [ ] **Core Libraries**
  - [ ] Install `axios` for API requests
  - [ ] Install `lucide-react` for icons
  - [ ] Install `clsx` and `tailwind-merge` for class management
  - [ ] Install `zustand` for state management (auth, cart)
  - [ ] Install `react-hook-form` + `zod` for form validation
  - [ ] Install `sonner` or `react-hot-toast` for notifications
- [ ] **UI Component Library (Shadcn UI)**
  - [ ] Initialize Shadcn UI
  - [ ] Add core components: Button, Input, Card, Dialog, Dropdown, Avatar, Badge, Form

## 🎨 Phase 2: Layout & Navigation
**Goal**: Create the visual shell of the application.

- [ ] **Global Layout**
  - [ ] Create `RootLayout` with metadata
  - [ ] Implement `Navbar` (responsive, different states for guest/user)
  - [ ] Implement `Footer`
- [ ] **Theme**
  - [ ] Define color palette in `tailwind.config.js`
  - [ ] Set up fonts (Inter, Playfair Display for headings)

## 🏠 Phase 3: Public Pages
**Goal**: Allow users to browse and search for restaurants.

- [ ] **Home Page (`/`)**
  - [ ] Hero section with search bar
  - [ ] "Popular Categories" section
  - [ ] "Featured Restaurants" carousel
  - [ ] "How it Works" section
- [ ] **Search Page (`/search`)**
  - [ ] Sidebar with filters (City, Category, Tags, Price)
  - [ ] Restaurant list with cards
  - [ ] Map view (optional - integration with Leaflet or Google Maps)
- [ ] **Restaurant Details Page (`/restaurants/[id]`)**
  - [ ] Hero banner with restaurant images
  - [ ] Info section (Address, Phone, Hours, Map)
  - [ ] Menu tab (Categories, Items with prices)
  - [ ] Reviews tab
  - [ ] "Book a Table" sticky button/modal

## 🔐 Phase 4: Authentication
**Goal**: Enable user registration and login.

- [ ] **Auth Pages**
  - [ ] Login Page (`/login`)
  - [ ] Register Page (`/register`) - Toggle for Customer/Owner
  - [ ] Forgot Password flow
- [ ] **Auth Integration**
  - [ ] Implement `useAuth` store (Zustand)
  - [ ] Connect to backend `/auth/login` and `/auth/register`
  - [ ] Handle JWT storage (HttpOnly cookies or localStorage)
  - [ ] Create `ProtectedRoute` component/HOC

## 👤 Phase 5: Customer Dashboard
**Goal**: Allow customers to manage their activity.

- [ ] **Dashboard Layout**
  - [ ] Sidebar navigation
- [ ] **Profile Management**
  - [ ] Edit profile form
  - [ ] Change password
- [ ] **Reservations**
  - [ ] List of upcoming/past reservations
  - [ ] Cancel reservation action
- [ ] **Favorites**
  - [ ] List of saved restaurants

## 👨‍🍳 Phase 6: Owner Dashboard
**Goal**: Allow owners to manage their restaurant.

- [ ] **Restaurant Management**
  - [ ] Create/Edit Restaurant profile
  - [ ] Upload images (Cloudinary integration)
  - [ ] Manage Tags
- [ ] **Menu Management**
  - [ ] Upload PDF Menu
  - [ ] Add/Edit/Delete Dishes (Plats)
- [ ] **Reservation Management**
  - [ ] Kanban board or List view of reservations
  - [ ] Accept/Reject/Complete actions

## 🛡️ Phase 7: Admin Dashboard (Optional/Later)
**Goal**: Platform administration.

- [ ] **User Management** (List/Ban users)
- [ ] **Restaurant Verification** (Approve/Reject new listings)
- [ ] **Platform Stats**

## 🚀 Phase 8: Optimization & Deployment
**Goal**: Prepare for production.

- [ ] **SEO**
  - [ ] Add metadata to all pages
  - [ ] Generate sitemap
- [ ] **Performance**
  - [ ] Optimize images (`next/image`)
  - [ ] Code splitting
- [ ] **Deployment**
  - [ ] Deploy to Vercel
  - [ ] Configure environment variables

---

## 🛠️ Tech Stack Summary

- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI (Radix Primitives)
- **Icons**: Lucide React
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
