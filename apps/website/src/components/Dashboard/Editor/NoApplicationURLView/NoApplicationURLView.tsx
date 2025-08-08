import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { Container, H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-1 justify-center items-center">
      <Container className="flex flex-col text-sm gap-2 px-8 pt-2 pb-4 rounded-2xl max-w-xl">
        <H3 className="mb-4 text-lg">{title}</H3>
        <p className="text-neutral block">{description}</p>
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
