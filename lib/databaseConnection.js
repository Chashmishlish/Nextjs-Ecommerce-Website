import mongoose from "mongoose";

// .env file se MongoDB URI load ho raha hai
const MONGODB_URL = process.env.MONGODB_URI

// Cached connection global variable me store karte hain
let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {
        conn: null,       // Active connection
        promise: null,    // Pending connection promise
    };
}

// for establishing DB connection
// Agar promise nahi bani to naya connection start karo

export const connectDB = async() => {
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: `NEXTJS-ECOMMERCE-WEBSITE`,
            bufferCommands: false
        })
    }

// Await promise and assign to cached connection
    cached.conn = await cached.promise
// Return active connection
    return cached.conn
}