'use client';

import { useEffect, useState } from 'react';

interface SectionData {
  id: string;
  offsetTop: number;
  offsetHeight: number;
}

export const useNavActions = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const detectActiveSection = () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    const sectionsData: SectionData[] = [];

    sections.forEach((section) =>
      sectionsData.push({
        id: section.id,
        offsetTop: section.offsetTop,
        offsetHeight: section.offsetHeight,
      })
    );

    const currentSection = sectionsData.find(
      (section) =>
        section.offsetTop <= scrollY + window.screen.height / 4 &&
        section.offsetTop + section.offsetHeight >
          scrollY + window.screen.height / 4
    );

    if (currentSection) {
      setActiveSection(currentSection.id);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', detectActiveSection);

    return () => {
      window.removeEventListener('scroll', detectActiveSection);
    };
  }, []);

  const onClickLogo = (onClick: (url: string) => void) => {
    setActiveSection(null);

    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onClick('/');
    }
  };

  const onClickSection = (
    sectionId: string,
    url?: string,
    onClick?: () => void
  ) => {
    setActiveSection(sectionId);

    if (window.location.pathname === url) {
      const sectionEl = document.getElementById(sectionId);

      if (sectionEl) {
        sectionEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }
    } else {
      onClick?.();
    }
  };

  return { activeSection, onClickLogo, onClickSection };
};
