import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/db.js";
import cors from "cors";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

//Register all routes
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status,
        message
    });
})

app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
    //Database connection
    connectDB();
})