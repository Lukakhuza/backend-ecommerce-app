const express = require("express");

const ordersController = require("../controllers/orders");

const router = express.Router();

// Create Order
router.put("/create-order", ordersController.createOrder);

module.exports.router;
