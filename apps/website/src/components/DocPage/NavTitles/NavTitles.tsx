'use client';

import { Link } from '@components/Link/Link';
import { useGetElementById } from '@intlayer/design-system/hooks';
import { useIntlayer, useLocale } from 'next-intlayer';
import { type FC, useRef } from 'react';
import { useActiveSection } from '../useActiveSection';
import { useTitlesTree } from '../useTitlesTree';

type NavTitles2Props = {
  title2: HTMLElement[];
  activeSectionsId: string | null;
};

const NavTitles2: FC<NavTitles2Props> = ({ title2, activeSectionsId }) => {
  const { linkLabel } = useIntlayer('nav-titles');
  const { pathWithoutLocale } = useLocale();

  return (
    <ul className="my-3 flex w-full min-w-52 flex-col gap-5 border-neutral border-l-[0.5px] pl-3">
      {title2.map((h3) => {
        const { id } = h3;
        const isActive = activeSectionsId === id;

        return (
          <li key={id}>
            <Link
              href={`${pathWithoutLocale}#${id}`}
              label={`${linkLabel}: ${h3.innerText}`}
              aria-current={isActive ? 'location' : undefined}
              color="text"
              variant="hoverable"
              roundedSize="lg"
              className="flex text-wrap p-2 transition-colors"
            >
              {h3.innerText}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const NavTitles: FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const { pathWithoutLocale } = useLocale();
  const { linkLabel } = useIntlayer('nav-titles');

  // Use the custom hook to extract and organize headings
  const { topLevelHeadings, headingMap } = useTitlesTree({
    levels: [2, 3],
    contentId: 'content',
  });

  const contentElement = useGetElementById('content');
  // Use the custom hook to detect active sections
  const { activeParent, activeChild } = useActiveSection({
    contentElement,
    headings: topLevelHeadings,
    headingMap,
    navRef,
  });

  return (
    <nav ref={navRef}>
      <ul className="flex max-h-[calc(100vh-8rem)] flex-1 flex-col gap-3 overflow-auto pt-8 pr-3 pb-20 text-sm">
        {topLevelHeadings.map((h2) => {
          const id = h2.id;
          const h3List = headingMap.get(h2);
          const hasH3List = h3List && h3List.length > 0;
          const isActive = activeParent?.id === id;

          return (
            <li key={id}>
              <Link
                label={`${linkLabel}: ${h2.innerText}`}
                href={`${pathWithoutLocale}#${id}`}
                color="text"
                roundedSize="lg"
                variant="hoverable"
                isActive={isActive}
                className="flex text-wrap p-2 transition-colors"
              >
                {h2.innerText}
              </Link>
              {hasH3List && (
                <NavTitles2
                  title2={h3List}
                  activeSectionsId={(isActive ? activeChild?.id : null) ?? null}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
