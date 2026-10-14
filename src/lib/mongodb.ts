import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/minimalist-storefront';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  isAvailable: boolean;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null, isAvailable: false };
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500, // Quick timeout to avoid hanging if Mongo isn't running locally
      connectTimeoutMS: 2000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((m) => {
        cached.isAvailable = true;
        return m;
      })
      .catch((err) => {
        console.warn('MongoDB connection failed (using in-memory fallback):', err.message);
        cached.promise = null;
        cached.isAvailable = false;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.conn = null;
  }

  return cached.conn;
}

export function isDbConnected(): boolean {
  return cached?.isAvailable && mongoose.connection.readyState === 1;
}
