'use client';

import { Link } from '@components/Link/Link';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useEffect, useRef, useState, type FC } from 'react';

type NavTitles2Props = {
  title2: HTMLElement[];
  activeSectionsId: string | null;
};

const NavTitles2: FC<NavTitles2Props> = ({ title2, activeSectionsId }) => {
  const { linkLabel } = useIntlayer('nav-titles');
  const { pathWithoutLocale } = useLocale();

  return (
    <ul className="border-neutral my-3 flex w-full min-w-52 flex-col gap-3 border-l-[0.5px] pl-3">
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
              className="text-neutral text-wrap p-2 transition-colors"
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
  const [h2List, setH2List] = useState<HTMLElement[]>([]);
  const [h2ToH3Map, setH2ToH3Map] = useState<Map<HTMLElement, HTMLElement[]>>(
    new Map()
  );

  const [activeH2, setActiveH2] = useState<HTMLElement | null>(null);
  const [activeH3, setActiveH3] = useState<HTMLElement | null>(null);

  const { linkLabel } = useIntlayer('nav-titles');

  const updateTitles = () => {
    const h2Elements = document
      .getElementById('content')
      ?.querySelectorAll('h2');

    const newH2List = Array.from(h2Elements ?? []);
    setH2List(newH2List);

    const newMap = new Map();

    newH2List.forEach((h2) => {
      const h3Elements: HTMLDivElement[] = [];

      let nextElement = h2.nextElementSibling;

      while (nextElement && nextElement.tagName !== 'H2') {
        if (nextElement.tagName === 'H3') {
          h3Elements.push(nextElement as HTMLDivElement);
        }
        nextElement = nextElement.nextElementSibling;
      }

      newMap.set(h2, h3Elements);
    });

    setH2ToH3Map(newMap);
  };

  useEffect(() => {
    // Initial update
    updateTitles();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          updateTitles();
        }
      });
    });

    const content = document.getElementById('content');
    if (content) {
      observer.observe(content, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const getFirstVisibleTitle = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      const newActiveH2 = h2List.findLast((h2) => h2.offsetTop < scrollY);

      if (newActiveH2) {
        if (newActiveH2.id !== activeH2?.id) {
          setActiveH2(newActiveH2);
        }

        const firstVisibleH3 = h2ToH3Map
          .get(newActiveH2)
          ?.findLast((h3) => h3.offsetTop < scrollY);

        setActiveH3(firstVisibleH3 ?? null);
      }
    };

    getFirstVisibleTitle();

    const navigationRef = navRef.current;

    navigationRef?.addEventListener('click', getFirstVisibleTitle);
    window.addEventListener('scroll', getFirstVisibleTitle);
    window.addEventListener('resize', getFirstVisibleTitle);
    window.addEventListener('orientationchange', getFirstVisibleTitle);

    return () => {
      navigationRef?.removeEventListener('click', getFirstVisibleTitle);
      window.removeEventListener('scroll', getFirstVisibleTitle);
      window.removeEventListener('resize', getFirstVisibleTitle);
      window.removeEventListener('orientationchange', getFirstVisibleTitle);
    };
  }, [h2List, h2ToH3Map, activeH2]);

  return (
    <nav ref={navRef}>
      <ul className="flex max-h-[calc(100vh-8rem)] flex-1 flex-col gap-3 overflow-auto pb-20 pr-3 pt-8 text-sm">
        {h2List.map((h2) => {
          const id = h2.id;
          const h2List = h2ToH3Map.get(h2);
          const hasH3List = h2List && h2List.length > 0;
          const isActive = activeH2?.id === id;

          return (
            <li key={id}>
              <Link
                label={`${linkLabel}: ${h2.innerText}`}
                href={`${pathWithoutLocale}#${id}`}
                color="text"
                variant="hoverable"
                isActive={isActive}
                className="text-neutral text-wrap p-2 transition-colors"
              >
                {h2.innerText}
              </Link>
              {hasH3List && (
                <NavTitles2
                  title2={h2List}
                  activeSectionsId={(isActive ? activeH3?.id : null) ?? null}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
