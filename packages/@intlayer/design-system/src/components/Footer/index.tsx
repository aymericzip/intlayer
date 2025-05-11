import type { FC, ReactNode } from 'react';
import { LogoWithTextBelow } from '../Logo';
import { SocialNetworks } from '../SocialNetworks';
export type FooterLink = {
  href: string;
  text: ReactNode;
  onClick?: () => void;
  label: string;
};

export type LinkGroup = { title: ReactNode; links: FooterLink[] };

type FooterProps = { links?: LinkGroup[] };

export const Footer: FC<FooterProps> = ({ links }) => (
  <footer className="flex flex-auto flex-row flex-wrap items-center justify-around gap-10 p-6">
    <aside className="flex flex-col items-center justify-between gap-3 md:w-1/4">
      <LogoWithTextBelow className="size-full max-w-[120px]" />
      <span className="text-neutral text-center text-xs">
        © 2024 Intlayer, Inc.
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
