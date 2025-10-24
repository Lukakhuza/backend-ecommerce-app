const express = require("express");

const ordersController = require("../controllers/orders");

const router = express.Router();

// Create Order
router.put("/create-order", ordersController.createOrder);

// Fetch orders
router.get("/fetch-orders/:userId", ordersController.fetchOrders);

module.exports = router;
