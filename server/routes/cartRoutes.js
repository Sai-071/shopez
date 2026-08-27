const express = require("express");

const router = express.Router();

const {
    addToCart,
    getMyCart,
    updateCartQuantity,
    removeFromCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authmiddleware");

// ==========================
// Cart Routes
// ==========================

// Add Product To Cart
router.post("/", protect, addToCart);

// Get Logged-in User Cart
router.get("/", protect, getMyCart);

// Update Cart Quantity
router.put("/:id", protect, updateCartQuantity);

// Remove Product From Cart
router.delete("/:id", protect, removeFromCart);

module.exports = router;