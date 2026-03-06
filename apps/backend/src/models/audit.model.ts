import mongoose, { type Document, Schema } from 'mongoose';

export interface IAudit extends Document {
  domain: string;
  score: number;
  createdAt: Date;
}

const auditSchema = new Schema<IAudit>(
  {
    domain: {
      type: String,
      required: true,
      index: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const AuditModel = mongoose.model<IAudit>('Audit', auditSchema);
