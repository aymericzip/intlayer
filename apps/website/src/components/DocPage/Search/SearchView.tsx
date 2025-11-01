'use client';

import { Link } from '@components/Link/Link';
import {
  Breadcrumb,
  type BreadcrumbLink,
  Input,
  Loader,
} from '@intlayer/design-system';
import { useSearch, useSearchDoc } from '@intlayer/design-system/hooks';
import type { BlogMetadata, DocMetadata } from '@intlayer/docs';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getIntlayer } from 'intlayer';
import { ArrowRight, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useEffect, useRef, useState } from 'react';

const fuseOptions: IFuseOptions<DocMetadata> = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.25,
  ignoreLocation: true,
  distance: 100,
  minMatchCharLength: 2,
  findAllMatches: true,
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.15 },
    { name: 'keywords', weight: 0.1 },
    { name: 'excerpt', weight: 0.05 },
  ],
};

const FUSE_WEIGHT = 0.3;
const BACKEND_WEIGHT = 0.7;

type BackendDocumentResult = {
  fileKey: string;
  similarityScore: number;
};

/**
 * Merges Fuse.js (local fuzzy search) and backend (semantic search) results
 * into a single ranked list.
 */
const mergeHybridResults = (
  fuseResults: Fuse.FuseResult<DocMetadata>[],
  backendResults: BackendDocumentResult[],
  allDocuments: DocMetadata[]
): DocMetadata[] => {
  const normalizeFuse = (score?: number) => 1 - Math.min((score ?? 1) / 0.5, 1);
  const normalizeBackend = (score: number) => Math.min(score, 1);

  const backendMap = new Map(
    backendResults.map((result) => [
      result.fileKey,
      normalizeBackend(result.similarityScore),
    ])
  );

  const combined = new Map<string, { document: DocMetadata; score: number }>();

  // Combine both Fuse and backend scores where available
  for (const fuseItem of fuseResults) {
    const document = fuseItem.item;
    const fuseScore = normalizeFuse(fuseItem.score);
    const backendScore = backendMap.get(document.docKey);
    const combinedScore = backendScore
      ? BACKEND_WEIGHT * backendScore + FUSE_WEIGHT * fuseScore
      : fuseScore;
    combined.set(document.docKey, { document, score: combinedScore });
  }

  // Include backend-only results not found by Fuse
  for (const [fileKey, backendScore] of backendMap) {
    if (!combined.has(fileKey)) {
      const document = allDocuments.find(
        (doc) =>
          doc.docKey === fileKey ||
          doc.url.endsWith(fileKey) ||
          doc.url.includes(fileKey)
      );
      if (document)
        combined.set(fileKey, {
          document,
          score: BACKEND_WEIGHT * backendScore,
        });
    }
  }

  return Array.from(combined.values())
    .sort((a, b) => b.score - a.score)
    .map((value) => value.document);
};

const SearchResultItem: FC<{ doc: DocMetadata; onClickLink: () => void }> = ({
  doc,
  onClickLink,
}) => {
  const { searchResultItemButton } = useIntlayer('doc-search-view');
  const breadcrumbLinks: BreadcrumbLink[] = doc.url
    .split('/')
    .slice(2)
    .map((path) => ({ text: path }));

  return (
    <Link
      label={searchResultItemButton.label.value}
      variant="hoverable"
      color="text"
      id={doc.url}
      href={doc.url}
      className="w-full max-w-full"
      onClick={onClickLink}
    >
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="flex flex-1 flex-col gap-2 text-left">
          <strong className="text-base">{doc.title}</strong>
          <p className="text-neutral text-sm">{doc.description}</p>
          <Breadcrumb links={breadcrumbLinks} className="text-xs opacity-30" />
        </div>
        <ArrowRight size={24} />
      </div>
    </Link>
  );
};

/**
 * SearchView — combines Fuse.js fuzzy search (client-side)
 * with backend semantic vector results for robust doc discovery.
 */
export const SearchView: FC<{
  onClickLink?: () => void;
  isOpen?: boolean;
}> = ({ onClickLink = () => {}, isOpen = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchQueryParam = useSearchParams().get('search');
  const [results, setResults] = useState<DocMetadata[]>([]);

  const { search, setSearch } = useSearch({
    defaultValue: searchQueryParam,
    onClear: () => setResults([]),
  });

  const { data: backendData, isFetching } = useSearchDoc({ input: search });
  const { noContentText, searchInput } = useIntlayer('doc-search-view');
  const { locale } = useLocale();

  const docs = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogs = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const allDocuments = [...docs, ...blogs];
  const fuse = new Fuse(allDocuments, fuseOptions);

  useEffect(() => {
    if (backendData?.data && search) {
      // Normalize backend response (string paths → structured results)
      const backendResults: BackendDocumentResult[] = backendData.data.map(
        (item: any) => {
          if (typeof item === 'string') {
            return {
              fileKey: item.replace(/^\.\//, ''),
              similarityScore: 0.5,
            };
          }
          return {
            fileKey: item.fileKey,
            similarityScore: item.similarityScore ?? 0.5,
          };
        }
      );

      const fuseResults = fuse.search(search);
      let mergedResults: DocMetadata[];

      if (fuseResults.length > 0) {
        mergedResults = mergeHybridResults(
          fuseResults,
          backendResults,
          allDocuments
        );
      } else {
        mergedResults = backendResults
          .map((result) =>
            allDocuments.find(
              (doc) =>
                doc.docKey === result.fileKey ||
                doc.url.endsWith(result.fileKey) ||
                doc.url.includes(result.fileKey)
            )
          )
          .filter((doc): doc is DocMetadata => Boolean(doc));
      }

      setResults(mergedResults);
    }
  }, [backendData, search, allDocuments, fuse]);

  const isNoResult =
    !isFetching &&
    results.length === 0 &&
    search.length > 0 &&
    !backendData?.data?.length;

  return (
    <div className="relative w-full p-4">
      <div className="flex items-center gap-1">
        <Search />
        <Input
          type="search"
          placeholder={searchInput.placeholder.value}
          aria-label={searchInput.label.value}
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={searchQueryParam ?? ''}
          className="m-3"
          ref={inputRef}
        />
      </div>

      <div className="mt-4">
        {isNoResult && (
          <p className="text-center text-neutral text-sm">{noContentText}</p>
        )}
        {results.length > 0 && (
          <ul className="flex flex-col gap-10">
            {results.map((result) => (
              <li key={result.url}>
                <SearchResultItem doc={result} onClickLink={onClickLink} />
              </li>
            ))}
          </ul>
        )}
        <Loader isLoading={isFetching} />
      </div>
    </div>
  );
};
