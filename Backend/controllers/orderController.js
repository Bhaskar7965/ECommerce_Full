const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

//* Create a new order => /api/v1/order/new
exports.newOrder = async (req, res, next) => {

    try {
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        })

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//! Get single order => /api/v1/order/:id (careful with this route name is attached with another)

exports.getSingleOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        const user = await User.findById(order.user)
        const name = user.name;
        const email = user.email;

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            order,
            user: {
                name,
                email,
                id: user._id
            }
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
};


//* Get logged in user orders => /api/v1/orders/me

exports.myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//! Get all orders => /api/v1/admin/orders

exports.allOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice
        })
        res.status(200).json({
            success: true,
            totalAmount,
            orders
        })
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}

//! Update / Process order => /api/v1/admin/order/:id
exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You have already delivered this order",
            });
        }

        // Reduce the stock only when the order status is changed to "Shipped"
        if (order.orderStatus !== "Shipped" && req.body.status === "Shipped") {
            order.orderItems.forEach(async (item) => {
                await updateStock(item.product, item.quantity);
            });
        }

        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order,
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message,
        });
    }

    async function updateStock(id, quantity) {
        const product = await Product.findById(id);
        product.stock = product.stock - quantity;

        await product.save({ validateBeforeSave: false });
    }
};


//! Delete order => /api/v1/admin/order/:id
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        })

    } catch (error) {
        // Handle any potential errors
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
}