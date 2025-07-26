const express = require("express");

const usersController = require("../controllers/users");

const router = express.Router();

// Create User
router.put("/create-user", usersController.createUser);

// Log In User
router.post("/login", usersController.loginUser);

// Get Users
router.get("/get-users", usersController.getUsers);

// Get a single user
router.get("/get-user/:userId", usersController.getUser);

// Get user by email
router.post("/get-user-by-email", usersController.getUserByEmail);

// Update an user
router.put("/update-user/:userId", usersController.updateUser);

// Delete an user
router.get("/delete-user/:userId", usersController.deleteUser);

module.exports = router;
