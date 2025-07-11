'use client';

import { Link } from '@components/Link/Link';
import { Popover } from '@intlayer/design-system';
import { getLocalizedUrl } from 'intlayer';
import { Languages } from 'lucide-react';
import { useIntlayer, useLocale, useLocaleCookie } from 'next-intlayer';
import type { FC } from 'react';

type TranslatedContentMessageProps = {
  pageUrl: string;
};

export const TranslatedContentMessage: FC<TranslatedContentMessageProps> = ({
  pageUrl,
}) => {
  const { setLocaleCookie } = useLocaleCookie();
  const { locale, defaultLocale } = useLocale();
  const localizedUrl = getLocalizedUrl(pageUrl, defaultLocale);
  const { message, link } = useIntlayer('translated-content-message');

  if (locale === defaultLocale) return <></>;

  return (
    <Popover identifier="language">
      <div className="flex p-2">
        <Languages className="size-4" size={24} />
      </div>
      <Popover.Detail
        identifier="language"
        className="flex flex-1 flex-col gap-2 min-w-64 p-3 text-sm text-neutral"
        xAlign="end"
      >
        <p>{message}</p>
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
