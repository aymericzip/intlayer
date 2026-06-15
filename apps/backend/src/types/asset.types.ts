import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';

export interface Asset extends Document {
  id: Types.ObjectId;
  /** Project this asset belongs to. */
  projectId: Types.ObjectId;
  /** Original file name as provided by the uploader. */
  originalName: string;
  /** MIME type (e.g. "image/jpeg"). */
  mimeType: string;
  /** File size in bytes. */
  size: number;
  /** S3 object key (used for deletion). */
  s3Key: string;
  /** Publicly accessible CDN URL. */
  publicUrl: string;
  /** Optional alt text for accessibility. */
  alt?: string;
  /** Optional caption displayed below the image. */
  caption?: string;
  /** User who uploaded the asset. */
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type AssetAPI = ObjectIdToString<Asset>;

export type AssetSchema = RenameId<Asset>;
export type AssetModelType = Model<Asset>;
export type AssetDocument = Document<unknown, {}, Asset> & Asset;
