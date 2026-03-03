<div align="center">

# 🛍️ ShopEasy
### Full Stack E-Commerce Platform

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A modern, full-featured e-commerce application built from scratch with React and FastAPI. Includes user authentication, product catalog, shopping cart, order management, and a complete admin panel.

[Report Bug](https://github.com/victordeseifecastro/shopeasy/issues) · [Request Feature](https://github.com/victordeseifecastro/shopeasy/issues)

</div>

---

## 📸 Screenshots

### 🔐 Authentication
![Auth](https://github.com/user-attachments/assets/7787ec8b-4254-4ffd-bec0-a5b20d918beb)

### 🏠 Product Catalog
![Home](https://github.com/user-attachments/assets/52b6fc1d-5117-4e39-818c-6b4d728c31fe)

### 🔍 Product Detail
![Detail](https://github.com/user-attachments/assets/7607de2b-d902-4048-b631-9b334031c214)

### 🛒 Cart
![Cart](https://github.com/user-attachments/assets/bb270111-2a9f-400d-b98c-d53f5732cf12)

### 📦 My Orders
![Orders](https://github.com/user-attachments/assets/6a549ab0-139c-4a40-9201-bd0d17f37bc6)

### ✅ Order Success
![Success](https://github.com/user-attachments/assets/583fe53f-2aa2-4ace-a8dd-a1f0fee05c13)

### ⚙️ Admin — Products
![Admin Products](https://github.com/user-attachments/assets/49424ff6-443d-431a-b112-12450d76a955)

### 📋 Admin — Orders
![Admin Orders](https://github.com/user-attachments/assets/6ddeb635-f378-459b-a7a3-1fb4c8c50366)

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
```
```bash
python -m venv venv
venv\Scripts\activate
```
```bash
pip install fastapi uvicorn sqlalchemy python-jose[cryptography] passlib[bcrypt] python-multipart python-dotenv pydantic-settings email-validator bcrypt==4.0.1 passlib==1.7.4
```

Create a `.env` file inside `/backend`:
```env
DATABASE_URL=sqlite:///./shopeasy.db
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
```bash
python seed.py
uvicorn app.main:app --reload
```

Backend running at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend
npm install
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
│   │   │   ├── config.py
│   │   │   ├── dependencies.py
│   │   │   └── security.py
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
│       │   ├── AuthPage.jsx
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