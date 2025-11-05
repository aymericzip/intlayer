'use client';

import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
  Checkbox,
  CheckboxColor,
  CheckboxSize,
  SearchInput,
} from '@intlayer/design-system';
import Fuse from 'fuse.js';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo, useRef, useState } from 'react';
import type { DomainData } from './types';

type PageGroupsListProps = {
  domainData?: Partial<DomainData>;
  onSelect: (url: string[]) => void;
};

export const PageGroupsList: FC<PageGroupsListProps> = memo(
  ({ domainData, onSelect }) => {
    const { actions, otherPagesDetected, searchUrlPlaceholder, messages } =
      useIntlayer('analyzer-results');

    const abortRef = useRef<AbortController | null>(null);

    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [batchRunning, setBatchRunning] = useState(false);
    const [search, setSearch] = useState('');

    const allFlatUrls = new Set(
      Object.values(domainData?.discoveredUrls ?? {}).flat()
    );
    const selectableUrls: string[] = Array.from(allFlatUrls);
    const fuse = new Fuse(selectableUrls, {
      threshold: 0.3,
    });

    const selectedUrls = Object.keys(selected).filter((url) => selected[url]);

    const filteredUrls = fuse.search(search).map((result) => result.item);

    const toggleSelect = (url: string) =>
      setSelected((prev) => ({ ...prev, [url]: !prev[url] }));

    const startAnalyzeSelected = async () => {
      if (!selectedUrls.length || batchRunning) return;
      setBatchRunning(true);

      const aborter = new AbortController();
      abortRef.current = aborter;

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: selectedUrls, onlyPage: true }),
          signal: aborter.signal,
        });
      } catch {
        // ignore
      } finally {
        setBatchRunning(false);
        abortRef.current = null;
      }
    };

    const cancelBatch = () => {
      if (abortRef.current) abortRef.current.abort();
    };

    return (
      <div className="mt-4 border-neutral border-t border-dashed">
        <div className="mt-4 mb-2 flex w-full items-end justify-between gap-2">
          <div className="text-neutral text-sm">
            {selectableUrls.length} {otherPagesDetected}
          </div>
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchUrlPlaceholder.value}
            className="ml-auto w-auto"
          />
        </div>
        <ul className="flex max-h-72 flex-col gap-1 overflow-auto rounded border border-neutral/40 p-2">
          {filteredUrls.length === 0 ? (
            <li className="p-4 text-center text-neutral text-sm">
              {messages.noUrlFound.value}
            </li>
          ) : (
            filteredUrls.map((url) => (
              <li key={url} className="p-2">
                <div className="rounded-md p-1 pl-3 hover:bg-neutral/10">
                  <Checkbox
                    name={url}
                    label={<span className="truncate">{url}</span>}
                    checked={!!selected[url]}
                    onChange={() => toggleSelect(url)}
                    color={CheckboxColor.TEXT}
                    size={CheckboxSize.SM}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="mt-3 flex items-center gap-3">
          <Button
            variant={ButtonVariant.DEFAULT}
            color={ButtonColor.TEXT}
            size={ButtonSize.SM}
            onClick={startAnalyzeSelected}
            disabled={!selectedUrls.length || batchRunning}
            label={actions.analyzeSelectedPages}
            type="button"
            className="ml-auto"
          >
            {actions.analyzeSelectedPages}
          </Button>
          {batchRunning && (
            <Button
              variant={ButtonVariant.OUTLINE}
              color={ButtonColor.TEXT}
              size={ButtonSize.SM}
              onClick={cancelBatch}
              label={actions.cancel}
            >
              {actions.cancel}
            </Button>
          )}
        </div>
      </div>
    );
  }
);
