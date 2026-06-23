import mongoose from "mongoose";

let cached = global.mongooseConn;

if (!cached) {
  cached = global.mongooseConn = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  const mongourl = process.env.MONGODB_URI;

  if (!mongourl) {
    throw new Error("Please provide MONGODB_URI in the environment variables");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongourl)
      .then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅MongoDB Connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(" MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;
