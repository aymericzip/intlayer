import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model, Schema } from 'mongoose';
import type {
  AnalyticsRollup,
  AnalyticsRollupSchema,
  AnalyticsVisitor,
  AnalyticsVisitorSchema,
} from '@/types/analytics.types';

/** Retention for anonymous visitor markers — 400 days. */
const VISITOR_TTL_SECONDS = 400 * 24 * 60 * 60;

/**
 * Pre-aggregated daily analytics counters. Ingestion increments these in bulk;
 * the dashboard reads straight from them. No per-user rows are stored.
 */
export const analyticsRollupSchema = new Schema<AnalyticsRollupSchema>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
      index: true,
    },
    day: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ['page_view', 'content_exposure', 'conversion'],
      required: true,
    },
    // Unique per (project, day, dimensions) so upserts coalesce counters.
    dedupKey: { type: String, required: true },
    locale: { type: String },
    url: { type: String },
    dictionaryKey: { type: String, index: true },
    keyPath: { type: String },
    nodeType: { type: String },
    variant: { type: String },
    experimentKey: { type: String, index: true },
    goal: { type: String },
    count: { type: Number, default: 0 },
    valueSum: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: (_id as { toString(): string }).toString() };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
    },
  }
);

// One counter document per project + day + dimension tuple.
analyticsRollupSchema.index({ projectId: 1, dedupKey: 1 }, { unique: true });
// Fast dashboard reads.
analyticsRollupSchema.index({ projectId: 1, type: 1, day: 1 });

export const AnalyticsRollupModel = model<RenameId<AnalyticsRollup>>(
  'analyticsRollup',
  analyticsRollupSchema
) as unknown as Model<AnalyticsRollup>;

/**
 * Anonymous daily visitor markers — one per project + day + hashed session.
 * Counting documents yields distinct visitors without storing personal data.
 */
export const analyticsVisitorSchema = new Schema<AnalyticsVisitorSchema>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
      index: true,
    },
    day: { type: String, required: true, index: true },
    sessionHash: { type: String, required: true },
    country: { type: String, default: 'ZZ' },
    locale: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: (_id as { toString(): string }).toString() };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
    },
  }
);

// One marker per project + day + session.
analyticsVisitorSchema.index(
  { projectId: 1, day: 1, sessionHash: 1 },
  { unique: true }
);
// TTL cleanup of old markers.
analyticsVisitorSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: VISITOR_TTL_SECONDS }
);

export const AnalyticsVisitorModel = model<RenameId<AnalyticsVisitor>>(
  'analyticsVisitor',
  analyticsVisitorSchema
) as unknown as Model<AnalyticsVisitor>;
