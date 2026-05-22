import { DictionaryModel } from '@schemas/dictionary.schema';
import { TranslationMissionModel } from '@schemas/translator.schema';
import type {
  MissionEstimate,
  MissionStatus,
  TranslationMissionData,
  TranslationMissionDocument,
} from '@/types/translator.types';

const WORDS_PER_HOUR = 300;

const extractStrings = (obj: any): string[] => {
  if (typeof obj === 'string') return [obj];
  if (Array.isArray(obj)) return obj.flatMap(extractStrings);
  if (obj && typeof obj === 'object')
    return Object.values(obj).flatMap(extractStrings);
  return [];
};

const countWords = (str: string): number =>
  str.trim().split(/\s+/).filter(Boolean).length;

export const countWordsFromDictionaries = async (
  dictionaryIds: string[],
  sourceLocale: string
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
      typeof versionEl.content === 'object'
        ? (versionEl.content[sourceLocale] ?? versionEl.content)
        : versionEl.content;

    const strings = extractStrings(localeContent);
    total += strings.reduce((sum, s) => sum + countWords(s), 0);
  }

  return total;
};

export const calculateMissionEstimate = async (
  dictionaryIds: string[],
  sourceLocale: string,
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

export const findMissionsForTranslatorProfile = async (
  translatorProfileId: string,
  skip = 0,
  limit = 20
): Promise<TranslationMissionDocument[]> =>
  TranslationMissionModel.find({ translatorId: translatorProfileId })
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
