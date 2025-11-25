const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: String,
  tokenExpiration: Date,
  phoneNumber: {
    type: String,
    required: false,
  },
  address: {
    type: Object,
    required: false,
  },
  shopFor: {
    type: String,
    required: false,
  },
  favorites: {
    items: [{ type: Number, required: false }],
  },
  cart: {
    items: [
      {
        product: { type: Object, required: false },
        quantity: { type: Number, required: true },
      },
    ],
  },
  stripeCustomerId: {
    type: String,
    required: false,
  },
  stripePaymentMethod: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
