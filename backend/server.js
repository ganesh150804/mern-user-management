import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import authRouter from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js'

config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(json());

// Routes
app.use('/api/auth', authRouter);

app.get('/api',authMiddleware,(req, res) => {
    res.send("welcom API dashboard");
})
 

//server listen
app.get("/", (req, res) => {
    res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));