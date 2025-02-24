// ES Module
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import cors from 'cors';

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET","PUT","POST","DELETE", "OPTIONS"],
    credentials:true,
}))

const port = 3000;

connectDB();


app.use("/api", apiRouter);

// Test Cookie Route
app.get('/check-cookie', (req, res) => {
  console.log('Cookies Received:', req.cookies);  // Should log { token: "your-token-value" }
  res.json(req.cookies);  // Send cookies as JSON response
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});