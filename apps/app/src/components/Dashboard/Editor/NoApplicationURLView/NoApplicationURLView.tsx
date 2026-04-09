import { Container } from '@intlayer/design-system/container';
import { H3 } from '@intlayer/design-system/headers';
import { Website_Doc_IntlayerCMS } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Container roundedSize="2xl" padding="lg" className="mb-[30%]">
        <H3 className="mb-4 text-lg">{title}</H3>
        <p className="block text-neutral">{description}</p>
        <Link
          label={documentationLink.label.value}
          href={`${Website_Doc_IntlayerCMS}#configuration`}
          color="text"
          className="ml-auto"
          variant="button"
          isExternalLink
        >
          {documentationLink.text}
        </Link>
      </Container>
    </div>
  );
};
