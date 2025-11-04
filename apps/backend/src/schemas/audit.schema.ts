import { Schema } from 'mongoose';
import type { AuditSchema } from '@/types/audit.types';

export const auditSchema = new Schema<AuditSchema>(
  {
    url: {
      type: String,
      required: true,
    },
    summary: {
      type: Schema.Types.Mixed,
      required: true,
    },
    errors: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
    score: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id,
        };
      },
    },
  }
);
