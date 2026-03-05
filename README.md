# Lens Master - Premium Optical Ecommerce Platform

> A premium, production-ready ecommerce platform for optical products, built with React, Node.js, Express, and MongoDB. Inspired by Lenskart.com — featuring glassmorphism UI, Framer Motion animations, secure JWT authentication, multi-step lens customization, Razorpay payments, and a hidden admin panel.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (access tokens), bcrypt (12 rounds) |
| Payments | Razorpay |
| Security | Helmet, express-rate-limit, CORS, express-validator |

---

## 📁 Project Structure

```
lens/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, CartDrawer, ProductCard, LensCustomizer...
│   │   ├── pages/        # Home, Products, ProductDetail, Checkout, Profile, Admin...
│   │   ├── context/      # AuthContext, CartContext
│   │   ├── hooks/        # useDebounce, useLocalStorage
│   │   └── utils/        # api.js (Axios instance), helpers
│   └── .env.example
└── server/          # Express backend
    ├── config/       # DB connection, seed data
    ├── controllers/  # Auth, Products, Cart, Orders, Admin, Payments, Reviews
    ├── middleware/   # JWT auth, rate limiter, file upload, validation
    ├── models/       # User, Product, Order, Cart, Prescription, Review
    ├── routes/       # API routes
    ├── uploads/      # Uploaded prescriptions (gitignored)
    └── .env.example
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or MongoDB Atlas)
- Razorpay account (for payments)

### 1. Clone the repository
```bash
git clone <repo-url>
cd lens
```

### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Razorpay credentials
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd client
cp .env.example .env
# Edit .env with your Razorpay key ID
npm install
npm run dev
```

### 4. Seed Sample Products (optional)
```bash
cd server
node config/seeder.js
```

---

## 🔑 Environment Variables

### Server (`server/.env`)
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (`development` / `production`) |
| `PORT` | Server port (default: `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRE` | Token expiry (e.g., `7d`) |
| `RAZORPAY_KEY_ID` | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret |
| `CLIENT_URL` | Frontend URL for CORS (e.g., `http://localhost:3000`) |

### Client (`client/.env`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (e.g., `http://localhost:5000/api`) |
| `VITE_RAZORPAY_KEY_ID` | Razorpay key ID (public) |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login (rate limited: 5/15min) |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/products` | List products (with filters/pagination) |
| GET | `/api/products/search` | Live search suggestions |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart/add` | Add item to cart |
| POST | `/api/orders` | Create order |
| POST | `/api/payments/create-order` | Create Razorpay order |
| POST | `/api/payments/verify` | Verify payment |
| POST | `/api/payments/webhook` | Razorpay webhook |
| GET | `/api/admin/dashboard` | Admin stats (admin only) |
| GET | `/api/admin/orders` | All orders (admin only) |
| POST | `/api/admin/products` | Add product (admin only) |

---

## 🏠 Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, search, trending products |
| `/products` | Product listing with filters & pagination |
| `/products/:id` | Product detail with lens customization |
| `/cart` | Shopping cart |
| `/checkout` | Secure checkout with Razorpay |
| `/login` | Customer login |
| `/register` | Customer registration |
| `/profile` | User profile & orders |
| `/about` | About Lens Master |
| `/contact` | Contact page |
| `/admin/login` | **Hidden** admin login (not linked from public nav) |
| `/admin` | Admin dashboard (admin only) |
| `/admin/products` | Manage products |
| `/admin/orders` | Manage orders |
| `/admin/users` | Manage users |

---

## 🔐 Security Features

- **JWT Authentication** with token expiry
- **bcrypt** password hashing (12 salt rounds)
- **Account lockout** after 5 failed login attempts (30 min)
- **Rate limiting**: 100 req/15min (API), 5 req/15min (login), 30 req/min (search)
- **Helmet** HTTP security headers
- **CORS** restricted to `CLIENT_URL`
- **Input validation** with express-validator
- **File upload** restrictions: JPG/PNG/PDF only, max 5MB, UUID filenames
- **Razorpay webhook** HMAC signature verification
- **Admin routes** completely hidden from public navigation

---

## 🎨 UI Features

- Glassmorphism navbar (scrolled state)
- Framer Motion page transitions & hero animations
- 3D tilt + shadow elevation on product card hover
- Multi-step lens customization modal with dynamic pricing
- Animated cart drawer (slide from right)
- Skeleton loaders for products
- Responsive mobile-first design with hamburger menu
- Dark mode ready (CSS variables)
- Toast notifications for all actions
- Star ratings, wishlist icons, New/Trending badges

---

## 📦 Production Build

```bash
# Build frontend
cd client && npm run build

# Start backend in production
cd server && NODE_ENV=production npm start
```

---

## 📄 License

MIT License — © 2024 Lens Master
