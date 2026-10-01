import { scheduleFrameTask } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { type FC, useEffect, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { useDocTitles } from '../DocTitlesContext';

type NavTitles2Props = {
  title2: HTMLElement[];
  headingTexts: Map<HTMLElement, string>;
  activeChild: HTMLElement | null;
};

const NavTitles2: FC<NavTitles2Props> = ({
  title2,
  headingTexts,
  activeChild,
}) => {
  const { linkLabel } = useIntlayer('nav-titles');
  const { pathname } = useLocation();

  return (
    <ul className="my-3 flex w-full min-w-52 flex-col gap-2 border-neutral border-s-[0.5px] ps-3">
      {title2.map((h3) => {
        const { id } = h3;
        const title = headingTexts.get(h3) ?? '';
        const isActive = activeChild === h3;

        return (
          <li key={id}>
            <Link
              to={{ pathname: pathname, hash: id } as any}
              label={`${linkLabel}: ${title}`}
              aria-current={isActive ? 'location' : undefined}
              color="text"
              variant="invisible-link"
              roundedSize="lg"
              className="flex text-wrap p-2 text-sm text-text/65 transition-[font-weight] duration-300 hover:font-semibold aria-[current]:bg-none aria-[current]:font-semibold aria-[current]:text-foreground dark:text-text/50"
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
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

type NavTitlesProps = {
  /** Called with the active link once the list has been scrolled toward it */
  onActiveLinkChange?: (activeLink: HTMLElement | null) => void;
};

export const NavTitles: FC<NavTitlesProps> = ({ onActiveLinkChange }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { linkLabel } = useIntlayer('nav-titles');

  const {
    topLevelHeadings,
    headingMap,
    headingTexts,
    activeParent,
    activeChild,
  } = useDocTitles();

  const activeId = activeChild?.id ?? activeParent?.id ?? null;

  useEffect(() => {
    if (!activeId || !navRef.current) {
      onActiveLinkChange?.(null);
      return;
    }

    let scrollRafId: number | null = null;

    // Measured on the shared frame rather than straight from the effect: the
    // active link has just been re-styled by this very commit, so reading its
    // box here would force the browser to lay the nav out again.
    const cancelScrollIntoView = scheduleFrameTask(() => {
      const navigationElement = navRef.current;
      if (!navigationElement) return;

      const allActiveLinks = navigationElement.querySelectorAll<HTMLElement>(
        '[aria-current="location"]'
      );
      const activeLink =
        allActiveLinks.length > 0
          ? allActiveLinks[allActiveLinks.length - 1]
          : null;
      const scrollContainer =
        navigationElement.querySelector<HTMLElement>('ul');

      onActiveLinkChange?.(activeLink);

      if (!activeLink || !scrollContainer) return;

      const relativeTop = activeLink.getBoundingClientRect().top;
      const minTop = window.innerHeight * 0.25;
      const maxTop = window.innerHeight * 0.5;

      if (relativeTop < minTop) {
        const delta = relativeTop - minTop;
        scrollRafId = requestAnimationFrame(() => {
          scrollContainer.scrollBy({
            top: delta,
            behavior: 'smooth',
          });
        });
      } else if (relativeTop > maxTop) {
        const delta = relativeTop - maxTop;
        scrollRafId = requestAnimationFrame(() => {
          scrollContainer.scrollBy({
            top: delta,
            behavior: 'smooth',
          });
        });
      }
    });

    return () => {
      cancelScrollIntoView();
      if (scrollRafId !== null) {
        cancelAnimationFrame(scrollRafId);
      }
    };
  }, [activeId, onActiveLinkChange]);

  return (
    <nav ref={navRef} className="flex h-full min-h-0 flex-col">
      <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto pe-3 pt-8 pb-20">
        {topLevelHeadings.map((h2) => {
          const id = h2.id;
          const title = headingTexts.get(h2) ?? '';
          const h3List = headingMap.get(h2);
          const hasH3List = h3List && h3List.length > 0;
          const isParentActive = activeParent === h2;
          const isCurrent = isParentActive && !activeChild;

          return (
            <li key={id}>
              <Link
                label={`${linkLabel.value}: ${title}`}
                to={{ pathname: pathname, hash: id } as any}
                color="text"
                roundedSize="lg"
                variant="invisible-link"
                aria-current={isCurrent ? 'location' : undefined}
                className="flex text-wrap p-2 text-sm text-text/65 transition-[font-weight] duration-300 hover:font-semibold aria-[current]:bg-none aria-[current]:font-semibold aria-[current]:text-foreground dark:text-text/50"
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
                {title}
              </Link>
              {hasH3List && (
                <NavTitles2
                  title2={h3List}
                  headingTexts={headingTexts}
                  activeChild={isParentActive ? activeChild : null}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
