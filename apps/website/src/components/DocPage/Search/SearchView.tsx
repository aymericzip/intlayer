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
import {
  type FC,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Fuse.js options
const fuseOptions: IFuseOptions<DocMetadata> = {
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'description', weight: 0.1 },
    { name: 'keywords', weight: 0.1 },
  ],
  threshold: 0.02, // Defines how fuzzy the matching should be (lower is more strict)
};

const isValidDoc = (doc: DocMetadata) => {
  try {
    if (!doc) return false;

    if (typeof doc.title !== 'string') {
      console.error('Invalid doc title:', doc);
      return false;
    }

    if (doc.description && typeof doc.description !== 'string') {
      console.error('Invalid doc description:', doc);
      return false;
    }

    if (typeof doc.url !== 'string') {
      console.error('Invalid doc url:', doc);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating doc:', error);
    return false;
  }
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

const SearchViewContent: FC<{
  onClickLink?: () => void;
  isOpen?: boolean;
}> = ({ onClickLink = () => {}, isOpen = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQueryParam = searchParams.get('search');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [frontendResults, setFrontendResults] = useState<DocMetadata[]>([]);

  const { locale } = useLocale();
  const docMetadata = getIntlayer('doc-metadata', locale) as DocMetadata[];
  const blogMetadata = getIntlayer('blog-metadata', locale) as BlogMetadata[];
  const frequentQuestionMetadata = getIntlayer(
    'frequent-question-metadata',
    locale
  ) as DocMetadata[];

  const filesData = useMemo(
    () =>
      [...docMetadata, ...blogMetadata, ...frequentQuestionMetadata].filter(
        isValidDoc
      ),
    [docMetadata, blogMetadata, frequentQuestionMetadata]
  );

  // Create a new Fuse instance with the options and documentation data
  const fuse = useMemo(() => new Fuse(filesData, fuseOptions), [filesData]);

  const { search, setSearch } = useSearch({
    defaultValue: searchQueryParam,
    onClear: () => {
      setFrontendResults([]);
      setSelectedIndex(-1);
    },
    onSearch: (searchQuery: string) => {
      if (!fuse) return;

      const fuseSearchResults = fuse
        .search(searchQuery)
        .map((result) => result.item);

      setFrontendResults(fuseSearchResults);
      setSelectedIndex(-1);
    },
  });
  const { data: searchDocData, isFetching } = useSearchDoc({
    input: search,
  });

  const { noContentText, searchInput } = useIntlayer('doc-search-view');

  // Handle backend search results: append to Fuse results, avoiding duplicates
  const results = useMemo(() => {
    if (!searchDocData?.data || !search) {
      return frontendResults;
    }

    const backendResults: DocMetadata[] = searchDocData.data
      .map((docKey: string) => filesData.find((doc) => doc.docKey === docKey))
      .filter((doc: DocMetadata | undefined): doc is DocMetadata =>
        Boolean(doc)
      );

    const combinedResults = [...frontendResults];
    const seenDocKeys = new Set(combinedResults.map((doc) => doc.docKey));

    backendResults.forEach((backendDoc) => {
      if (!seenDocKeys.has(backendDoc.docKey)) {
        combinedResults.push(backendDoc);
      }
    });

    return combinedResults;
  }, [searchDocData, search, frontendResults, filesData]);

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

  const handleNavigate = useCallback(
    (doc: DocMetadata) => {
      const href = doc.url.replace(process.env.NEXT_PUBLIC_URL ?? '', '');
      router.push(href);
      onClickLink();
    },
    [router, onClickLink]
  );

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
          handleNavigate(selectedDoc);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, handleNavigate]);

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

const SearchViewWrapper: FC<{
  onClickLink?: () => void;
  isOpen?: boolean;
}> = (props) => (
  <Suspense fallback={<Loader isLoading />}>
    <SearchViewContent {...props} />
  </Suspense>
);

export { SearchViewWrapper as SearchView };
