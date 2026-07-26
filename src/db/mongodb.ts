import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongoDB(): Promise<boolean> {
  if (isConnected) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI not found in environment. Operating with in-memory database store.');
    return false;
  }

  try {
    const db = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ Connected successfully to MongoDB!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.warn('⚠️ Falling back to in-memory database store.');
    return false;
  }
}

export function isMongoConnected(): boolean {
  return isConnected;
}
