'use client';

import { getBlogDataArray } from '@components/BlogPage/blogData';
import { getDocDataArray } from '@components/DocPage/docData';
import {
  Breadcrumb,
  type BreadcrumbLink,
  Button,
  Input,
  Loader,
} from '@intlayer/design-system';
import { useSearchDoc } from '@intlayer/design-system/hooks';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { ArrowRight, Search } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC, useEffect, useRef, useState } from 'react';
import type { DocData } from '../types';

// Convert the documentation into an array of objects for Fuse.js
// Fuse.js options
const fuseOptions: IFuseOptions<DocData> = {
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'description', weight: 0.1 },
    { name: 'keywords', weight: 0.1 },
  ],
  threshold: 0.02, // Defines how fuzzy the matching should be (lower is more strict)
};

// Debounce function
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
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchResultItem: FC<{ doc: DocData; onClickLink: () => void }> = ({
  doc,
  onClickLink,
}) => {
  const router = useRouter();
  const { searchResultItemButton } = useIntlayer('doc-search-view');

  const breadcrumbLinks: BreadcrumbLink[] = doc.url
    .split('/')
    .slice(2)
    .map((path) => {
      return { text: path };
    });

  return (
    <Button
      label={searchResultItemButton.label.value}
      variant="hoverable"
      color="text"
      id={doc.url}
      onClick={() => {
        router.push(doc.url);
        onClickLink();
      }}
      className="w-full max-w-full"
    >
      <div className="flex items-center justify-between gap-2 text-wrap p-3">
        <div className="flex flex-1 flex-col gap-2 text-left">
          <strong className="text-base">{doc.title}</strong>
          <p className="text-neutral text-sm">{doc.description}</p>
          <Breadcrumb links={breadcrumbLinks} className="text-xs opacity-30" />
        </div>
        <ArrowRight size={24} />
      </div>
    </Button>
  );
};

export const SearchView: FC<{ onClickLink?: () => void }> = ({
  onClickLink = () => {},
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale } = useLocale();
  const searchQuery = useSearchParams().get('search');
  const documentationArray: DocData[] = [
    ...getDocDataArray(locale),
    ...(getBlogDataArray(locale) as unknown as DocData[]),
  ];
  const [results, setResults] = useState<DocData[]>([]);
  const { searchDoc, isLoading, abort: abortSearch } = useSearchDoc();

  const { noContentText, searchInput } = useIntlayer('doc-search-view');

  // Create a new Fuse instance with the options and documentation data
  const fuse = new Fuse(documentationArray, fuseOptions);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery) {
      let backendResults: DocData[] = [];
      // Prioritize backend search for longer queries, but always include Fuse results
      if (searchQuery.length > 2) {
        // Adjusted threshold for calling backend search
        const backendFilePaths = await searchDoc({
          input: searchQuery,
        });
        if (backendFilePaths && backendFilePaths.data) {
          backendResults = backendFilePaths.data
            .map((docName: string) =>
              documentationArray.find((doc) => doc.docName === docName)
            )
            .filter((doc: DocData | undefined): doc is DocData => Boolean(doc));
        }
      }

      // Perform client-side Fuse search
      const fuseSearchResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      // Merge results: backend results first, then Fuse results, avoiding duplicates
      const combinedResults = [...backendResults];
      const backendResultUrls = new Set(
        backendResults.map((doc) => doc.docName)
      );

      fuseSearchResults.forEach((fuseDoc) => {
        if (!backendResultUrls.has(fuseDoc.docName)) {
          combinedResults.push(fuseDoc);
        }
      });

      setResults(combinedResults);
    } else {
      setResults([]);
    }
  };

  const debouncedSearch = debounce(handleSearch, 200, abortSearch);

  useEffect(() => {
    if (!searchQuery) return;
    // Call the original handleSearch directly for the initial search query from URL
    handleSearch(searchQuery);
  }, [searchQuery]); // Removed handleSearch from dependencies as it's stable now

  const isNoResult =
    !isLoading &&
    results.length === 0 &&
    inputRef.current &&
    inputRef.current?.value !== '';

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
            {results.map((result) => (
              <li key={result.url}>
                <SearchResultItem doc={result} onClickLink={onClickLink} />
              </li>
            ))}
          </ul>
        )}
        <Loader isLoading={isLoading} />
      </div>
    </div>
  );
};
