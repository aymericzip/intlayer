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

type BackendDocResult = { fileKey: string; similarityScore: number };

function mergeHybridResults(
  fuseResults: Fuse.FuseResult<DocMetadata>[],
  backendResults: BackendDocResult[],
  allDocs: DocMetadata[]
): DocMetadata[] {
  const normalizeFuse = (score?: number) =>
    1 - Math.min((score ?? 1) / 0.5, 1); // invert Fuse score
  const normalizeBackend = (score: number) => Math.min(score, 1); // no need to divide by 1

  const backendMap = new Map(
    backendResults.map((r) => [r.fileKey, normalizeBackend(r.similarityScore)])
  );
  const combinedMap = new Map<string, { doc: DocMetadata; score: number }>();

  for (const fuseItem of fuseResults) {
    const doc = fuseItem.item;
    const fuseScore = normalizeFuse(fuseItem.score);
    const backendScore = backendMap.get(doc.docKey);
    const combinedScore = backendScore
      ? BACKEND_WEIGHT * backendScore + FUSE_WEIGHT * fuseScore
      : fuseScore;
    combinedMap.set(doc.docKey, { doc, score: combinedScore });
  }

  for (const [fileKey, backendScore] of backendMap) {
    if (!combinedMap.has(fileKey)) {
      const doc = allDocs.find((d) => d.docKey === fileKey);
      if (doc) combinedMap.set(fileKey, { doc, score: BACKEND_WEIGHT * backendScore });
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
  const searchQueryParam = useSearchParams().get('search');
  const [results, setResults] = useState<DocMetadata[]>([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string | null>(
    searchQueryParam
  );

  const { search, setSearch } = useSearch({
    defaultValue: searchQueryParam,
    onClear: () => setResults([]),
    onSearch: (query) => {
      const fuseResults = fuse.search(query).map((r) => r.item);
      setResults(fuseResults);
    },
  });

  const { data: searchDocData, isFetching } = useSearchDoc({
    input: search,
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
      const backendDocumentsWithScore: BackendDocResult[] = searchDocData.data.map(
        (doc) => ({
          fileKey: doc.fileKey,
          similarityScore: doc.similarityScore ?? 0.5,
        })
      );

      const fuseResults = fuse.search(currentSearchQuery);
      const mergedResults = mergeHybridResults(
        fuseResults,
        backendDocumentsWithScore,
        filesData
      );

      setResults(mergedResults);
    }
  }, [searchDocData, currentSearchQuery, filesData, fuse]);

  useEffect(() => {
    if (searchQueryParam) handleSearch(searchQueryParam);
  }, [searchQueryParam]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const isNoResult = !isFetching && results.length === 0 && search.length > 0;

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
