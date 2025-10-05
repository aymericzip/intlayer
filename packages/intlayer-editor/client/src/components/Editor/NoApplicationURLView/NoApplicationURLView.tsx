import { H3, Link } from '@intlayer/design-system';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useIntlayer(
    'no-application-url-view'
  );

  return (
    <div className="flex flex-col gap-6">
      <H3 className="mb-8">{title}</H3>
      <strong className="block text-neutral">{description}</strong>
      <Link
        label={documentationLink.label.value}
        href="https://intlayer.org/doc/concept/configuration#editor-configuration"
        color="text"
      >
        {documentationLink.text}
      </Link>
    </div>
  );
};
