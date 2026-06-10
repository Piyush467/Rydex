import mongoose from "mongoose";

const mongourl = process.env.MONGODB_URI;

if (!mongourl) {
    throw new Error("Please provide MONGODB_URI in the environment variables");
}

let cached = global.mongooseConn;

if (!cached) {
    cached = global.mongooseConn = { conn: null, promise: null }
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongourl).then(c => c.connection);
    }

    try {
        const conn = await cached.promise;
        return conn;
    } catch (e) {
        console.log(e);
    }

    return cached.conn;
}

export default connectDB;