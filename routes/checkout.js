const express = require("express");

const checkoutController = require("../controllers/checkout");

const router = express.Router();

router.put("/add-payment-method", checkoutController.addPaymentMethod);

module.exports = router;
