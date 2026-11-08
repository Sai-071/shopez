# 🛒 ShopEZ – E-commerce Web Application

ShopEZ is a full-stack e-commerce web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

The application allows users to register, log in, browse products, manage their shopping cart, and place orders. It also provides admin functionality for managing products.

## 🚀 Features

### User Features
- User Registration and Login
- Secure Authentication
- Browse Products
- View Product Details
- Add Products to Cart
- Manage Shopping Cart
- Place Orders
- View User Profile
- View Order History

### Admin Features
- Admin Authentication
- Manage Products
- Add and Update Products
- Manage Orders

## 💻 Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend Development |
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | Database Management |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| CSS | Styling |
| Vite | Frontend Build Tool |

## 📁 Project Structure

```text
ShopEZ/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd ShopEZ
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the server folder using `.env.example` as a reference.

Add the required MongoDB connection string, JWT secret, and other configuration values.

### 5. Start the Backend

```bash
npm run dev
```

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔮 Future Improvements

- Integration of an Online Payment Gateway.
- Additional E-commerce Features.
- Improved User Experience.
- Enhanced Admin Dashboard.

## 👨‍💻 Developer

Developed as part of a NASSCOM MERN Stack Internship project.

**Project Name:** ShopEZ – E-commerce Application

---

⭐ If you find this project interesting, consider giving the repository a star!
