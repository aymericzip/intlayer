'use client';

import {
  Button,
  ButtonColor,
  ButtonVariant,
} from '@intlayer/design-system/button';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';
import Fuse from 'fuse.js';
import { useIntlayer } from 'next-intlayer';
import { type FC, useMemo, useState } from 'react';

type UrlDiscoveryListProps = {
  urls: string[];
  isLoading: boolean;
  onStart: (selectedUrls: string[]) => void;
  onCancel: () => void;
};

export const UrlDiscoveryList: FC<UrlDiscoveryListProps> = ({
  urls,
  isLoading,
  onStart,
  onCancel,
}) => {
  const {
    title,
    description,
    cancelButton,
    selectAll,
    searchPlaceholder,
    urlsLabel,
    selectedLabel,
    startButton,
    startingButton,
    maxLimitReached,
  } = useIntlayer('url-discovery-list');

  const MAX_URLS = 10;

  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(urls.slice(0, MAX_URLS))
  );
  const [query, setQuery] = useState('');

  const domain = urls.length > 0 ? new URL(urls[0]).origin : '';

  const fuse = useMemo(
    () => new Fuse(urls, { threshold: 0.3, includeScore: true }),
    [urls]
  );

  const filteredUrls = useMemo(() => {
    if (!query.trim()) return urls;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse, urls]);

  const allFilteredSelected =
    filteredUrls.length > 0 && filteredUrls.every((u) => selected.has(u));

  const atLimit = selected.size >= MAX_URLS;

  const toggleFiltered = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const url of filteredUrls) {
        if (checked) {
          if (next.size < MAX_URLS) next.add(url);
        } else {
          next.delete(url);
        }
      }
      return next;
    });
  };

  const toggleUrl = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else if (next.size < MAX_URLS) {
        next.add(url);
      }
      return next;
    });
  };

  const noneSelected = selected.size === 0;

  return (
    <div className="mt-6 flex flex-col gap-4 border-neutral border-t border-dashed pt-6 text-left">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="mt-0.5 text-sm text-text/60">
            {urls.length} {description}
          </p>
        </div>
        <Button
          onClick={onCancel}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.TEXT}
          label={cancelButton.value}
        >
          {cancelButton}
        </Button>
      </div>

      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={searchPlaceholder.value}
      />

      <div className="max-h-80 overflow-auto rounded-xl border border-neutral/20 bg-card/50">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-card shadow-sm">
            <tr>
              <th className="p-3">
                <Checkbox
                  checked={allFilteredSelected}
                  onChange={(e) => toggleFiltered(e.target.checked)}
                  name="select-all"
                  size="xs"
                  label={selectAll.value}
                />
              </th>
              <th className="p-3 text-text/60">
                {filteredUrls.length === urls.length
                  ? `${urls.length} ${urlsLabel}`
                  : `${filteredUrls.length} / ${urls.length} ${urlsLabel}`}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUrls.map((url) => (
              <tr
                key={url}
                className="cursor-pointer border-neutral/10 border-t transition-colors hover:bg-card/80"
                onClick={() => toggleUrl(url)}
              >
                <td className="p-3">
                  <Checkbox
                    checked={selected.has(url)}
                    onChange={() => toggleUrl(url)}
                    onClick={(e) => e.stopPropagation()}
                    name=""
                    size="xs"
                    label={url.replace(domain, '')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 self-end">
        {atLimit && (
          <span className="text-warning text-xs">{maxLimitReached}</span>
        )}
        <span className="text-sm text-text/60">
          {selected.size} / {MAX_URLS} {selectedLabel}
        </span>
        <Button
          onClick={() => onStart([...selected])}
          disabled={isLoading || noneSelected}
          variant={ButtonVariant.DEFAULT}
          color="text"
          label={startButton.value}
        >
          {isLoading ? startingButton : startButton}
        </Button>
      </div>
    </div>
  );
};
