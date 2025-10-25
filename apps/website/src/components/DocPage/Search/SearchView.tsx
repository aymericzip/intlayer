'use client';

import { Link } from '@components/Link/Link';
import {
  Breadcrumb,
  type BreadcrumbLink,
  Input,
  Loader,
} from '@intlayer/design-system';
import { useSearchDoc } from '@intlayer/design-system/hooks';
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
    { name: 'excerpt', weight: 0.05 }, // Optional short snippet per doc
  ],
};

// Debounce utility
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  onAbort: () => void
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      onAbort();
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Hybrid rank merge between Fuse.js (local) and embedding backend results.
 */
function mergeHybridResults(
  fuseResults: Fuse.FuseResult<DocMetadata>[],
  backendResults: { docKey: string; score: number }[],
  allDocs: DocMetadata[]
): DocMetadata[] {
  const normalizeFuse = (score?: number) => 1 - Math.min((score ?? 1) / 0.5, 1); // invert Fuse score
  const normalizeBackend = (score: number) => Math.min(score / 1.0, 1); // already cosine-like

  const backendMap = new Map(
    backendResults.map((r) => [r.docKey, normalizeBackend(r.score)])
  );
  const combinedMap = new Map<string, { doc: DocMetadata; score: number }>();

  for (const fuseItem of fuseResults) {
    const doc = fuseItem.item;
    const fuseScore = normalizeFuse(fuseItem.score);
    const backendScore = backendMap.get(doc.docKey);
    const combinedScore = backendScore
      ? 0.7 * backendScore + 0.3 * fuseScore
      : fuseScore;
    combinedMap.set(doc.docKey, { doc, score: combinedScore });
  }

  for (const [docKey, backendScore] of backendMap) {
    if (!combinedMap.has(docKey)) {
      const doc = allDocs.find((d) => d.docKey === docKey);
      if (doc) combinedMap.set(docKey, { doc, score: 0.7 * backendScore });
    }
  }

  return Array.from(combinedMap.values())
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.doc);
}

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
      <div className="flex items-center justify-between gap-2 text-wrap p-3">
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

export const SearchView: FC<{
  onClickLink?: () => void;
  isOpen?: boolean;
}> = ({ onClickLink = () => {}, isOpen = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchQuery = useSearchParams().get('search');

  const [results, setResults] = useState<DocMetadata[]>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(
    searchQuery
  );
  const { data: searchDocData, isFetching } = useSearchDoc({
    input: currentSearchQuery ?? '',
  });

  const { noContentText, searchInput } = useIntlayer('doc-search-view');
  const { locale } = useLocale();

  const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogMetadata = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const filesData = [...docMetadata, ...blogMetadata];
  const fuse = new Fuse(filesData, fuseOptions);

  const handleSearch = async (query: string) => {
    if (!query) {
      setCurrentSearchQuery(null);
      setResults([]);
      return;
    }

    if (query.length > 2) {
      setCurrentSearchQuery(query);
    } else {
      setCurrentSearchQuery(null);
      const fuseSearchResults = fuse.search(query).map((r) => r.item);
      setResults(fuseSearchResults);
    }
  };

  const debouncedSearch = debounce(handleSearch, 200, () => null);

  useEffect(() => {
    if (searchDocData?.data && currentSearchQuery) {
      const backendDocsWithScore =
        (searchDocData?.data ?? []).map((d: any) => ({
          docKey: d.fileKey,
          score: d.similarityScore ?? 0.5,
        })) ?? [];

      const fuseSearchResults = fuse.search(currentSearchQuery);
      const mergedResults = mergeHybridResults(
        fuseSearchResults,
        backendDocsWithScore,
        filesData
      );

      setResults(mergedResults);
    }
  }, [searchDocData, currentSearchQuery, filesData, fuse]);

  useEffect(() => {
    if (searchQuery) handleSearch(searchQuery);
  }, [searchQuery]);

  /* --------------------------- Autofocus on open --------------------------- */
  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => inputRef.current?.focus(), 10);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  const isNoResult =
    !isFetching && results.length === 0 && inputRef.current?.value !== '';

  return (
    <div className="relative w-full p-4">
      <div className="flex items-center gap-1">
        <Search />
        <Input
          type="search"
          placeholder={searchInput.placeholder.value}
          aria-label={searchInput.label.value}
          onChange={(e) => debouncedSearch(e.target.value)}
          defaultValue={searchQuery ?? ''}
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
            {results.map((result, i) => (
              <li key={result.url}>
                <SearchResultItem doc={result} onClickLink={onClickLink} />
                <p className="text-gray-400 text-xs">Rank #{i + 1}</p>
              </li>
            ))}
          </ul>
        )}
        <Loader isLoading={isFetching} />
      </div>
    </div>
  );
};
