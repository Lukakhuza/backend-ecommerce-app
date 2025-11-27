const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      _id: {
        type: String,
        required: true,
      },
      product: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentIntentId: {
    type: String, // from Stripe
  },

  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "completed", "cancelled"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  shippingAddress: {
    type: Object,
    required: true,
  },

  paymentMethod: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
