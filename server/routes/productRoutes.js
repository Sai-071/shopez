const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
     deleteProduct,

} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// ==========================
// Public Routes
// ==========================

// Get All Products
router.get("/", getProducts);

// Get Single Product by ID
router.get("/:id", getProductById);

// ==========================
// Admin Routes
// ==========================

// Add Product
router.post("/", protect, admin, addProduct);

// Update Product
router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);
module.exports = router;