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
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo, useRef, useState } from 'react';
import type { BatchResult, PageGroup } from './types';
import { getSelectableUrls, parseSSEStream } from './utils';

type PageGroupsListProps = {
  pageGroups: PageGroup[];
  onBatchResultsChange: (
    updater: BatchResult[] | ((prev: BatchResult[]) => BatchResult[])
  ) => void;
};

export const PageGroupsList: FC<PageGroupsListProps> = memo(
  ({ pageGroups, onBatchResultsChange }) => {
    const { actions, otherPagesDetected, searchUrlPlaceholder, messages } =
      useIntlayer('analyzer-results');

    const abortRef = useRef<AbortController | null>(null);

    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [batchRunning, setBatchRunning] = useState(false);
    const [search, setSearch] = useState('');

    const selectedUrls = Object.keys(selected).filter((url) => selected[url]);

    // Filter pageGroups based on search - use simple substring matching for URLs
    let filteredPageGroups: PageGroup[];
    if (!search.trim()) {
      filteredPageGroups = pageGroups;
    } else {
      const searchLower = search.toLowerCase();
      filteredPageGroups = pageGroups
        .map((group) => {
          const defaultMatches = group.defaultUrl
            .toLowerCase()
            .includes(searchLower);
          const filteredAlternates = group.alternates.filter((alt) =>
            alt.url.toLowerCase().includes(searchLower)
          );

          // Include group if default matches OR any alternate matches
          if (defaultMatches || filteredAlternates.length > 0) {
            return {
              ...group,
              // Only show alternates that match (if default doesn't match)
              alternates: defaultMatches
                ? group.alternates
                : filteredAlternates,
            };
          }
          return null;
        })
        .filter((group): group is PageGroup => group !== null);
    }

    const selectableUrls = getSelectableUrls(filteredPageGroups);

    const toggleSelect = (url: string) =>
      setSelected((prev) => ({ ...prev, [url]: !prev[url] }));

    const startAnalyzeSelected = async () => {
      if (!selectedUrls.length || batchRunning) return;
      setBatchRunning(true);
      const initialResults: BatchResult[] = selectedUrls.map((url) => ({
        url,
        loading: true,
      }));
      onBatchResultsChange(initialResults);

      const aborter = new AbortController();
      abortRef.current = aborter;

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: selectedUrls, onlyPage: true }),
          signal: aborter.signal,
        });

        await parseSSEStream(res, (event) => {
          if (event.type === 'page-start') {
            onBatchResultsChange((prev) => {
              const copy = [...prev];
              const index = copy.findIndex(
                (result) => result.url === event.url
              );
              if (index >= 0)
                copy[index] = {
                  url: event.url,
                  loading: true,
                  progress: 0,
                  currentStep: event.message || 'Starting analysis...',
                };
              return copy;
            });
          }

          if (event.type === 'page-progress') {
            onBatchResultsChange((prev) => {
              const copy = [...prev];
              const index = copy.findIndex(
                (result) => result.url === event.url
              );
              if (index >= 0)
                copy[index] = {
                  ...copy[index],
                  progress: event.progress,
                  currentStep: event.message,
                };
              return copy;
            });
          }

          if (event.type === 'page-complete') {
            onBatchResultsChange((prev) => {
              const copy = [...prev];
              const index = copy.findIndex(
                (result) => result.url === event.url
              );
              if (index >= 0)
                copy[index] = {
                  url: event.url,
                  data: event.data,
                  loading: false,
                };
              return copy;
            });
          }

          if (event.type === 'page-error') {
            onBatchResultsChange((prev) => {
              const copy = [...prev];
              const index = copy.findIndex(
                (result) => result.url === event.url
              );
              if (index >= 0)
                copy[index] = {
                  url: event.url,
                  error: event.error,
                  loading: false,
                };
              return copy;
            });
          }

          if (event.type === 'error') {
            if (abortRef.current) abortRef.current.abort();
          }
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

    if (pageGroups.length === 0) {
      return null;
    }

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
          {filteredPageGroups.length === 0 ? (
            <li className="p-4 text-center text-neutral text-sm">
              {messages.noUrlFound.value}
            </li>
          ) : (
            filteredPageGroups.map((group) => (
              <li key={group.defaultUrl} className="p-2">
                <div className="rounded-md p-1 pl-3 hover:bg-neutral/10">
                  <Checkbox
                    name={group.defaultUrl}
                    label={<span className="truncate">{group.defaultUrl}</span>}
                    checked={!!selected[group.defaultUrl]}
                    onChange={() => toggleSelect(group.defaultUrl)}
                    color={CheckboxColor.TEXT}
                    size={CheckboxSize.SM}
                  />
                </div>
                {group.alternates.length > 0 && (
                  <ul className="mt-1 ml-4 flex flex-col gap-0.5">
                    {group.alternates.map((alt) => (
                      <li
                        key={alt.url}
                        className="flex items-center gap-2 rounded-md p-1 pl-3 hover:bg-neutral/10"
                      >
                        <span className="text-text/60 text-xs">-</span>
                        <Checkbox
                          name={alt.url}
                          label={<span className="truncate">{alt.url}</span>}
                          checked={!!selected[alt.url]}
                          onChange={() => toggleSelect(alt.url)}
                          color={CheckboxColor.TEXT}
                          size={CheckboxSize.SM}
                        />
                      </li>
                    ))}
                  </ul>
                )}
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
