const Order = require("../models/order");
const mongoose = require("mongoose");

exports.createOrder = async (req, res, next) => {
  const { userId, items, total, shippingAddress, paymentMethod } = req.body;

  const order = new Order({
    userId: userId,
    items: items,
    totalAmount: total,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
  });
  const result = await order.save();
  res.json(result);
};

exports.fetchOrders = async (req, res, next) => {
  const userId = req.params.userId;
  console.log("user Id", userId);
  const orders = await Order.find({
    userId: new mongoose.Types.ObjectId(userId),
  });

  res.status(200).json(orders);
};
