'use client';

import { useEffect, useState } from 'react';

/**
 * Interface describing section data used for scroll detection
 */
interface SectionData {
  /** Unique identifier of the section element */
  id: string;
  /** Distance from top of document to section start */
  offsetTop: number;
  /** Height of the section element */
  offsetHeight: number;
}

/**
 * Navigation Actions Hook
 *
 * A comprehensive hook for managing navigation interactions and scroll-based section detection.
 * Provides automatic active section detection based on scroll position and handles smooth
 * scrolling navigation behaviors.
 *
 * Features:
 * - Automatic active section detection based on scroll position
 * - Smooth scrolling to sections within the same page
 * - Logo click handling with home navigation
 * - Section click handling with conditional scrolling vs navigation
 * - Passive scroll event listeners for optimal performance
 * - Viewport-aware active section calculation (using screen height / 4 offset)
 *
 * Active Section Detection:
 * - Monitors all `<section>` elements on the page
 * - Calculates which section is currently in the "active" zone
 * - Active zone is defined as the top 25% of the viewport
 * - Updates activeSection state as user scrolls
 *
 * Navigation Behaviors:
 * - Logo click: Scrolls to top if on home page, navigates to home if on other pages
 * - Section click: Smooth scrolls if on same page, executes callback if different page
 * - All scrolling uses smooth behavior for better UX
 *
 * @example
 * Basic usage in navigation component:
 * ```tsx
 * const { activeSection, onClickLogo, onClickSection } = useNavActions();
 *
 * // In navigation items
 * const navItems = sections.map(section => (
 *   <TabSelectorItem
 *     key={section.id}
 *     isActive={activeSection === section.id}
 *     onClick={() => onClickSection(section.id, section.url, section.onClick)}
 *   >
 *     {section.label}
 *   </TabSelectorItem>
 * ));
 *
 * // In logo
 * <Logo onClick={() => onClickLogo(navigate)} />
 * ```
 *
 * @example
 * Advanced usage with routing:
 * ```tsx
 * const { activeSection, onClickLogo, onClickSection } = useNavActions();
 * const navigate = useNavigate();
 *
 * const handleLogoClick = () => {
 *   onClickLogo((url) => {
 *     navigate(url);
 *     // Additional logic like analytics
 *     trackEvent('logo_click');
 *   });
 * };
 *
 * const handleSectionClick = (sectionId: string) => {
 *   onClickSection(
 *     sectionId,
 *     `/page#${sectionId}`,
 *     () => {
 *       navigate(`/page#${sectionId}`);
 *       trackEvent('section_navigation', { sectionId });
 *     }
 *   );
 * };
 * ```
 *
 * Performance Considerations:
 * - Uses passive scroll event listeners to prevent blocking
 * - Automatically cleans up event listeners on unmount
 * - Efficiently queries DOM elements using native selectors
 * - Calculates section positions dynamically for accuracy
 *
 * @returns Object containing navigation state and action handlers
 */
export const useNavActions = () => {
  /** Currently active section ID based on scroll position */
  const [activeSection, setActiveSection] = useState<string | null>(null);

  /**
   * Detects which section is currently active based on scroll position
   * Uses viewport-aware calculation to determine active section
   */
  const detectActiveSection = () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll('section');
    const sectionsData: SectionData[] = [];

    // Collect position data for all sections
    sections.forEach((section) =>
      sectionsData.push({
        id: section.id,
        offsetTop: section.offsetTop,
        offsetHeight: section.offsetHeight,
      })
    );

    // Find section that intersects with the active zone (top 25% of viewport)
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

  // Set up scroll listener for active section detection
  useEffect(() => {
    window.addEventListener('scroll', detectActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', detectActiveSection);
    };
  }, []);

  /**
   * Handles logo click behavior
   * Scrolls to top if on home page, navigates to home if on other pages
   *
   * @param onClick - Callback function to handle navigation (e.g., router.push)
   */
  const onClickLogo = (onClick: (url: string) => void) => {
    setActiveSection(null);

    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onClick('/');
    }
  };

  /**
   * Handles section navigation click behavior
   * Smooth scrolls if on same page, executes callback if different page
   *
   * @param sectionId - ID of the target section element
   * @param url - URL of the page containing the section (optional)
   * @param onClick - Callback function to handle navigation (optional)
   */
  const onClickSection = (
    sectionId: string,
    url?: string,
    onClick?: () => void
  ) => {
    setActiveSection(sectionId);

    // If on the same page, scroll to section
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
      // If on different page, execute callback (typically navigation)
      onClick?.();
    }
  };

  return {
    /** Currently active section ID, null if no section is active */
    activeSection,
    /** Handler for logo click interactions */
    onClickLogo,
    /** Handler for section navigation clicks */
    onClickSection,
  };
};
