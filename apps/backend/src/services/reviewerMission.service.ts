import { DictionaryModel } from '@schemas/dictionary.schema';
import { ProjectModel } from '@schemas/project.schema';
import { TranslationMissionModel } from '@schemas/reviewer.schema';
import type {
  MissionEstimate,
  MissionStatus,
  TranslationMissionData,
  TranslationMissionDocument,
} from '@/types/reviewer.types';

const WORDS_PER_HOUR = 300;

/** Role of the caller relative to a mission */
export type MissionParticipantRole = 'client' | 'reviewer';

/**
 * Allowed mission status transitions per participant role.
 * Any transition not listed here is rejected.
 */
const MISSION_STATUS_TRANSITIONS: Record<
  MissionParticipantRole,
  Partial<Record<MissionStatus, MissionStatus[]>>
> = {
  reviewer: {
    pending: ['accepted', 'canceled'],
    accepted: ['in_progress', 'canceled'],
    in_progress: ['reviewer_review'],
    reviewer_review: ['client_review'],
  },
  client: {
    pending: ['canceled'],
    accepted: ['canceled'],
    client_review: ['completed', 'reviewer_review'],
  },
};

/**
 * Checks whether the given participant is allowed to move a mission from
 * `currentStatus` to `nextStatus`.
 */
export const canUpdateMissionStatus = (
  role: MissionParticipantRole,
  currentStatus: MissionStatus,
  nextStatus: MissionStatus
): boolean =>
  MISSION_STATUS_TRANSITIONS[role][currentStatus]?.includes(nextStatus) ??
  false;

const extractStrings = (obj: any): string[] => {
  if (typeof obj === 'string') return [obj];
  if (Array.isArray(obj)) return obj.flatMap(extractStrings);
  if (obj && typeof obj === 'object')
    return Object.values(obj).flatMap(extractStrings);
  return [];
};

const countWords = (str: string): number =>
  str.trim().split(/\s+/).filter(Boolean).length;

/**
 * Keeps only the dictionary ids that belong to a project the given user is a
 * member, admin or creator of. Prevents estimating or booking missions on
 * another tenant's dictionaries.
 */
export const filterAccessibleDictionaryIds = async (
  dictionaryIds: string[],
  userId: string
): Promise<string[]> => {
  if (!dictionaryIds.length) return [];

  const projects = await ProjectModel.find(
    {
      $or: [
        { membersIds: userId },
        { adminsIds: userId },
        { creatorId: userId },
      ],
    },
    { _id: 1 }
  );
  const projectIds = projects.map((project) => project._id);

  const dictionaries = await DictionaryModel.find(
    { _id: { $in: dictionaryIds }, projectIds: { $in: projectIds } },
    { _id: 1 }
  );

  return dictionaries.map((dictionary) => String(dictionary._id));
};

export const countWordsFromDictionaries = async (
  dictionaryIds: string[],
  sourceLocale?: string
): Promise<number> => {
  if (!dictionaryIds.length) return 0;

  const dictionaries = await DictionaryModel.find({
    _id: { $in: dictionaryIds },
  });

  let total = 0;

  for (const dict of dictionaries) {
    const versionedContent = dict.content as Map<string, any>;
    if (!versionedContent) continue;

    const versions = Array.from(versionedContent.keys());
    if (!versions.length) continue;

    const latestVersion = versions[versions.length - 1];
    const versionEl = versionedContent.get(latestVersion);
    if (!versionEl?.content) continue;

    const localeContent =
      typeof versionEl.content === 'object' && sourceLocale
        ? (versionEl.content[sourceLocale] ?? versionEl.content)
        : versionEl.content;

    const strings = extractStrings(localeContent);
    total += strings.reduce((sum, s) => sum + countWords(s), 0);
  }

  return total;
};

/**
 * Estimates a mission from the word count of the selected dictionaries.
 * Missions without dictionaries (e.g. SEO or content review) yield a zero
 * estimate — the scope is then agreed upon through the mission chat.
 */
export const calculateMissionEstimate = async (
  dictionaryIds: string[],
  sourceLocale: string | undefined,
  pricePerHour: number
): Promise<MissionEstimate> => {
  const wordCount = await countWordsFromDictionaries(
    dictionaryIds,
    sourceLocale
  );
  const estimatedHours = wordCount / WORDS_PER_HOUR;
  const totalPrice = Math.ceil(estimatedHours * pricePerHour);

  return {
    wordCount,
    estimatedHours: Math.round(estimatedHours * 100) / 100,
    totalPrice,
    currency: 'usd',
  };
};

export const createMission = async (
  data: Omit<TranslationMissionData, 'status'>
): Promise<TranslationMissionDocument> =>
  TranslationMissionModel.create(data) as unknown as TranslationMissionDocument;

export const findMissionById = async (
  id: string
): Promise<TranslationMissionDocument | null> =>
  TranslationMissionModel.findById(
    id
  ) as unknown as TranslationMissionDocument | null;

export const findMissionsForUser = async (
  userId: string,
  skip = 0,
  limit = 20
): Promise<TranslationMissionDocument[]> =>
  TranslationMissionModel.find({ clientUserId: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit) as unknown as TranslationMissionDocument[];

export const findMissionsForReviewerProfile = async (
  reviewerProfileId: string,
  skip = 0,
  limit = 20
): Promise<TranslationMissionDocument[]> =>
  TranslationMissionModel.find({ reviewerId: reviewerProfileId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit) as unknown as TranslationMissionDocument[];

export const updateMissionStatus = async (
  id: string,
  status: MissionStatus,
  extra?: Partial<
    Pick<
      TranslationMissionData,
      'aiPreGeneratedAt' | 'completedAt' | 'canceledAt'
    >
  >
): Promise<TranslationMissionDocument | null> => {
  const update: Record<string, any> = { status, ...extra };

  if (status === 'completed') update.completedAt = new Date();
  if (status === 'canceled') update.canceledAt = new Date();

  return TranslationMissionModel.findByIdAndUpdate(id, update, {
    new: true,
  }) as unknown as TranslationMissionDocument | null;
};

export const countMissionsForUser = async (userId: string): Promise<number> =>
  TranslationMissionModel.countDocuments({ clientUserId: userId });

export const countMissionsForReviewerProfile = async (
  reviewerProfileId: string
): Promise<number> =>
  TranslationMissionModel.countDocuments({ reviewerId: reviewerProfileId });
