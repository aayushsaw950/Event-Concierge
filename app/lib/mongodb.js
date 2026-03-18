import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.Mongodb_Uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}