
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing.");
  }

  await mongoose.connect(mongoUri);

  isConnected = mongoose.connection.readyState === 1;

  console.log("MongoDB connected successfully!");
}
