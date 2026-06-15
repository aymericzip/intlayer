import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model, Schema } from 'mongoose';
import type { Asset, AssetSchema } from '@/types/asset.types';

export const assetSchema = new Schema<AssetSchema>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    mimeType: {
      type: String,
      required: true,
      maxlength: 100,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    s3Key: {
      type: String,
      required: true,
    },
    publicUrl: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: (_doc._id as { toString(): string }).toString() };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _doc._id };
      },
    },
  }
);

export const AssetModel = model<RenameId<Asset>, Model<Asset>>(
  'asset',
  assetSchema
);
