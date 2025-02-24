import { Link } from '@components/Link/Link';
import { H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-col gap-4">
      <H3 className="mb-8">{title}</H3>
      <strong className="text-neutral block">{description}</strong>
      <Link
        label={documentationLink.label.value}
        href={`${PagesRoutes.Doc_IntlayerCMS}#configuration`}
        color="text"
      >
        {documentationLink.text}
      </Link>
    </div>
  );
};
