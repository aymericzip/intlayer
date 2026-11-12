import { AI_CREDIT_FEATURES } from '@utils/aiCredits';
import { model, Schema } from 'mongoose';
import type {
  AICreditUsageModelType,
  AICreditUsageSchema,
} from '@/types/aiCreditUsage.types';

/** Usage records are kept a little over a year, then expire. */
const AI_CREDIT_USAGE_RETENTION_SECONDS = 400 * 24 * 60 * 60;

export const aiCreditUsageSchema = new Schema<AICreditUsageSchema>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    feature: { type: String, enum: AI_CREDIT_FEATURES, required: true },
    tokens: { type: Number, required: true, min: 0 },
    provider: { type: String },
    model: { type: String },
    isBilled: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

aiCreditUsageSchema.index({ organizationId: 1, createdAt: -1 });
aiCreditUsageSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: AI_CREDIT_USAGE_RETENTION_SECONDS }
);

export const AICreditUsageModel = model<
  AICreditUsageSchema,
  AICreditUsageModelType
>('ai_credit_usage', aiCreditUsageSchema);
