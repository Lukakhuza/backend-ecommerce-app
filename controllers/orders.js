const Order = require("../models/order");
const mongoose = require("mongoose");

exports.createOrder = async (req, res, next) => {
  try {
    const { userId, items, total, shippingAddress, paymentMethod } = req.body;
    const order = new Order({
      userId: userId,
      items: items,
      totalAmount: total,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    const result = await order.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.fetchOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
