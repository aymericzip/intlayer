import { cn } from '@intlayer/design-system/utils';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { DetectedTechnology } from '../../detector/types';

/** Wappalyzer-style list of detected technologies, with version + evidence. */
export const TechnologyList: FunctionComponent<{
  technologies: DetectedTechnology[];
}> = ({ technologies }) => {
  const { empty, categories } = useIntlayer('technology-list');

  if (technologies.length === 0) {
    return <p className="m-0 text-neutral">{empty}</p>;
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {technologies.map((technology) => (
        <li key={technology.id}>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{technology.name}</span>
            {technology.version && (
              <span className="text-neutral text-xs">{technology.version}</span>
            )}
            <span
              className={cn(
                'ml-auto rounded-full border px-1.5 py-0.5 font-semibold text-[10px] uppercase tracking-wide',
                technology.category === 'i18n-library'
                  ? 'border-text text-text'
                  : 'border-neutral/40 text-neutral'
              )}
            >
              {categories[technology.category]}
            </span>
          </div>
          <div className="wrap-anywhere font-mono text-[11px] text-neutral">
            {technology.evidence}
          </div>
        </li>
      ))}
    </ul>
  );
};
