const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

// Create a product
router.get("/create-product", productsController.createProduct);

// Get all products
router.get("/get-products", productsController.getProducts);

// Get a single product
router.get("/get-product", productsController.getProduct);

// Update a product
router.get("/update-product/:productId", productsController.updateProduct);

// Delete a product
router.get("/delete-product/:productId", productsController.deleteProduct);

// Add product to cart
router.post("/add-to-cart", productsController.postCart);

router.post("/delete-from-cart", productsController.deleteFromCart);

// Add product to favorites
router.post("/add-to-favorites", productsController.addToFavorites);

// Remove product from favorites
// router.post("/remove-from-favorites", productsController.removeFromFavorites);

// router.post("/payment-sheet", productsController.paymentSheetFunction);

module.exports = router;
