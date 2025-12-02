const express = require("express");

const checkoutController = require("../controllers/checkout");

const router = express.Router();

router.put("/add-payment-method", checkoutController.addPaymentMethod);

router.get(
  "/payment-methods/:stripeCustomerId",
  checkoutController.getPaymentMethods
);

module.exports = router;
