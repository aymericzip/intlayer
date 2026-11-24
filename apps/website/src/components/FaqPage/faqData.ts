import type { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import type { NavSection } from '~/components/DocPage/types';

/** Metadata of every frequent question, keyed by document key. */
export type FaqRecord = Awaited<
  ReturnType<typeof getFrequentQuestionMetadataRecord>
>;

export type FaqEntry = FaqRecord[keyof FaqRecord];

/** Questions in display order. */
export const getFaqEntries = (record: FaqRecord): FaqEntry[] =>
  Object.values(record);

/** Reduces the questions to the tree shape the shared sidebar renders. */
export const buildFaqNavSection = (record: FaqRecord): NavSection =>
  Object.fromEntries(
    getFaqEntries(record).map(({ docKey, title, slugs, relativeUrl, url }) => [
      docKey,
      { title, default: { slugs, relativeUrl, url } },
    ])
  );

/** Neighbouring questions of the given one, for the previous/next buttons. */
export const getAdjacentFaqEntries = (
  record: FaqRecord,
  docKey: string
): { prevDoc?: FaqEntry; nextDoc?: FaqEntry } => {
  const entries = getFaqEntries(record);
  const index = entries.findIndex((entry) => entry.docKey === docKey);

  if (index === -1) return {};

  return { prevDoc: entries[index - 1], nextDoc: entries[index + 1] };
};
