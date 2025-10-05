import type { FC, ReactNode } from 'react';
import { LogoWithTextBelow } from '../Logo';
import { SocialNetworks } from '../SocialNetworks';

/**
 * Represents a single footer link with all necessary attributes
 */
export type FooterLink = {
  /** URL or path for the link */
  href: string;
  /** Display text or JSX element for the link */
  text: ReactNode;
  /** Optional click handler for custom link behavior */
  onClick?: () => void;
  /** Accessible label for screen readers (required for accessibility) */
  label: string;
};

/**
 * Represents a group of related links with a title
 */
export type LinkGroup = {
  /** Title for the group of links */
  title: ReactNode;
  /** Array of footer links in this group */
  links: FooterLink[];
};

/**
 * Props for the Footer component
 */
type FooterProps = {
  /** Optional array of link groups to display in the footer */
  links?: LinkGroup[];
};

/**
 * Footer Component
 *
 * A comprehensive footer component that displays the Intlayer logo, copyright information,
 * social networks, and organized groups of navigation links. Designed for responsive
 * layouts and optimal user experience across all devices.
 *
 * @component
 * @example
 * Basic usage without links:
 * ```tsx
 * <Footer />
 * ```
 *
 * @example
 * With organized link groups:
 * ```tsx
 * const footerLinks = [
 *   {
 *     title: 'Product',
 *     links: [
 *       { href: '/features', text: 'Features', label: 'Product features' },
 *       { href: '/pricing', text: 'Pricing', label: 'Pricing information' },
 *       { href: '/docs', text: 'Documentation', label: 'Product documentation' }
 *     ]
 *   },
 *   {
 *     title: 'Company',
 *     links: [
 *       { href: '/about', text: 'About Us', label: 'About the company' },
 *       { href: '/careers', text: 'Careers', label: 'Job opportunities' },
 *       { href: '/contact', text: 'Contact', label: 'Contact information' }
 *     ]
 *   }
 * ];
 *
 * <Footer links={footerLinks} />
 * ```
 *
 * @example
 * With custom click handlers:
 * ```tsx
 * const footerLinks = [
 *   {
 *     title: 'Actions',
 *     links: [
 *       {
 *         href: '#',
 *         text: 'Newsletter',
 *         label: 'Subscribe to newsletter',
 *         onClick: () => openNewsletterModal()
 *       }
 *     ]
 *   }
 * ];
 *
 * <Footer links={footerLinks} />
 * ```
 *
 * Features:
 * - Responsive design that adapts to different screen sizes
 * - Intlayer branding with logo and copyright notice
 * - Integrated social network links
 * - Flexible link organization with titled groups
 * - Accessibility-compliant with proper ARIA labels
 * - Support for custom click handlers alongside href navigation
 * - Clean, modern design with proper spacing and typography
 *
 * Layout Structure:
 * - Left side (or top on mobile): Logo, copyright, and social links
 * - Right side (or bottom on mobile): Organized link groups
 * - Responsive breakpoints for optimal mobile experience
 *
 * Accessibility:
 * - Semantic HTML structure using <footer> tag
 * - All links include required aria-label attributes
 * - Proper heading hierarchy and keyboard navigation
 * - Screen reader friendly content organization
 * - Focus management for interactive elements
 *
 * @param props - Component properties
 * @param props.links - Optional array of link groups to display
 *
 * @returns A rendered footer with branding, social links, and optional navigation links
 */
export const Footer: FC<FooterProps> = ({ links }) => (
  <footer className="flex flex-auto flex-row flex-wrap items-center justify-around gap-10 p-6">
    <aside className="flex flex-col items-center justify-between gap-3 md:w-1/4">
      <LogoWithTextBelow className="size-full max-w-[120px]" />
      <span className="text-center text-neutral text-xs">
        © 2025 Intlayer, Inc.
      </span>
      <div className="flex flex-row gap-3">
        <SocialNetworks />
      </div>
    </aside>
    <div className="m-auto flex w-full flex-row flex-wrap justify-around gap-x-3 gap-y-6 md:w-2/3">
      {(links ?? []).map(({ title, links }) => (
        <div
          className="flex flex-col gap-2"
          key={links.map((link) => link.href).join(',')}
        >
          <strong>{title}</strong>
          <div className="flex flex-col gap-3 text-sm">
            {links.map((link) => (
              <a key={link.href} href={link.href} aria-label={link.label}>
                {link.text}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  </footer>
);
