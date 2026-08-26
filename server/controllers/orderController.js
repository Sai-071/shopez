const Order = require("../models/order");
const Cart = require("../models/cart");

// ==========================
// Place Order
// ==========================
const placeOrder = async (req, res) => {
    try {

        const { shippingAddress, paymentMethod } = req.body;

        // Get all cart items of logged-in user
        const cartItems = await Cart.find({ user: req.user.id }).populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty"
            });
        }

        let totalAmount = 0;

        const products = cartItems.map((item) => {
            totalAmount += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
            };
        });

        const order = await Order.create({
            user: req.user.id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
        });

        // Clear cart after placing order
        await Cart.deleteMany({ user: req.user.id });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================
// Get My Orders
// ==========================
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user.id })
            .populate("products.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================
// Get All Orders (Admin)
// ==========================
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================
// Update Order Status (Admin)
// ==========================
const updateOrderStatus = async (req, res) => {
    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found",
            });
        }

        order.orderStatus = orderStatus;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Status Updated Successfully",
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};