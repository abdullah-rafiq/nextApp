import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/login-app";

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URI);
}