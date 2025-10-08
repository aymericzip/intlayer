'use client';

import { Link } from '@components/Link/Link';
import { Popover } from '@intlayer/design-system';
import { getLocalizedUrl } from 'intlayer';
import { Clock } from 'lucide-react';
import { useIntlayer, useLocale, useLocaleCookie } from 'next-intlayer';
import type { FC } from 'react';

type OutdatedTranslationMessageProps = {
  pageUrl: string;
  baseUpdatedAt: string;
};

export const OutdatedTranslationMessage: FC<
  OutdatedTranslationMessageProps
> = ({ pageUrl, baseUpdatedAt }) => {
  const { setLocaleCookie } = useLocaleCookie();
  const { locale, defaultLocale } = useLocale();
  const { message, link } = useIntlayer('outdated-translation-message');

  if (locale === defaultLocale) return <></>;

  const localizedUrl = getLocalizedUrl(pageUrl, defaultLocale);

  return (
    <Popover identifier="outdated-translation">
      <div className="flex p-2 text-warning">
        <Clock className="size-4" />
      </div>
      <Popover.Detail
        identifier="outdated-translation"
        className="flex min-w-64 flex-1 flex-col gap-2 p-3 text-neutral text-sm"
        xAlign="end"
      >
        <p>
          {message.before} <strong className="mx-1">{baseUpdatedAt}</strong>
          {message.after}
        </p>
        <Link
          href={localizedUrl}
          locale={defaultLocale}
          label={link.label.value}
          color="text"
          onClick={() => setLocaleCookie(defaultLocale)}
        >
          {link.content}
        </Link>
      </Popover.Detail>
    </Popover>
  );
};
