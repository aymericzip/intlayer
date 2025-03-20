'use client';

import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
import { getLocalizedUrl } from 'intlayer';
import { Languages } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

type TranslatedContentMessageProps = {
  pageUrl: string;
};

export const TranslatedContentMessage: FC<TranslatedContentMessageProps> = ({
  pageUrl,
}) => {
  const { locale, defaultLocale, setLocale } = useLocale();
  const localizedUrl = getLocalizedUrl(pageUrl, defaultLocale);
  const { message, link } = useIntlayer('translated-content-message');

  if (locale === defaultLocale) return <></>;

  return (
    <Container
      roundedSize="md"
      transparency="full"
      border={true}
      padding="lg"
      borderColor="neutral"
      className="text-neutral mx-10 flex flex-row gap-6 text-xs mt-10"
    >
      <Languages className="ml-3 mt-1 size-5" size={24} />
      <div className="flex flex-1 flex-col gap-2">
        <p>{message}</p>
        <Link
          href={localizedUrl}
          locale={defaultLocale}
          label={link.label.value}
          color="text"
          onClick={(e) => {
            e.preventDefault();
            setLocale(defaultLocale);
          }}
        >
          {link.content}
        </Link>
      </div>
    </Container>
  );
};
