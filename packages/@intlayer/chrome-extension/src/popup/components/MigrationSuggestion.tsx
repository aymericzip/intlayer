import { ArrowUpRight } from 'lucide-react';
import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { MigrationDocLink } from '../../migration/getMigrationDocLinks';

/**
 * Suggests migrating the detected i18n library to Intlayer to reduce the
 * bundle size, with one migration guide link per library.
 */
export const MigrationSuggestion: FunctionComponent<{
  links: MigrationDocLink[];
}> = ({ links }) => {
  const { title, description, guideLabel } = useIntlayer(
    'migration-suggestion'
  );

  const openGuide = (url: string): void => {
    void chrome.tabs.create({ url });
  };

  return (
    <section className="rounded-xl border border-text/10 bg-card px-3 py-2.5">
      <h2 className="mt-0 mb-1 font-semibold text-sm">{title}</h2>
      <p className="mt-0 mb-2 text-neutral text-xs">{description}</p>
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {links.map((link) => (
          <li key={link.url}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-1 rounded-md bg-transparent px-1 py-0.5 text-start text-text text-xs hover:bg-text/5"
              onClick={() => openGuide(link.url)}
            >
              <span>
                {guideLabel}{' '}
                <span className="font-semibold">{link.libraryName}</span>
              </span>
              <ArrowUpRight className="size-3 shrink-0" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
