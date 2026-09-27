import { cn } from '@intlayer/design-system/utils';
import type { TechnologyCategory } from '@intlayer/engine/scan/detection';
import type { ComponentChildren, FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { DetectedTechnology } from '../../detector/types';
import { DetailsPopover } from './DetailsPopover';

/** Categories in display order: the translation stack first. */
const CATEGORY_ORDER: readonly TechnologyCategory[] = [
  'i18n-library',
  'tms',
  'translation-proxy',
  'framework',
  'cms',
];

/** Categories always listed, with an explicit "none detected" row. */
const ALWAYS_LISTED_CATEGORIES = new Set<TechnologyCategory>([
  'i18n-library',
  'tms',
]);

/**
 * Detected technologies grouped by category. The i18n library and the TMS are
 * always listed (with a "none detected" row); each technology opens a popover
 * with its version and the signal it was detected from.
 */
export const TechnologyList: FunctionComponent<{
  technologies: DetectedTechnology[];
}> = ({ technologies }) => {
  const { categories, noI18nLibrary, noTms, versionLabel, evidenceLabel } =
    useIntlayer('technology-list');

  const noneDetectedLabels: Partial<
    Record<TechnologyCategory, ComponentChildren>
  > = { 'i18n-library': noI18nLibrary, tms: noTms };

  const getCategoryLabel = (category: TechnologyCategory) =>
    category in categories
      ? categories[category as keyof typeof categories]
      : category;

  return (
    <div className="flex flex-col gap-2.5">
      {CATEGORY_ORDER.map((category) => {
        const categoryTechnologies = technologies.filter(
          (technology) => technology.category === category
        );

        if (
          categoryTechnologies.length === 0 &&
          !ALWAYS_LISTED_CATEGORIES.has(category)
        ) {
          return null;
        }

        const isTranslationStack = ALWAYS_LISTED_CATEGORIES.has(category);

        return (
          <div key={category}>
            <h4 className="mt-0 mb-1 font-semibold text-[10px] text-neutral uppercase tracking-wide">
              {getCategoryLabel(category)}
            </h4>

            {categoryTechnologies.length === 0 ? (
              <p className="m-0 text-neutral text-xs">
                {noneDetectedLabels[category]}
              </p>
            ) : (
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {categoryTechnologies.map((technology) => (
                  <li key={technology.id}>
                    <DetailsPopover
                      identifier={`technology-${technology.id}`}
                      trigger={
                        <div className="flex cursor-help items-center gap-1.5 rounded-md px-1 hover:bg-text/5">
                          <span
                            className={cn(
                              'font-semibold',
                              isTranslationStack ? 'text-text' : 'text-text/80'
                            )}
                          >
                            {technology.name}
                          </span>
                          {technology.version && (
                            <span className="text-neutral text-xs">
                              {technology.version}
                            </span>
                          )}
                        </div>
                      }
                    >
                      <p className="m-0 font-semibold">
                        {technology.name}
                        <span className="ml-1.5 font-normal text-neutral">
                          {getCategoryLabel(technology.category)}
                        </span>
                      </p>
                      {technology.version && (
                        <p className="m-0">
                          <span className="text-neutral">{versionLabel}: </span>
                          <code className="font-mono">
                            {technology.version}
                          </code>
                        </p>
                      )}
                      <p className="m-0">
                        <span className="text-neutral">{evidenceLabel}: </span>
                        <span className="break-all font-mono text-[11px]">
                          {technology.evidence}
                        </span>
                      </p>
                    </DetailsPopover>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};
