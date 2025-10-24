const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  const order = new Order({
    userId: "68f9e314d505a4f25be86195",
    items: [
      {
        productId: "682592e3540cff409b8f9399",
        quantity: 15,
        name: "Wireless Headphones",
        priceAtPurchase: 25.99,
        image: "https://example.com/images/headphones.jpg",
      },
    ],
    totalAmount: 100.25,
  });
  const result = await order.save();
  console.log("Result :", result);
};
