import { logger } from '@logger';
import { DictionaryModel } from '@models/dictionary.model';
import { OAuth2AccessTokenModel } from '@models/oAuth2.model';
import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { TagModel } from '@models/tag.model';
import { UserModel } from '@models/user.model';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const client = await mongoose.connect(
      `mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`
    );

    logger.info('MongoDB connected');

    // Recreate indexes for models
    await ProjectModel.syncIndexes();
    await UserModel.createIndexes();
    await OAuth2AccessTokenModel.createIndexes();
    await TagModel.createIndexes();
    await DictionaryModel.createIndexes();
    await OrganizationModel.createIndexes();

    // Return the underlying MongoDB client for better-auth
    return client.connection.getClient();
  } catch (error) {
    const errorMessage = `MongoDB connection error - ${(error as Error).message}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};
