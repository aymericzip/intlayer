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
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
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

const SearchResultItem: FC<{
  doc: DocMetadata;
  onClickLink: () => void;
  isSelected: boolean;
}> = ({ doc, onClickLink, isSelected }) => {
  const { searchResultItemButton } = useIntlayer('doc-search-view');
  const itemRef = useRef<HTMLAnchorElement>(null);

  const breadcrumbLinks: BreadcrumbLink[] = doc.url
    .split('/')
    .slice(2)
    .map((path) => {
      return { text: path };
    });

  // Scroll into view when selected
  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [isSelected]);

  return (
    <Link
      ref={itemRef}
      label={searchResultItemButton.label.value}
      variant="hoverable"
      color="text"
      id={doc.url}
      href={doc.url.replace(process.env.NEXT_PUBLIC_URL ?? '', '')}
      className="w-full max-w-full"
      isActive={isSelected}
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
  const router = useRouter();
  const searchQueryParam = useSearchParams().get('search');
  const [results, setResults] = useState<DocMetadata[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const { search, setSearch } = useSearch({
    defaultValue: searchQueryParam,
    onClear: () => {
      setResults([]);
      setSelectedIndex(-1);
    },
    onSearch: (searchQuery: string) => {
      const fuseSearchResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      setResults(fuseSearchResults);
      setSelectedIndex(-1);
    },
  });
  const { data: searchDocData, isFetching } = useSearchDoc({
    input: search,
  });

  const { noContentText, searchInput } = useIntlayer('doc-search-view');

  const { locale } = useLocale();
  const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogMetadata = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const frequentQuestionMetadata = getIntlayer(
    'frequent-question-metadata',
    locale
  ) as DocMetadata[];

  const filesData = [
    ...docMetadata,
    ...blogMetadata,
    ...frequentQuestionMetadata,
  ];

  // Create a new Fuse instance with the options and documentation data
  const fuse = new Fuse(filesData, fuseOptions);

  // Handle backend search results: append to Fuse results, avoiding duplicates
  useEffect(() => {
    if (searchDocData?.data && search) {
      const backendResults: DocMetadata[] = searchDocData.data
        .map((docKey: string) => filesData.find((doc) => doc.docKey === docKey))
        .filter((doc: DocMetadata | undefined): doc is DocMetadata =>
          Boolean(doc)
        );

      const fuseSearchResults = fuse
        .search(search)
        .map((result) => result.item);

      const combinedResults = [...fuseSearchResults];
      const seenDocKeys = new Set(combinedResults.map((doc) => doc.docKey));

      backendResults.forEach((backendDoc) => {
        if (!seenDocKeys.has(backendDoc.docKey)) {
          combinedResults.push(backendDoc);
        }
      });

      setResults(combinedResults);
    }
  }, [searchDocData, search]);

  // Focus input when modal opens using setTimeout
  // This waits for the browser's paint cycle and the modal animation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isOpen) {
      timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (results.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selectedDoc = results[selectedIndex];
        if (selectedDoc) {
          const href = selectedDoc.url.replace(
            process.env.NEXT_PUBLIC_URL ?? '',
            ''
          );
          router.push(href);
          onClickLink();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, router, onClickLink]);

  const isNoResult = !isFetching && results.length === 0 && search.length > 0;

  return (
    <>
      <div className="relative flex w-full items-center gap-1">
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
      <div className="mt-8 flex flex-1 flex-col overflow-y-auto">
        {isNoResult && (
          <p className="text-center text-neutral text-sm">{noContentText}</p>
        )}
        {results.length > 0 && (
          <ul className="flex flex-col gap-10">
            {results.map((result, index) => (
              <li key={result.url}>
                <SearchResultItem
                  doc={result}
                  onClickLink={onClickLink}
                  isSelected={index === selectedIndex}
                />
              </li>
            ))}
          </ul>
        )}
        <Loader isLoading={isFetching} />
      </div>
    </>
  );
};
