import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => { console.log('Connected to MongoDB') })
.catch((err) => { console.log(err) });

const app = express();

app.use(express.json());

app.listen(1024, () => {
  console.log('Server is running on port 1024');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);