const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = await Order.create({
    products,
    totalAmount
  });

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find().populate("products.productId");
  res.json(orders);
};
