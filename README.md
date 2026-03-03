<div align="center">

# 🛍️ ShopEasy
### Full Stack E-Commerce Platform

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A modern, full-featured e-commerce application built from scratch with React and FastAPI. Includes user authentication, product catalog, shopping cart, order management, and a complete admin panel.

[View Demo](#) · [Report Bug](https://github.com/victordeseifecastro/shopeasy/issues) · [Request Feature](https://github.com/victordeseifecastro/shopeasy/issues)

</div>

---

## ✨ Features

### 🧑‍💻 Customer
- JWT authentication (register & login)
- Product catalog with search, category filters and pagination
- Product detail page
- Persistent shopping cart (Zustand)
- Full checkout flow
- Order history with real-time status
- Cancel orders (pending & confirmed)
- Request returns for delivered orders

### 🛠️ Admin Panel
- Product CRUD (create, edit, soft delete)
- Low stock alerts
- Order management with status updates
- Filter orders by status or username
- Return request handling
- Real revenue tracking (excludes cancelled & returned)

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Zustand, Tailwind CSS, Axios |
| Backend | FastAPI, SQLAlchemy, Pydantic, Python 3.12 |
| Auth | JWT (python-jose), bcrypt (passlib) |
| Database | SQLite |
| Dev Tools | Vite, Uvicorn |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+

### Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install fastapi uvicorn sqlalchemy python-jose[cryptography] passlib[bcrypt] python-multipart python-dotenv pydantic-settings email-validator bcrypt==4.0.1 passlib==1.7.4

# Create .env file
echo DATABASE_URL=sqlite:///./shopeasy.db > .env
echo SECRET_KEY=your_secret_key_here >> .env
echo ALGORITHM=HS256 >> .env
echo ACCESS_TOKEN_EXPIRE_MINUTES=30 >> .env

# Seed the database
python seed.py

# Start the server
uvicorn app.main:app --reload
```

Backend running at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend running at `http://localhost:5173`

### Make yourself admin
```bash
cd backend
python -c "
from app.database import SessionLocal
from app.models.user import User
db = SessionLocal()
user = db.query(User).first()
user.is_admin = True
db.commit()
print(f'Done! {user.username} is now admin')
db.close()
"
```

---

## 📁 Project Structure
```
shopeasy/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py        # Environment variables
│   │   │   ├── dependencies.py  # Auth dependencies
│   │   │   └── security.py      # JWT & password hashing
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   └── order.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── products.py
│   │   │   └── orders.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── product.py
│   │   │   └── order.py
│   │   ├── database.py
│   │   └── main.py
│   ├── seed.py
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── AuthPage.jsx     # Login & Register
│       │   ├── Home.jsx
│       │   ├── ProductDetail.jsx
│       │   ├── Cart.jsx
│       │   ├── Checkout.jsx
│       │   ├── MyOrders.jsx
│       │   ├── OrderSuccess.jsx
│       │   └── admin/
│       │       └── Dashboard.jsx
│       ├── services/
│       │   └── api.js
│       └── store/
│           └── cartStore.js
└── README.md
```

---

## 🔄 Order Status Flow
```
pending → confirmed → shipped → delivered → return_requested → returned
   ↓           ↓
cancelled   cancelled
```

---

## 🌱 Upcoming Features

- [ ] Deploy on Vercel + Render
- [ ] User profile page
- [ ] Related products on detail page
- [ ] Email notifications on order status change
- [ ] Product reviews & ratings

---

## 👨‍💻 Author

**Victor Deseife Castro**

[![GitHub](https://img.shields.io/badge/GitHub-victordeseifecastro-181717?style=for-the-badge&logo=github)](https://github.com/victordeseifecastro)

---

<div align="center">
  <p>Built with ❤️ by Victor Deseife Castro</p>
  <p>⭐ Star this repo if you found it useful!</p>
</div>