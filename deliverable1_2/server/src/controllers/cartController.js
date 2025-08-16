export const getCart = (req, res) => {
  res.json({ cart: req.session.cart || [] });
};

export const addToCart = (req, res) => {
  const { productId, qty } = req.body;
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push({ productId, qty });
  res.json({ message: "Added to cart", cart: req.session.cart });
};
