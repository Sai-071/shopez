const express = require("express");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");
const { admin } = require("./middleware/adminMiddleware");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to ShopEZ Backend");
});

// ✅ Protected Profile Route
app.get("/api/profile", protect, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your profile",
        user: req.user
    });
});

app.get("/api/admin", protect, admin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin!"
    });
});

const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});