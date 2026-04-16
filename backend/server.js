import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";

config();
connectDB();

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));