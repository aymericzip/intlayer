import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Dictionary } from './dictionary.types';
import type { Project } from './project.types';
import type { User } from './user.types';

export type ReviewerStatus = 'pending' | 'active' | 'suspended';

/**
 * Single source of truth for the reviewer specialities available on the
 * marketplace. Consumed by the Mongoose schema and by the frontend
 * (via `@intlayer/backend`) so both stay in sync.
 */
export const REVIEWER_CATEGORIES = [
  'copywriter',
  'translator',
  'proofreader',
  'technical_writer',
  'marketing',
  'seo',
  'content_reviewer',
] as const;

export type ReviewerCategory = (typeof REVIEWER_CATEGORIES)[number];

export type MissionStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'reviewer_review'
  | 'client_review'
  | 'completed'
  | 'canceled';

export type LanguagePair = {
  from: string;
  to: string;
};

// ── Reviewer Profile ──────────────────────────────────────────────────────

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  portfolio?: string;
};

export type ReviewerProfileData = {
  userId: User['id'];
  /** Public display name — resolved from the linked user at read time, never stored */
  name?: string;
  /** Public avatar URL — resolved from the linked user at read time, never stored */
  avatar?: string;
  bio?: string;
  mainPicture?: string;
  coverPicture?: string;
  languagePairs: LanguagePair[];
  categories: ReviewerCategory[];
  pricePerHour: number; // in cents (e.g. 5000 = $50/hr)
  status: ReviewerStatus;
  totalMissions: number;
  averageRating: number; // 0–5
  reviewCount: number;
  stripeAccountId?: string;
  socialLinks?: SocialLinks;
  isHidden?: boolean;
};

export type ReviewerProfile = ReviewerProfileData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewerProfileAPI = ObjectIdToString<ReviewerProfile>;
export type ReviewerProfileSchema = RenameId<ReviewerProfile>;
export type ReviewerProfileModelType = Model<ReviewerProfile>;
export type ReviewerProfileDocument = Document<unknown, {}, ReviewerProfile> &
  ReviewerProfile;

// ── Translation Mission ─────────────────────────────────────────────────────

export type TranslationMissionData = {
  reviewerId: ReviewerProfile['id'];
  clientUserId: User['id'];
  projectId?: Project['id'];
  dictionaryIds: Dictionary['id'][];
  /** Optional — non-translation missions (e.g. SEO review) have no locales */
  sourceLocale?: string;
  targetLocales: string[];
  wordCount: number;
  estimatedHours: number;
  pricePerHour: number; // snapshot from reviewer at booking time
  totalPrice: number; // in cents
  currency: string;
  status: MissionStatus;
  notes?: string;
  aiPreGeneratedAt?: Date;
  completedAt?: Date;
  canceledAt?: Date;
};

export type TranslationMission = TranslationMissionData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TranslationMissionAPI = ObjectIdToString<TranslationMission>;
export type TranslationMissionSchema = RenameId<TranslationMission>;
export type TranslationMissionModelType = Model<TranslationMission>;
export type TranslationMissionDocument = Document<
  unknown,
  {},
  TranslationMission
> &
  TranslationMission;

// ── Reviewer Review ───────────────────────────────────────────────────────

export type ReviewerReviewData = {
  missionId: TranslationMission['id'];
  reviewerId: ReviewerProfile['id'];
  rating: number; // 1–5
  comment?: string;
};

export type ReviewerReview = ReviewerReviewData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewerReviewAPI = ObjectIdToString<ReviewerReview>;
export type ReviewerReviewSchema = RenameId<ReviewerReview>;
export type ReviewerReviewModelType = Model<ReviewerReview>;
export type ReviewerReviewDocument = Document<unknown, {}, ReviewerReview> &
  ReviewerReview;

// ── Reviewer Message ──────────────────────────────────────────────────────

export type ReviewerMessageData = {
  missionId: TranslationMission['id'];
  senderId: User['id'];
  content: string;
  readAt?: Date;
};

export type ReviewerMessage = ReviewerMessageData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewerMessageAPI = ObjectIdToString<ReviewerMessage>;
export type ReviewerMessageSchema = RenameId<ReviewerMessage>;
export type ReviewerMessageModelType = Model<ReviewerMessage>;
export type ReviewerMessageDocument = Document<unknown, {}, ReviewerMessage> &
  ReviewerMessage;

// ── Contact ─────────────────────────────────────────────────────────────────

export type ContactReviewerBody = { message: string };

// ── Estimate ────────────────────────────────────────────────────────────────

export type MissionEstimate = {
  wordCount: number;
  estimatedHours: number;
  totalPrice: number; // in cents
  currency: string;
};
