import { useGetElementById } from '@intlayer/design-system/hooks';
import { useLocation } from '@tanstack/react-router';
import { type FC, useEffect, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { useActiveSection } from '../useActiveSection';
import { useTitlesTree } from '../useTitlesTree';

type NavTitles2Props = {
  title2: HTMLElement[];
  activeSectionsId: string | null;
};

const NavTitles2: FC<NavTitles2Props> = ({ title2, activeSectionsId }) => {
  const { linkLabel } = useIntlayer('nav-titles');
  const { pathname } = useLocation();

  return (
    <ul className="my-3 flex w-full min-w-52 flex-col gap-2 border-neutral border-l-[0.5px] pl-3 text-text/80">
      {title2.map((h3) => {
        const { id } = h3;
        const isActive = activeSectionsId === id;

        return (
          <li key={id}>
            <Link
              to={{ pathname: pathname, hash: id } as any}
              label={`${linkLabel}: ${h3.innerText}`}
              aria-current={isActive ? 'location' : undefined}
              color="text"
              variant="invisible-link"
              roundedSize="lg"
              className="flex text-wrap p-2 text-sm text-text/80 transition-[font-weight] duration-300 hover:font-semibold aria-[current]:bg-none aria-[current]:font-semibold aria-[current]:text-text"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
                window.history.pushState(null, '', `#${id}`);
              }}
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
  const { pathname } = useLocation();
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

  const activeId = activeChild?.id ?? activeParent?.id ?? null;

  useEffect(() => {
    if (!activeId || !navRef.current) return;

    const allActiveLinks = navRef.current.querySelectorAll<HTMLElement>(
      '[aria-current="location"]'
    );
    const activeLink =
      allActiveLinks.length > 0
        ? allActiveLinks[allActiveLinks.length - 1]
        : null;
    const scrollContainer = navRef.current.querySelector<HTMLElement>('ul');

    if (activeLink && scrollContainer) {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const relativeTop = activeLinkRect.top;
      const minTop = window.innerHeight * 0.25;
      const maxTop = window.innerHeight * 0.5;

      if (relativeTop < minTop) {
        const diff = relativeTop - minTop;
        scrollContainer.scrollBy({ top: diff, behavior: 'smooth' });
      } else if (relativeTop > maxTop) {
        const diff = relativeTop - maxTop;
        scrollContainer.scrollBy({ top: diff, behavior: 'smooth' });
      }
    }
  }, [activeId]);

  return (
    <nav ref={navRef} className="flex h-full min-h-0 flex-col">
      <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto pt-8 pr-3 pb-20">
        {topLevelHeadings.map((h2) => {
          const id = h2.id;
          const h3List = headingMap.get(h2);
          const hasH3List = h3List && h3List.length > 0;
          const isActive = activeParent?.id === id;

          return (
            <li key={id}>
              <Link
                label={`${linkLabel.value}: ${h2.innerText}`}
                to={{ pathname: pathname, hash: id } as any}
                color="text"
                roundedSize="lg"
                variant="invisible-link"
                aria-current={isActive ? 'location' : undefined}
                className="flex text-wrap p-2 text-sm text-text/80 transition-[font-weight] duration-300 hover:font-semibold aria-[current]:bg-none aria-[current]:font-semibold aria-[current]:text-text"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                  window.history.pushState(null, '', `#${id}`);
                }}
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
