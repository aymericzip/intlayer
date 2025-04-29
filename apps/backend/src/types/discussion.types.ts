import { Document, Model, Types } from 'mongoose';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Discussion extends Document {
  discutionId: string;
  messages: Message[];
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  organizationId: Types.ObjectId;
  title?: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiscussionModelType extends Model<Discussion> {
  // Add any static methods here if needed
}
