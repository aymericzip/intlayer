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

type BackendDocResult = { fileKey: string; similarityScore: number };

function mergeHybridResults(
  fuseResults: Fuse.FuseResult<DocMetadata>[],
  backendResults: BackendDocResult[],
  allDocs: DocMetadata[]
): DocMetadata[] {
  const normalizeFuse = (score?: number) => 1 - Math.min((score ?? 1) / 0.5, 1);
  const normalizeBackend = (score: number) => Math.min(score, 1);

  const backendMap = new Map(
    backendResults.map((r) => [r.fileKey, normalizeBackend(r.similarityScore)])
  );
  const combined = new Map<string, { doc: DocMetadata; score: number }>();

  for (const fuseItem of fuseResults) {
    const doc = fuseItem.item;
    const fuseScore = normalizeFuse(fuseItem.score);
    const backendScore = backendMap.get(doc.docKey);
    const combinedScore = backendScore
      ? BACKEND_WEIGHT * backendScore + FUSE_WEIGHT * fuseScore
      : fuseScore;
    combined.set(doc.docKey, { doc, score: combinedScore });
  }

  for (const [fileKey, backendScore] of backendMap) {
    if (!combined.has(fileKey)) {
      const doc = allDocs.find((d) => d.docKey === fileKey);
      if (doc)
        combined.set(fileKey, { doc, score: BACKEND_WEIGHT * backendScore });
    }
  }

  return Array.from(combined.values())
    .sort((a, b) => b.score - a.score)
    .map((v) => v.doc);
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

export const SearchView: FC<{
  onClickLink?: () => void;
  isOpen?: boolean;
}> = ({ onClickLink = () => {}, isOpen = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchQueryParam = useSearchParams().get('search');
  const [results, setResults] = useState<DocMetadata[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string | null>(
    searchQueryParam
  );

  const { search, setSearch } = useSearch({
    defaultValue: searchQueryParam,
    onClear: () => setResults([]),
  });

  const { data: backendData, isFetching } = useSearchDoc({ input: search });
  const { noContentText, searchInput } = useIntlayer('doc-search-view');
  const { locale } = useLocale();

  const docs = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogs = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const allDocs = [...docs, ...blogs];
  const fuse = new Fuse(allDocs, fuseOptions);

  useEffect(() => {
    if (backendData?.data && currentQuery) {
      const backendResults: BackendDocResult[] = backendData.data.map(
        (doc) => ({
          fileKey: doc.fileKey,
          similarityScore: doc.similarityScore ?? 0.5,
        })
      );

      const fuseResults = fuse.search(currentQuery);
      let mergedResults: DocMetadata[];

      if (fuseResults.length > 0) {
        // Hybrid mode: combine Fuse.js and backend semantic results
        mergedResults = mergeHybridResults(
          fuseResults,
          backendResults,
          filesData
        );
      } else {
        // Fallback: show backend-only results when Fuse finds none
        mergedResults = backendResults
          .map((r) => filesData.find((d) => d.docKey === r.fileKey))
          .filter((d): d is DocMetadata => Boolean(d));
      }

      setResults(mergedResults);
    }
  }, [backendData, currentQuery, allDocs, fuse]);

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
            {results.map((r) => (
              <li key={r.url}>
                <SearchResultItem doc={r} onClickLink={onClickLink} />
              </li>
            ))}
          </ul>
        )}
        <Loader isLoading={isFetching} />
      </div>
    </div>
  );
};
