import { PagesRoutes } from '@/Routes';
import { Link } from '@components/Link/Link';
import { H3 } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-col text-sm gap-2 mx-4">
      <H3 className="mb-4 text-lg">{title}</H3>
      <p className="text-neutral block">{description}</p>
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
