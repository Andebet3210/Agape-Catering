import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express();
const port = 4000;

// ✅ CORS Options — define before use
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};

// ✅ Apply CORS
app.use(cors(corsOptions));
app.use(express.json()); // For parsing application/json

// ✅ Serve Static Files (Images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/api/cart',cartRouter);
app.user('/api/order',orderRouter);

// ✅ Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
