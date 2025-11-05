'use client';

import { Link } from '@components/Link/Link';
import { Container, Popover } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { getLocalizedUrl } from 'intlayer';
import { Clock } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useDate } from 'next-intlayer/format';
import type { FC } from 'react';

type HistoryProps = {
  pageUrl: string;
  updatedAt: string;
  baseUpdatedAt: string;
  history?: {
    version: string;
    date: string;
    changes: string;
  }[];
};

export const History: FC<HistoryProps> = ({
  pageUrl,
  updatedAt,
  baseUpdatedAt,
  history = [],
}) => {
  const formatDate = useDate();
  const { locale, defaultLocale, setLocale } = useLocale();
  const { message, link, versionHistory } = useIntlayer('doc-history');

  if (locale === defaultLocale) return <></>;

  const localizedUrl = getLocalizedUrl(pageUrl, defaultLocale);

  const isOutdated = Boolean(
    baseUpdatedAt &&
      updatedAt &&
      new Date(baseUpdatedAt).getTime() > new Date(updatedAt).getTime()
  );

  return (
    <Popover identifier="outdated-translation">
      <div className={cn('flex p-2', isOutdated && 'text-warning')}>
        <Clock className="size-4" />
      </div>
      <Popover.Detail
        identifier="outdated-translation"
        className="flex min-w-64 flex-1 flex-col gap-2 p-3 text-neutral text-sm"
        xAlign="end"
      >
        {isOutdated && (
          <>
            <p>
              {message.before}{' '}
              <strong className="mx-1">
                {formatDate(baseUpdatedAt, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>
              {message.after}
            </p>
            <Link
              href={localizedUrl}
              locale={defaultLocale}
              label={link.label.value}
              color="text"
              onClick={() => setLocale(defaultLocale)}
            >
              {link.content}
            </Link>
          </>
        )}

        {history.length > 0 && (
          <Container
            className="mt-3 max-h-[60vh] min-w-64"
            separator="y"
            role="list"
            transparency="sm"
            aria-label="Document history"
          >
            <h4 className="mb-2 pb-4 font-medium text-sm text-text">
              {versionHistory.title}
            </h4>
            <ol className="divide-y divide-dashed divide-text/20 overflow-y-auto p-1">
              {history.map(({ version, date, changes }) => (
                <li
                  className="flex flex-row items-center justify-between gap-3 px-2 py-1 pr-1.5"
                  key={`${version}-${date}`}
                >
                  <span className="mt-1 text-text text-xs">{changes}</span>
                  <div className="flex flex-col items-end justify-between gap-1 px-2 py-1 text-neutral text-sm">
                    <span className="text-nowrap">v{version}</span>
                    <span className="text-nowrap">{formatDate(date)}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        )}
      </Popover.Detail>
    </Popover>
  );
};
