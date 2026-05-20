import { logger } from '@logger';
import { AccountModel } from '@schemas/account.schema';
import { AuditModel } from '@schemas/audit.schema';
import { AuditJobModel } from '@schemas/auditJob.schema';
import { AuditPageModel } from '@schemas/auditPage.schema';
import { DictionaryModel } from '@schemas/dictionary.schema';
import { DiscussionModel } from '@schemas/discussion.schema';
import { OAuth2AccessTokenModel } from '@schemas/oAuth2.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { ShowcaseProjectModel } from '@schemas/showcaseProject.schema';
import { TagModel } from '@schemas/tag.schema';
import { UserModel } from '@schemas/user.schema';
import { connect, type mongo } from 'mongoose';

// Store the DB client singleton
let dbClientInstance: mongo.MongoClient | null = null;

export const connectDB = async (): Promise<mongo.MongoClient> => {
  try {
    const client = await connect(
      `mongodb+srv://${process.env.DB_ID}:${process.env.DB_MDP}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`
    );

    logger.info('MongoDB connected');

    // 2. Drop the old indexes directly
    const db = client.connection.db;
    if (db) {
      const collections = await db.collections();
      for (const col of collections) {
        await col.dropIndex('createdAt_1').catch(() => {});
      }
    }

    // Recreate indexes for models
    await ProjectModel.syncIndexes();
    await DiscussionModel.syncIndexes();
    await UserModel.createIndexes();
    await OAuth2AccessTokenModel.createIndexes();
    await TagModel.createIndexes();
    await DictionaryModel.createIndexes();
    await OrganizationModel.createIndexes();
    await AccountModel.createIndexes();
    await ShowcaseProjectModel.syncIndexes();
    await AuditModel.syncIndexes();
    await AuditJobModel.syncIndexes();
    await AuditPageModel.syncIndexes();

    dbClientInstance = client.connection.getClient();

    return dbClientInstance;
  } catch (error) {
    const errorMessage = `MongoDB connection error - ${(error as Error).message}`;

    logger.error(errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Get the MongoDB client instance.
 * Must be called after connectDB() has been executed.
 */
export const getDBClient = (): mongo.MongoClient => {
  if (!dbClientInstance) {
    throw new Error('Database not connected. Call connectDB() first.');
  }
  return dbClientInstance;
};
