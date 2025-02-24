'use client';

import { getBlogDataArray } from '@components/BlogPage/blogData';
import {
  Breadcrumb,
  type BreadcrumbLink,
  Button,
  Input,
} from '@intlayer/design-system';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { Locales } from 'intlayer';
import { ArrowRight, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type BlogData } from '../types';

// Convert the blog into an array of objects for Fuse.js
// Fuse.js options
const fuseOptions: IFuseOptions<BlogData> = {
  keys: [
    { name: 'title', weight: 0.8 },
    { name: 'description', weight: 0.1 },
    { name: 'keywords', weight: 0.1 },
  ],
  threshold: 0.02, // Defines how fuzzy the matching should be (lower is more strict)
};

const SearchResultItem: FC<{ blog: BlogData; onClickLink: () => void }> = ({
  blog,
  onClickLink,
}) => {
  const router = useRouter();
  const { searchResultItemButton } = useIntlayer('blog-search-view');

  const breadcrumbLinks: BreadcrumbLink[] = blog.url
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
      id={blog.url}
      onClick={() => {
        router.push(blog.url);
        onClickLink();
      }}
      className="w-full max-w-full"
    >
      <div className="flex items-center justify-between gap-2 text-wrap p-3">
        <div className="flex flex-1 flex-col gap-2 text-left">
          <strong className="text-base">{blog.title}</strong>
          <p className="text-neutral text-sm">{blog.description}</p>
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
  const blogArray: BlogData[] = getBlogDataArray(locale as Locales);
  const [results, setResults] = useState<BlogData[]>([]);

  const { noContentText, searchInput } = useIntlayer('blog-search-view');

  // Create a new Fuse instance with the options and blog data
  const fuse = useMemo(() => new Fuse(blogArray, fuseOptions), [blogArray]);

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

  const isNoResult =
    results.length === 0 && inputRef.current && inputRef.current?.value !== '';

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
                <SearchResultItem blog={result} onClickLink={onClickLink} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
