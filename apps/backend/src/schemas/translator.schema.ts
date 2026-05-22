import { model, Schema } from 'mongoose';
import type {
  TranslationMissionModelType,
  TranslationMissionSchema,
  TranslatorMessageModelType,
  TranslatorMessageSchema,
  TranslatorProfileModelType,
  TranslatorProfileSchema,
  TranslatorReviewModelType,
  TranslatorReviewSchema,
} from '@/types/translator.types';

const toJSONTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id.toString() };
};

const toObjectTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id };
};

const schemaOptions = {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false, transform: toJSONTransform },
  toObject: { virtuals: true, transform: toObjectTransform },
};

// ── Translator Profile ──────────────────────────────────────────────────────

const languagePairSchema = new Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { _id: false }
);

export const translatorProfileSchema = new Schema<TranslatorProfileSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    bio: { type: String },
    mainPicture: { type: String },
    coverPicture: { type: String },
    languagePairs: { type: [languagePairSchema], default: [] },
    pricePerHour: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'active', 'suspended'],
      default: 'pending',
    },
    totalMissions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    stripeAccountId: { type: String },
  },
  schemaOptions
);

export const TranslatorProfileModel = model<
  TranslatorProfileSchema,
  TranslatorProfileModelType
>('translatorProfile', translatorProfileSchema);

// ── Translation Mission ─────────────────────────────────────────────────────

export const translationMissionSchema = new Schema<TranslationMissionSchema>(
  {
    translatorId: {
      type: Schema.Types.ObjectId,
      ref: 'translatorProfile',
      required: true,
    },
    clientUserId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'project' },
    dictionaryIds: {
      type: [Schema.Types.ObjectId],
      ref: 'dictionary',
      default: [],
    },
    sourceLocale: { type: String, required: true },
    targetLocales: { type: [String], required: true },
    wordCount: { type: Number, default: 0 },
    estimatedHours: { type: Number, default: 0 },
    pricePerHour: { type: Number, required: true },
    totalPrice: { type: Number, default: 0 },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: [
        'pending',
        'accepted',
        'in_progress',
        'translator_review',
        'client_review',
        'completed',
        'canceled',
      ],
      default: 'pending',
    },
    notes: { type: String },
    aiPreGeneratedAt: { type: Date },
    completedAt: { type: Date },
    canceledAt: { type: Date },
  },
  schemaOptions
);

export const TranslationMissionModel = model<
  TranslationMissionSchema,
  TranslationMissionModelType
>('translationMission', translationMissionSchema);

// ── Translator Review ───────────────────────────────────────────────────────

export const translatorReviewSchema = new Schema<TranslatorReviewSchema>(
  {
    missionId: {
      type: Schema.Types.ObjectId,
      ref: 'translationMission',
      required: true,
      unique: true,
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    translatorId: {
      type: Schema.Types.ObjectId,
      ref: 'translatorProfile',
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  schemaOptions
);

export const TranslatorReviewModel = model<
  TranslatorReviewSchema,
  TranslatorReviewModelType
>('translatorReview', translatorReviewSchema);

// ── Translator Message ──────────────────────────────────────────────────────

export const translatorMessageSchema = new Schema<TranslatorMessageSchema>(
  {
    missionId: {
      type: Schema.Types.ObjectId,
      ref: 'translationMission',
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    content: { type: String, required: true },
    readAt: { type: Date },
  },
  schemaOptions
);

export const TranslatorMessageModel = model<
  TranslatorMessageSchema,
  TranslatorMessageModelType
>('translatorMessage', translatorMessageSchema);
