const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authrorizeRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController");

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authrorizeRoles('admin'), allOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authrorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authrorizeRoles('admin'), deleteOrder);

module.exports = router;