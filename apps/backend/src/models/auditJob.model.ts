import mongoose, { type Document, Schema } from 'mongoose';

export enum AuditJobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IAuditJob extends Document {
  targetUrl: string;
  userId?: string;
  status: AuditJobStatus;
  progress: number;
  totalPageCount: number;
  completedPageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const auditJobSchema = new Schema<IAuditJob>(
  {
    targetUrl: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(AuditJobStatus),
      default: AuditJobStatus.PENDING,
    },
    progress: {
      type: Number,
      default: 0,
    },
    totalPageCount: {
      type: Number,
      default: 0,
    },
    completedPageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const AuditJobModel = mongoose.model<IAuditJob>(
  'AuditJob',
  auditJobSchema
);
