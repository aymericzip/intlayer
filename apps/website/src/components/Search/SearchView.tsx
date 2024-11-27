'use client';

import { type DocData, getDocArray } from '@components/DocPage/docData';
import {
  Breadcrumb,
  type BreadcrumbLink,
  Button,
  Input,
} from '@intlayer/design-system';
import Fuse, { IFuseOptions } from 'fuse.js';
import { ArrowRight, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

const SearchResultItem: FC<{ doc: DocData; onClickLink: () => void }> = ({
  doc,
  onClickLink,
}) => {
  const router = useRouter();
  const { searchResultItemButton } = useIntlayer('search-view');

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
          <p className="text-neutral dark:text-neutral-dark text-sm">
            {doc.description}
          </p>
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
  const documentationArray: DocData[] = getDocArray(locale);
  const [results, setResults] = useState<DocData[]>([]);

  const { noContentText, searchInput } = useIntlayer('search-view');

  // Create a new Fuse instance with the options and documentation data
  const fuse = useMemo(
    () => new Fuse(documentationArray, fuseOptions),
    [documentationArray]
  );

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery) {
        // Perform search on every input change
        const searchResults = fuse
          .search(searchQuery)
          .map((result) => result.item);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    },
    [fuse]
  );

  useEffect(() => {
    if (!searchQuery) return;
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  const isNoResult = results.length === 0 && inputRef.current?.value !== '';

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-1">
        <Search />
        <Input
          type="search"
          placeholder={searchInput.placeholder.value}
          aria-label={searchInput.label.value}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchQuery ?? ''}
          className="m-3"
          ref={inputRef}
        />
      </div>
      <div className="mt-4">
        {isNoResult && <p className="m-auto">{noContentText}</p>}

        {results.length > 0 && (
          <ul className="flex flex-col gap-10">
            {results.map((result) => (
              <li key={result.url}>
                <SearchResultItem doc={result} onClickLink={onClickLink} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
