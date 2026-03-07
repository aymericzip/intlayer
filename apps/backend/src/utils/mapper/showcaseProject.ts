import type {
  ShowcaseProjectAPI,
  ShowcaseProjectDocument,
} from '@/types/showcaseProject.types';

/**
 * Maps a ShowcaseProjectDocument to a ShowcaseProjectAPI response.
 * Reduces the `upvoters` array to a numeric `upvotes` count and
 * optionally computes `isLiked` for the given userId.
 */
export const mapShowcaseProjectToAPI = (
  doc: ShowcaseProjectDocument,
  userId?: string
): ShowcaseProjectAPI => {
  const upvoters: string[] = doc.upvoters ?? [];

  // Mongoose Map fields must be converted to plain objects
  const packageDetails: Record<string, string> =
    doc.packageDetails instanceof Map
      ? Object.fromEntries(doc.packageDetails)
      : (doc.packageDetails as Record<string, string> | undefined) ?? {};

  return {
    id: String((doc as any)._id),
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl,
    logoUrl: doc.logoUrl,
    websiteUrl: doc.websiteUrl,
    githubUrl: doc.githubUrl,
    tags: doc.tags,
    upvotes: upvoters.length,
    upvoters: userId ? [userId].filter((id) => upvoters.includes(id)) : [],
    isOpenSource: doc.isOpenSource,
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : String(doc.createdAt),
    lastScanDate:
      doc.lastScanDate instanceof Date
        ? doc.lastScanDate.toISOString()
        : doc.lastScanDate
          ? String(doc.lastScanDate)
          : undefined,
    intlayerVersion: doc.intlayerVersion,
    libsUsed: doc.libsUsed,
    packageDetails,
    scanDetails: doc.scanDetails,
    owner: doc.owner,
    status: doc.status,
    isOwner: userId ? doc.owner === userId : false,
  };
};

export const mapShowcaseProjectsToAPI = (
  docs: ShowcaseProjectDocument[],
  userId?: string
): ShowcaseProjectAPI[] => docs.map((doc) => mapShowcaseProjectToAPI(doc, userId));
