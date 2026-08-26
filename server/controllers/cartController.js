const Cart = require("../models/cart");
const Product = require("../models/Product");

// ==========================
// Add Product To Cart
// ==========================
const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        // Check if product already exists in cart
        let cartItem = await Cart.findOne({
            user: req.user.id,
            product: productId
        });

        if (cartItem) {

            cartItem.quantity += quantity;

            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart Updated Successfully",
                cartItem
            });

        }

        // Create new cart item
        cartItem = await Cart.create({
            user: req.user.id,
            product: productId,
            quantity
        });

        res.status(201).json({
            success: true,
            message: "Product Added To Cart",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Get My Cart
// ==========================
const getMyCart = async (req, res) => {
    try {

        const cart = await Cart.find({ user: req.user.id })
            .populate("product");

        res.status(200).json({
            success: true,
            count: cart.length,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Update Cart Quantity
// ==========================
const updateCartQuantity = async (req, res) => {
    try {

        const { quantity } = req.body;

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found"
            });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ==========================
// Remove Item From Cart
// ==========================
const removeFromCart = async (req, res) => {
    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not Found"
            });
        }

        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item Removed From Cart"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    addToCart,
    getMyCart,
    updateCartQuantity,
    removeFromCart
};