import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Dictionary } from './dictionary.types';
import type { Project } from './project.types';
import type { User } from './user.types';

export type TranslatorStatus = 'pending' | 'active' | 'suspended';
export type MissionStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'translator_review'
  | 'client_review'
  | 'completed'
  | 'canceled';

export type LanguagePair = {
  from: string;
  to: string;
};

// ── Translator Profile ──────────────────────────────────────────────────────

export type TranslatorProfileData = {
  userId: User['id'];
  bio?: string;
  mainPicture?: string;
  coverPicture?: string;
  languagePairs: LanguagePair[];
  pricePerHour: number; // in cents (e.g. 5000 = $50/hr)
  status: TranslatorStatus;
  totalMissions: number;
  averageRating: number; // 0–5
  reviewCount: number;
  stripeAccountId?: string;
};

export type TranslatorProfile = TranslatorProfileData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TranslatorProfileAPI = ObjectIdToString<TranslatorProfile>;
export type TranslatorProfileSchema = RenameId<TranslatorProfile>;
export type TranslatorProfileModelType = Model<TranslatorProfile>;
export type TranslatorProfileDocument = Document<
  unknown,
  {},
  TranslatorProfile
> &
  TranslatorProfile;

// ── Translation Mission ─────────────────────────────────────────────────────

export type TranslationMissionData = {
  translatorId: TranslatorProfile['id'];
  clientUserId: User['id'];
  projectId?: Project['id'];
  dictionaryIds: Dictionary['id'][];
  sourceLocale: string;
  targetLocales: string[];
  wordCount: number;
  estimatedHours: number;
  pricePerHour: number; // snapshot from translator at booking time
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

// ── Translator Review ───────────────────────────────────────────────────────

export type TranslatorReviewData = {
  missionId: TranslationMission['id'];
  reviewerId: User['id'];
  translatorId: TranslatorProfile['id'];
  rating: number; // 1–5
  comment?: string;
};

export type TranslatorReview = TranslatorReviewData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TranslatorReviewAPI = ObjectIdToString<TranslatorReview>;
export type TranslatorReviewSchema = RenameId<TranslatorReview>;
export type TranslatorReviewModelType = Model<TranslatorReview>;
export type TranslatorReviewDocument = Document<unknown, {}, TranslatorReview> &
  TranslatorReview;

// ── Translator Message ──────────────────────────────────────────────────────

export type TranslatorMessageData = {
  missionId: TranslationMission['id'];
  senderId: User['id'];
  content: string;
  readAt?: Date;
};

export type TranslatorMessage = TranslatorMessageData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TranslatorMessageAPI = ObjectIdToString<TranslatorMessage>;
export type TranslatorMessageSchema = RenameId<TranslatorMessage>;
export type TranslatorMessageModelType = Model<TranslatorMessage>;
export type TranslatorMessageDocument = Document<
  unknown,
  {},
  TranslatorMessage
> &
  TranslatorMessage;

// ── Estimate ────────────────────────────────────────────────────────────────

export type MissionEstimate = {
  wordCount: number;
  estimatedHours: number;
  totalPrice: number; // in cents
  currency: string;
};
