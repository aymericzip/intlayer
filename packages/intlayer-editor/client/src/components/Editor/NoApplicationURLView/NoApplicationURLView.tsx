import { H3, Link } from '@intlayer/design-system';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import content from './noApplicationURLView.content';

export const NoApplicationURLView: FC = () => {
  const { title, description, documentationLink } = useDictionary(content);

  return (
    <div className="flex flex-col gap-6">
      <H3 className="mb-8">{title}</H3>
      <strong className="text-neutral dark:text-neutral-dark block">
        {description}
      </strong>
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
