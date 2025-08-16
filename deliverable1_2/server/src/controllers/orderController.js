import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const order = new Order({
    user: req.session.user._id,
    products: req.session.cart,
    total: 100
  });
  await order.save();
  req.session.cart = [];
  res.json({ message: "Order placed", order });
};
