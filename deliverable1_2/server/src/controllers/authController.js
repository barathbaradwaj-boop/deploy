import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.json({ message: "User registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  req.session.user = user;
  res.json({ message: "Logged in" });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
};
