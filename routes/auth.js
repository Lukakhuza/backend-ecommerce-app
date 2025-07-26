const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login-with-session", authController.postLogin);

// router.get("/fetch-publishable-key", authController.fetchPublishableKey);

// router.get("/create-payment-intent", authController.createPaymentIntent);

module.exports = router;
