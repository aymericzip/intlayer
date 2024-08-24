import { logger } from '@logger/index';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const client = await mongoose.connect(
      `mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`
    );

    logger.info('MongoDB connected');

    return client;
  } catch (error) {
    const errorMessage = `MongoDB connection error - ${(error as Error).message}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};
