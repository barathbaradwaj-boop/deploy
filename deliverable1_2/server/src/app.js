import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Session
import sessionConfig from './config/session.js';
app.use(session(sessionConfig));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

export default app;
