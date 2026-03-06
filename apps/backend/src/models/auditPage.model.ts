import mongoose, { type Document, Schema } from 'mongoose';

export enum AuditPageStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IAuditPage extends Document {
  jobId: mongoose.Types.ObjectId;
  url: string;
  status: AuditPageStatus;
  score?: number;
  results?: any;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const auditPageSchema = new Schema<IAuditPage>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'AuditJob',
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AuditPageStatus),
      default: AuditPageStatus.PENDING,
    },
    score: {
      type: Number,
    },
    results: {
      type: Schema.Types.Mixed,
    },
    error: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

auditPageSchema.index({ jobId: 1, url: 1 }, { unique: true });

export const AuditPageModel = mongoose.model<IAuditPage>(
  'AuditPage',
  auditPageSchema
);
