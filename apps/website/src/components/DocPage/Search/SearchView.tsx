'use client';

import {
  Breadcrumb,
  type BreadcrumbLink,
  Button,
  Input,
  Loader,
} from '@intlayer/design-system';
import { useSearchDoc } from '@intlayer/design-system/hooks';
import type { BlogMetadata, DocMetadata } from '@intlayer/docs';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getIntlayer } from 'intlayer';
import { ArrowRight, Search } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FC, useEffect, useRef, useState } from 'react';

// Convert the documentation into an array of objects for Fuse.js
// Fuse.js options
const fuseOptions: IFuseOptions<DocMetadata> = {
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

const SearchResultItem: FC<{ doc: DocMetadata; onClickLink: () => void }> = ({
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
  const { data: searchDocData, isPending } = useSearchDoc(
    currentSearchQuery ? { input: currentSearchQuery } : undefined
  );

  const { noContentText, searchInput } = useIntlayer('doc-search-view');

  const { locale } = useLocale();
  const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogMetadata = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const filesData = [...docMetadata, ...blogMetadata];

  // Create a new Fuse instance with the options and documentation data
  const fuse = new Fuse(filesData, fuseOptions);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery) {
      // Prioritize backend search for longer queries, but always include Fuse results
      if (searchQuery.length > 2) {
        // Set the search query to trigger the useSearchDoc hook
        setCurrentSearchQuery(searchQuery);
      } else {
        // For shorter queries, only use Fuse search
        setCurrentSearchQuery(null);
        const fuseSearchResults = fuse
          .search(searchQuery)
          .map((result) => result.item);
        setResults(fuseSearchResults);
      }
    } else {
      setCurrentSearchQuery(null);
      setResults([]);
    }
  };

  const debouncedSearch = debounce(handleSearch, 200, () => null);

  // Handle backend search results
  useEffect(() => {
    if (searchDocData && searchDocData.data && currentSearchQuery) {
      let backendResults: DocMetadata[] = searchDocData.data
        .map((docKey: string) => filesData.find((doc) => doc.docKey === docKey))
        .filter((doc: DocMetadata | undefined): doc is DocMetadata =>
          Boolean(doc)
        );

      // Perform client-side Fuse search
      const fuseSearchResults = fuse
        .search(currentSearchQuery)
        .map((result) => result.item);

      // Merge results: backend results first, then Fuse results, avoiding duplicates
      const combinedResults = [...backendResults];
      const backendResultUrls = new Set(
        backendResults.map((doc) => doc.docKey)
      );

      fuseSearchResults.forEach((fuseDoc) => {
        if (!backendResultUrls.has(fuseDoc.docKey)) {
          combinedResults.push(fuseDoc);
        }
      });

      setResults(combinedResults);
    }
  }, [searchDocData, currentSearchQuery, filesData, fuse]);

  useEffect(() => {
    if (!searchQuery) return;
    // Call the original handleSearch directly for the initial search query from URL
    handleSearch(searchQuery);
  }, [searchQuery]); // Removed handleSearch from dependencies as it's stable now

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => inputRef.current?.focus(), 10);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  const isNoResult =
    !isPending &&
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
        <Loader isLoading={isPending} />
      </div>
    </div>
  );
};
