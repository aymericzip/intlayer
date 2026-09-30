import { cn } from '@intlayer/design-system/utils';
import { Layers, Route } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { DomainData } from './types';

type SiteStackSectionProps = {
  domainData?: Partial<DomainData>;
};

/** URL routing strategy and detected stack (framework, i18n library, TMS…). */
export const SiteStackSection: FC<SiteStackSectionProps> = ({ domainData }) => {
  const {
    routingTitle,
    stackTitle,
    noTechnology,
    defaultLocale,
    strategies,
    categories,
  } = useIntlayer('site-stack-section');
  const { routing, technologies } = domainData ?? {};

  if (!routing && !technologies) return null;

  return (
    <div className="mt-3 grid grid-cols-1 gap-4 border-neutral border-t border-dotted pt-3 text-start text-sm sm:grid-cols-2">
      {routing && (
        <div className="flex flex-col gap-1">
          <strong className="flex items-center gap-2 text-neutral">
            <Route size={16} />
            {routingTitle}
          </strong>
          <span className="text-text/80" title={routing.evidence}>
            {strategies[routing.strategy]}
          </span>
          {routing.defaultLocale && (
            <span className="text-neutral text-xs">
              {defaultLocale}:{' '}
              <code className="font-mono">{routing.defaultLocale}</code>
            </span>
          )}
        </div>
      )}
      {technologies && (
        <div className="flex flex-col gap-1">
          <strong className="flex items-center gap-2 text-neutral">
            <Layers size={16} />
            {stackTitle}
          </strong>
          {technologies.length === 0 ? (
            <span className="text-neutral">{noTechnology}</span>
          ) : (
            <ul className="flex flex-col gap-1">
              {technologies.map((technology) => (
                <li
                  key={technology.id}
                  className="flex items-center gap-2"
                  title={technology.evidence}
                >
                  <span className="font-semibold text-text/80">
                    {technology.name}
                  </span>
                  {technology.version && (
                    <span className="text-neutral text-xs">
                      {technology.version}
                    </span>
                  )}
                  <span
                    className={cn(
                      'ms-auto rounded-full border px-1.5 py-0.5 text-[10px] uppercase tracking-wide',
                      technology.category === 'i18n-library' ||
                        technology.category === 'tms'
                        ? 'border-text/60 text-text/80'
                        : 'border-neutral/40 text-neutral'
                    )}
                  >
                    {categories[technology.category]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
