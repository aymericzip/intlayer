'use client';

import { Link } from '@components/Link/Link';
import { Loader, Popover } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  FileText,
  Flag,
  Globe,
  Info,
  Languages,
  Link as LinkIcon,
  XCircle,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import type { AnalyzerResultsProps } from './types';

export const InformationTag: FC<PropsWithChildren<{ id: string }>> = ({
  children,
  id,
}) => (
  <Popover identifier={`information-tag-${id}`}>
    <Info className="size-3 text-neutral/50" />
    <Popover.Detail
      identifier={`information-tag-${id}`}
      className="min-w-[400px] flex-col gap-10 bg-background p-4 text-left text-sm"
      isFocusable
      isOverable
    >
      {children}
    </Popover.Detail>
  </Popover>
);

export const ErrorTag: FC<
  PropsWithChildren<{ id: string; error: { message: string; details?: any } }>
> = ({ id, error }) => (
  <Popover identifier={`error-tag-${id}`}>
    <AlertCircle className="size-4 text-error" />
    <Popover.Detail
      identifier={`error-tag-${id}`}
      className="min-w-[400px] max-w-[600px] flex-col gap-3 bg-background p-4 text-left text-sm"
      isFocusable
      isOverable
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-error">{error.message}</h4>
        {error.details && (
          <div className="flex flex-col gap-2 text-neutral text-xs">
            {error.details.recommendation && (
              <p>
                <strong>Recommendation:</strong> {error.details.recommendation}
              </p>
            )}
            {error.details.presentAlternates &&
              error.details.presentAlternates.length > 0 && (
                <div>
                  <strong>Present alternates:</strong>
                  <ul className="mt-1 ml-4 list-disc">
                    {error.details.presentAlternates.map((alt: string) => (
                      <li key={alt}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}
            {error.details.expectedLocales &&
              error.details.expectedLocales.length > 0 && (
                <div>
                  <strong>Expected locales:</strong>{' '}
                  {error.details.expectedLocales.join(', ')}
                </div>
              )}
            {error.details.pages && (
              <div>
                <strong>
                  Affected pages ({error.details.totalCount || 'all'}):
                </strong>
                <ul className="mt-1 ml-4 max-h-[300px] list-disc overflow-y-auto">
                  {error.details.pages.map(
                    (page: { url: string; missingLocales?: string[] }) => (
                      <li key={page.url} className="mb-2">
                        <div className="break-all">{page.url}</div>
                        {page.missingLocales &&
                          page.missingLocales.length > 0 && (
                            <div className="ml-2 text-error text-xs">
                              Missing: {page.missingLocales.join(', ')}
                            </div>
                          )}
                      </li>
                    )
                  )}
                </ul>
                {error.details.totalCount &&
                  error.details.pages.length < error.details.totalCount && (
                    <p className="mt-2 text-neutral text-xs">
                      ... and{' '}
                      {error.details.totalCount - error.details.pages.length}{' '}
                      more
                    </p>
                  )}
              </div>
            )}
            {error.details.count !== undefined && (
              <p>
                <strong>Count:</strong> {error.details.count}
              </p>
            )}
          </div>
        )}
      </div>
    </Popover.Detail>
  </Popover>
);

export const StatusIcon: FC<{ ok: boolean }> = ({ ok }) =>
  ok ? (
    <CheckCircle2 size={16} className="text-success" />
  ) : (
    <XCircle size={16} className="text-error" />
  );

export const AnalyzerPageResults: FC<AnalyzerResultsProps> = memo(
  ({ data, loading = false, partialSummary = {}, url }) => {
    const {
      fields,
      fieldsDescription,
      url: urlText,
    } = useIntlayer('analyzer-results');

    // Merge partial summary with data summary to get current state
    const summary = {
      ...(data.summary ?? {}),
      ...partialSummary,
    };

    // Get errors from data
    const errors = data.errors || summary.errors || {};

    const fieldKeyMap: Record<string, string> = {
      langTag: 'langTag',
      hreflangs: 'hreflangs',
      localeCount: 'localesCount',
      langSelector: 'hasLangSelector',
      flags: 'hasFlagIcons',
      canonical: 'hasCanonical',
      localizedUrls: 'urlStructureLocalized',
      localizedLinks: 'hasLocalizedLinks',
      currentLocale: 'currentLocale',
      htmlLangPresent: 'htmlLangPresent',
      htmlDirPresent: 'htmlDirPresent',
      htmlDir: 'htmlDir',
      hasXDefault: 'hasXDefault',
      allAnchorsLocalized: 'allAnchorsLocalized',
    };

    const getFieldValue = (key: string, isBoolean: boolean) => {
      const summaryKey = fieldKeyMap[key];
      const hasValue =
        summaryKey !== undefined &&
        summaryKey in summary &&
        summary[summaryKey] !== undefined;

      if (!hasValue && loading) {
        return null; // Show loading state
      }

      if (isBoolean) {
        const isOk = Boolean(summary[summaryKey]);
        const hasError = errors[summaryKey];

        // If there's an error with details, show ErrorTag instead of StatusIcon
        if (!isOk && hasError) {
          return <ErrorTag id={summaryKey} error={hasError} />;
        }

        return <StatusIcon ok={isOk} />;
      }

      return summary[summaryKey];
    };

    const fieldsList = [
      {
        key: 'langTag',
        icon: <Globe size={16} />,
        label: fields.langTag,
        description: fieldsDescription.langTag,
        isBoolean: false,
      },
      {
        key: 'currentLocale',
        icon: <Languages size={16} />,
        label: fields.currentLocale,
        description: fieldsDescription.currentLocale,
        isBoolean: false,
      },
      {
        key: 'htmlLangPresent',
        icon: <Globe size={16} />,
        label: fields.htmlLang,
        description: fieldsDescription.htmlLang,
        isBoolean: true,
      },
      {
        key: 'htmlDirPresent',
        icon: <Globe size={16} />,
        label: fields.htmlDir,
        description: fieldsDescription.htmlDir,
        isBoolean: true,
      },
      {
        key: 'hreflangs',
        icon: <FileText size={16} />,
        label: fields.hreflangs,
        description: fieldsDescription.hreflangs,
        isBoolean: false,
      },
      {
        key: 'hasXDefault',
        icon: <FileText size={16} />,
        label: fields.hasXDefault,
        description: fieldsDescription.hasXDefault,
        isBoolean: true,
      },
      {
        key: 'localeCount',
        icon: <BarChart3 size={16} />,
        label: fields.localeCount,
        description: fieldsDescription.localeCount,
        isBoolean: false,
      },
      {
        key: 'langSelector',
        icon: <Languages size={16} />,
        label: fields.langSelector,
        description: fieldsDescription.langSelector,
        isBoolean: true,
      },
      {
        key: 'flags',
        icon: <Flag size={16} />,
        label: fields.flags,
        description: fieldsDescription.flags,
        isBoolean: true,
      },
      {
        key: 'canonical',
        icon: <LinkIcon size={16} />,
        label: fields.canonical,
        description: fieldsDescription.canonical,
        isBoolean: true,
      },
      //   {
      //     key: 'localizedUrls',
      //     icon: <Blocks size={16} />,
      //     label: fields.localizedUrls,
      //     description: fieldsDescription.localizedUrls,
      //     isBoolean: true,
      //   },
      //   {
      //     key: 'localizedLinks',
      //     icon: <Link2 size={16} />,
      //     label: fields.localizedLinks,
      //     description: fieldsDescription.localizedLinks,
      //     isBoolean: true,
      //   },
      //   {
      //     key: 'allAnchorsLocalized',
      //     icon: <Link2 size={16} />,
      //     label: fields.allAnchorsLocalized,
      //     description: fieldsDescription.allAnchorsLocalized,
      //     isBoolean: true,
      //   },
    ];

    const isFieldLoading = (field: (typeof fieldsList)[0]) => {
      const summaryKey = fieldKeyMap[field.key];
      return (
        loading &&
        (summaryKey === undefined ||
          !(summaryKey in summary) ||
          summary[summaryKey] === undefined)
      );
    };

    return (
      <div className="flex flex-col gap-2 pt-2 text-left text-sm">
        <Link href={url} label={urlText.label.value} color="text">
          {url}
        </Link>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-neutral border-t border-dashed pt-2 sm:grid-cols-3">
          {fieldsList.map((item) => {
            const isLoading = isFieldLoading(item);
            const fieldValue = getFieldValue(item.key, item.isBoolean);

            return (
              <div
                key={item.label.value}
                className={cn(
                  'grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 rounded-lg px-2 py-1 text-neutral',
                  isLoading && 'animate-pulse'
                )}
              >
                {isLoading ? <Loader className="size-4" /> : item.icon}
                <strong className="min-w-28">{item.label}:</strong>
                <span className="text-text/70">
                  {isLoading ? '...' : fieldValue}
                </span>
                <InformationTag id={item.key}>
                  {item.description}
                </InformationTag>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
