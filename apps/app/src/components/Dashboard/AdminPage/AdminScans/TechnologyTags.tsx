import type { HostTechnology } from '@intlayer/backend';
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

/** Categories highlighted among the tags: the translation stack. */
const HIGHLIGHTED_CATEGORIES = new Set<HostTechnology['category']>([
  'i18n-library',
  'tms',
  'translation-proxy',
]);

/** Detected technologies of a host or scan, as tags (version included). */
export const TechnologyTags: FC<{
  technologies: HostTechnology[];
  className?: string;
}> = ({ technologies, className }) => {
  const { categories } = useIntlayer('scans-admin-page');

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {technologies.map((technology) => (
        <Tag
          key={technology.id}
          size="xs"
          roundedSize="full"
          color={
            HIGHLIGHTED_CATEGORIES.has(technology.category) ? 'text' : 'neutral'
          }
          title={categories[technology.category].value}
        >
          {technology.name}
          {technology.version && ` ${technology.version}`}
        </Tag>
      ))}
    </div>
  );
};
