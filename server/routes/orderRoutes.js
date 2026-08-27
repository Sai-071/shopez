const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authmiddleware");
const { admin } = require("../middleware/adminmiddleware");

// ==========================
// User Routes
// ==========================

// Place Order
router.post("/", protect, placeOrder);

// Get My Orders
router.get("/", protect, getMyOrders);

// ==========================
// Admin Routes
// ==========================

// Get All Orders
router.get("/all", protect, admin, getAllOrders);

// Update Order Status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;