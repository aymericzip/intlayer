import { Link } from '@components/Link/Link';
import { Container, H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-1 items-center justify-center">
      <Container className="flex max-w-xl flex-col gap-2 rounded-2xl px-8 pt-2 pb-4 text-sm">
        <H3 className="mb-4 text-lg">{title}</H3>
        <p className="block text-neutral">{description}</p>
        <Link
          label={documentationLink.label.value}
          href={`${PagesRoutes.Doc_IntlayerCMS}#configuration`}
          color="text"
          className="ml-auto underline"
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
