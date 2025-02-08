import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import HomeRoutes from "./routes/index.js";
import FileRoutes from './routes/file.routes.js';
import { connectDb } from "./config/db.js";
// import helmet from 'helmet';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors({ origin: process.env.CLIENT_URL })); // Restrict CORS to a specific domain
app.use('/uploads', express.static('uploads'));


connectDb().then(() => {
    app.use("/api/files", FileRoutes);
    app.use("/api", HomeRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1); 
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});
