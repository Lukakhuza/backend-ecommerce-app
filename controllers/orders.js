const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  const { userId, items, total, shippingAddress } = req.body;

  const order = new Order({
    userId: userId,
    items: items,
    totalAmount: total,
    shippingAddress: shippingAddress,
  });
  const result = await order.save();
  res.json(result);
};
